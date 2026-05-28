import React, { useState } from 'react'

const ProductsTab = () => {
  const categories = ['Fashion', 'Beauty', 'Electronics', 'Home & Living', 'Accessories']

  const sampleProducts = [
    { id: 1, name: 'Designer Handbag', price: 89.99, category: 'Fashion', stock: 12, image: '👜' },
    { id: 2, name: 'Organic Face Serum', price: 45.99, category: 'Beauty', stock: 28, image: '✨' },
    { id: 3, name: 'Wireless Earbuds', price: 79.99, category: 'Electronics', stock: 5, image: '🎧' },
    { id: 4, name: 'Silk Pillowcase', price: 34.99, category: 'Home & Living', stock: 15, image: '🛏️' },
    { id: 5, name: 'Gold Necklace', price: 129.99, category: 'Accessories', stock: 8, image: '⛓️' },
    { id: 6, name: 'Summer Dress', price: 62.99, category: 'Fashion', stock: 22, image: '👗' },
  ]

  const [products, setProducts] = useState(sampleProducts)
  const [showModal, setShowModal] = useState(false)
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [images, setImages] = useState([])

  const handleOpenModal = () => setShowModal(true)

  const handleCloseModal = () => {
    setShowModal(false)
    setProductName('')
    setDescription('')
    setPrice('')
    setStockQuantity('')
    setSelectedCategory(categories[0])
    setImageUrlInput('')
    setImages([])
  }

  const handleAddImage = () => {
    const trimmedUrl = imageUrlInput.trim()
    if (!trimmedUrl) return
    setImages((prev) => [...prev, trimmedUrl])
    setImageUrlInput('')
  }

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newProduct = {
      id: Date.now(),
      name: productName,
      description,
      price: parseFloat(price) || 0,
      category: selectedCategory,
      stock: parseInt(stockQuantity, 10) || 0,
      images,
      image: images[0] || '🛍️',
    }

    setProducts((prev) => [newProduct, ...prev])
    handleCloseModal()
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
              <span className="text-3xl">{product.images && product.images.length > 0 ? '🖼️' : product.image}</span>
              <div>
                <p className="font-medium text-[oklch(0.2_0.01_0)] text-md sm:text-base">{product.name}</p>
                <p className="text-sm font-medium text-[oklch(0.5_0.01_0)] md:hidden">{product.category}</p>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-[oklch(0.2_0.01_0)]">{product.category}</span>
            </div>
            <div>
              <p className="font-semibold text-[oklch(0.2_0.01_0)] text-sm sm:text-base">${product.price}</p>
            </div>
            <div className="hidden md:block">
              <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.stock} units
              </span>
            </div>
            <div className="flex gap-2 justify-end md:justify-end col-span-2 md:col-span-1">
              <button className="px-3 py-1 text-md font-medium sm:text-sm text-[oklch(0.2_0.01_0)] hover:bg-[oklch(0.88_0.005_70)] rounded transition-colors">
                Edit
              </button>
              <button className="px-3 py-1 text-md font-medium sm:text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
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
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
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
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selectedCategory === category
                          ? 'bg-[oklch(0.35_0.08_50)] text-white border-transparent'
                          : 'bg-white text-[oklch(0.2_0.01_0)] border-[oklch(0.92_0.01_70)] hover:border-[oklch(0.35_0.08_50)]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Image URLs</label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    type="file"
                    placeholder="Choose images to add"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 rounded-xl border border-[oklch(0.92_0.01_70)] px-4 py-3 text-sm focus:border-[oklch(0.35_0.08_50)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-full sm:w-auto rounded-xl bg-[oklch(0.35_0.08_50)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
                  >
                    Add Image
                  </button>
                </div>
                {images.length > 0 && (
                  <div className="grid gap-2">
                    {images.map((url, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl border border-[oklch(0.92_0.01_70)] bg-[oklch(0.98_0.002_70)] px-4 py-3"
                      >
                        <span className="truncate text-sm text-[oklch(0.2_0.01_0)]">{url}</span>
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

            </form>

            <div className="p-6 border-t border-[oklch(0.92_0.01_70)] flex-shrink-0 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-xl border border-[oklch(0.92_0.01_70)] px-6 py-3 text-sm font-semibold text-[oklch(0.2_0.01_0)] hover:bg-[oklch(0.98_0.002_70)] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-xl bg-[oklch(0.35_0.08_50)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsTab
