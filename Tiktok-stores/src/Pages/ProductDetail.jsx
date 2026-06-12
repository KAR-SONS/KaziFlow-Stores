import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'

const ProductDetail = () => {
  const { storeSlug, productId } = useParams()
  const navigate = useNavigate()

  const [store, setStore] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch store
        const { data: storeData, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('store_slug', storeSlug)
          .single()

        if (storeError) throw storeError
        setStore(storeData)

        // 2. Fetch specific product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select(`
            *,
            product_images (
              image_url
            ),
            category:categories(name)
          `)
          .eq('id', productId)
          .single()

        if (productError) throw productError
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [storeSlug, productId])
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-medium text-gray-600">Product not found</p>
        <button
          onClick={() => navigate(`/${storeSlug}`)}
          className="px-4 py-2 rounded-lg bg-[oklch(0.35_0.08_50)] text-white font-medium"
        >
          Back to Products
        </button>
      </div>
    )
  }
  
  const productUrl = `${window.location.origin}/${store?.store_slug}/product/${product.id}`
  const message = `🛍️ *${product.name}*

    💰 Price: KSh ${product.price}

    📄 ${product.description || ''}

    📦 Store: ${store?.store_name || ''}
    
    🔗 View Product: ${productUrl}

    Hi 👋 I'm interested. Is it available?`

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full bg-white border-b border-[oklch(0.92_0.01_70)]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <button
            onClick={() => navigate(`/${storeSlug}`)}
            className="text-[oklch(0.35_0.08_50)] hover:text-[oklch(0.25_0.1_50)] font-medium mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-[oklch(0.20_0.01_0)]">
            {store?.store_name}
          </h1>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-[oklch(0.88_0.005_70)] rounded-2xl overflow-hidden aspect-square">
              {product.product_images && product.product_images.length > 0 ? (
                <img
                  src={product.product_images[currentImageIndex]?.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}

              {/* Image counter */}
              {product.product_images && product.product_images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.product_images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.product_images && product.product_images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.product_images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-[oklch(0.35_0.08_50)]'
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-6">
            {/* Product Name & Size */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[oklch(0.20_0.01_0)] mb-2">
                {product.name}
              </h2>
              {product.size && (
                <p className="text-lg font-semibold text-gray-500 uppercase">
                  Size: {product.size}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-[oklch(0.35_0.08_50)]">
              KSh {product.price?.toLocaleString('en-US')}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {product.description || 'No description available'}
              </p>
            </div>

            {/* Additional Details */}
            {(product.category_id || product.stock) && (
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-[oklch(0.92_0.01_70)]">
                {product.category_id && (
                  <div>
                    <p className="text-md font-semibold text-gray-800 mb-1">
                      Category
                    </p>
                    <p className="text-base text-gray-800">
                      {product.category?.name || 'Uncategorized'}
                    </p>
                  </div>
                )}
                {product.stock !== undefined && (
                  <div>
                    <p className="text-md font-semibold text-gray-800 mb-1">
                      Stock
                    </p>
                    <p className="text-base text-green-700">
                       Available
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${store?.whatsapp_no}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[oklch(0.35_0.08_50)] px-6 py-4 text-white font-semibold text-lg hover:bg-[oklch(0.30_0.08_50)] transition-all"
            >
              <span>💬</span>
              <span>Inquire on WhatsApp</span>
            </a>

            {/* Store Info */}
            <div className="bg-[oklch(0.88_0.005_70)] rounded-lg p-4">
              <p className="text-sm text-gray-600">
                👋 Questions? Contact {store?.store_name} directly on WhatsApp
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail