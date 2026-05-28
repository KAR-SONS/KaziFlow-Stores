import React, { useState, useEffect, useRef } from 'react'
import supabase from '../supabaseClient'

const ProductsTab = () => {
  const storeId = localStorage.getItem('store_id')

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fetchError, setFetchError] = useState('')
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)
  const MAX_IMAGES = 5

  const handleFilesSelected = (e) => {
    const newFiles = Array.from(e.target.files || [])
    if (newFiles.length === 0) return

    setImages((prev) => {
      const combined = [...prev, ...newFiles]
      const unique = []
      const seen = new Set()

      for (const f of combined) {
        const key = `${f.name}_${f.size}`
        if (!seen.has(key)) {
          seen.add(key)
          unique.push(f)
        }
      }

      return unique.slice(0, MAX_IMAGES)
    })

    // allow selecting the same file again in future
    e.target.value = null
  }

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error: fetchErr } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true })

        if (fetchErr) {
          console.error('Error fetching categories:', fetchErr)
          setFetchError('Failed to load categories')
          return
        }

        setCategories(data || [])
        if (data && data.length > 0) {
          setSelectedCategory(data[0].id || data[0].name)
        }
      } catch (err) {
        console.error('Fetch categories error:', err)
        setFetchError('An error occurred while loading categories')
      }
    }

    if (storeId) {
      fetchCategories()
    }
  }, [storeId])

  // Fetch products for the store
  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeId) return

      try {
        const { data, error: fetchErr } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(name),
            images:product_images(image_url)
          `)
          .eq('store_id', storeId)
          .order('created_at', { ascending: false })

        if (fetchErr) {
          console.error('Error fetching products:', fetchErr)
          setFetchError('Failed to load products')
          return
        }

        const formattedProducts = (data || []).map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category ? item.category.name : 'Uncategorized',
          stock: item.stock,
          image: item.images && item.images.length > 0 ? item.images[0].image_url : '📦',
          images: item.images ? item.images.map(img => img.image_url) : []
        }))

        setProducts(formattedProducts)
      } catch (err) {
        console.error('Fetch products error:', err)
        setFetchError('An error occurred while loading products')
      }
    }

    fetchProducts()
  }, [storeId])

  const handleOpenModal = () => setShowModal(true)

  const handleCloseModal = () => {
    setShowModal(false)
    setProductName('')
    setDescription('')
    setPrice('')
    setStockQuantity('')
    setSelectedCategory(categories.length > 0 ? categories[0].id || categories[0].name : '')
    setImageUrlInput('')
    setImages([])
    setError('')
  }

  const uploadImages = async (files, productId) => {
    const uploadedUrls = []

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file)

      if (error) {
        console.error('Storage upload error:', error)
        continue
      }

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)

      // publicUrlData.publicUrl is returned by supabase client
      uploadedUrls.push(publicUrlData?.publicUrl || publicUrlData?.public_url)
    }

    if (uploadedUrls.length > 0) {
      const imageRows = uploadedUrls.map((url) => ({
        product_id: productId,
        image_url: url
      }))

      await supabase
        .from('product_images')
        .insert(imageRows)
    }

    return uploadedUrls
  }

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // 1. create product
      const { data: productData, error } = await supabase
        .from('products')
        .insert([
          {
            store_id: storeId,
            category_id: selectedCategory,
            name: productName,
            description,
            price: parseFloat(price) || 0,
            stock: parseInt(stockQuantity, 10) || 0,
          }
        ])
        .select()
        .single()

      if (error) {
        console.error(error)
        return
      }

      // 2. upload images (MAX 5)
      let uploadedUrls = []

      if (images.length > 0) {
        const limitedFiles = images.slice(0, 5)
        uploadedUrls = await uploadImages(limitedFiles, productData.id)
      }

      // 3. update UI
      setProducts((prev) => [
        {
          ...productData,
          images: uploadedUrls
        },
        ...prev
      ])

      handleCloseModal()

    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('store_id', storeId)

      if (deleteError) {
        console.error('Delete error:', deleteError)
        alert(`Failed to delete product: ${deleteError.message}`)
        return
      }

      setProducts((prev) => prev.filter((product) => product.id !== productId))
    } catch (err) {
      console.error('Delete error:', err)
      alert(`An error occurred: ${err.message}`)
    }
  }
  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[oklch(0.2_0.01_0)]">Your Products</h2>
          <p className="text-[oklch(0.5_0.01_0)] text-sm mt-1">{products.length} products in your store</p>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="w-full sm:w-auto px-6 py-2 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] font-semibold rounded-lg hover:opacity-90 transition-all"
        >
          Add Product
        </button>
      </div>

      <div className="grid gap-4">
        {fetchError && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
            <p className="text-sm text-orange-800">{fetchError}</p>
          </div>
        )}
        
        <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-[oklch(0.88_0.005_70)] rounded-lg">
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Product</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Category</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Price</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Stock</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)] text-right">Action</div>
        </div>

        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center p-4 bg-white border border-[oklch(0.92_0.01_70)] rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-[oklch(0.2_0.01_0)] text-md sm:text-base">{product.name}</p>
                <p className="text-sm font-medium text-[oklch(0.5_0.01_0)] md:hidden">{product.category}</p>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-[oklch(0.2_0.01_0)]">{product.category}</span>
            </div>
            <div>
              <p className="font-semibold text-[oklch(0.2_0.01_0)] text-sm sm:text-base">Kes {product.price}</p>
            </div>
            <div className="hidden md:block">
              <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.stock} units
              </span>
            </div>
            <div className="flex gap-2 justify-end md:justify-end col-span-2 md:col-span-1">
              <button onClick={() => handleDelete(product.id)} className="px-3 py-1 text-md font-medium sm:text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl shadow-black/20 flex flex-col max-h-[90vh] sm:max-h-none">
            <div className="flex items-center justify-between p-6 border-b border-[oklch(0.92_0.01_70)] flex-shrink-0">
              <div>
                <h3 className="text-2xl font-bold text-[oklch(0.2_0.01_0)]">Add New Product</h3>
                <p className="text-sm text-[oklch(0.5_0.01_0)] mt-1">Add your product details below.</p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-[oklch(0.5_0.01_0)] text-lg font-semibold hover:text-[oklch(0.2_0.01_0)]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto p-6">
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[oklch(0.92_0.01_70)] px-4 py-3 text-sm focus:border-[oklch(0.35_0.08_50)] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[oklch(0.92_0.01_70)] px-4 py-3 text-sm focus:border-[oklch(0.35_0.08_50)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full rounded-xl border border-[oklch(0.92_0.01_70)] px-4 py-3 text-sm focus:border-[oklch(0.35_0.08_50)] focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-xl border border-[oklch(0.92_0.01_70)] px-4 py-3 text-sm focus:border-[oklch(0.35_0.08_50)] focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id || category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Stock Quantity (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full rounded-xl border border-[oklch(0.92_0.01_70)] px-4 py-3 text-sm focus:border-[oklch(0.35_0.08_50)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Category quick pickers</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id || category.name)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selectedCategory === (category.id || category.name)
                          ? 'bg-[oklch(0.35_0.08_50)] text-white border-transparent'
                          : 'bg-white text-[oklch(0.2_0.01_0)] border-[oklch(0.92_0.01_70)] hover:border-[oklch(0.35_0.08_50)]'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Image URLs</label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFilesSelected}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    disabled={images.length >= MAX_IMAGES}
                    className={`w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all ${
                      images.length >= MAX_IMAGES
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[oklch(0.35_0.08_50)] hover:opacity-90'
                    }`}
                  >
                    {images.length > 0 ? `Choose Images (${images.length}/${MAX_IMAGES})` : `Choose Images`}
                  </button>
                </div>
                {images.length > 0 && (
                  <div className="grid gap-2">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl border border-[oklch(0.92_0.01_70)] bg-[oklch(0.98_0.002_70)] px-4 py-3"
                      >
                        <span className="truncate text-sm text-[oklch(0.2_0.01_0)]">
                          {image.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={loading}
                  className="rounded-xl border border-[oklch(0.92_0.01_70)] px-6 py-3 text-sm font-semibold text-[oklch(0.2_0.01_0)] hover:bg-[oklch(0.98_0.002_70)] transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[oklch(0.35_0.08_50)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsTab
