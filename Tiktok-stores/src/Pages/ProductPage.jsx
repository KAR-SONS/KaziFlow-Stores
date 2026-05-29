import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import supabase from '../supabaseClient'
import Header from './Header'

const ProductPage = () => {

  const { storeSlug } = useParams()

  const [store, setStore] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {

    const fetchStoreData = async () => {

      // 1. fetch store
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('store_slug', storeSlug)
        .single()

      if (storeError) {
        console.error(storeError)
        setLoading(false)
        return
      }

      setStore(storeData)

      // 2. fetch categories
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('store_id', storeData.id)

      if (categoryError) {
        console.error(categoryError)
      } else {
        setCategories(categoryData)
      }

      setLoading(false)

      //3. fetch products
      let query = supabase
        .from('products')
        .select(`
            *,
            product_images (
            image_url
            )
        `)
        .eq('store_id', storeData.id)

        if (selectedCategory) {
        query = query.eq('category_id', selectedCategory)
        } 

        const { data: productData, error: productError } = await query

        if (productError) {
        console.error(productError)
        } else {
        setProducts(productData)
        }
    }

    fetchStoreData()

  }, [storeSlug,selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Loading...
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-background">
    <header className="w-full bg-white border-b border-[oklch(0.92_0.01_70)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl uppercase font-bold text-[oklch(0.20_0.01_0)] tracking-tight">
               {store?.store_name}
            </h1>
            <p className="text-base sm:text-lg text-[oklch(0.50_0.01_0)]">
              Discover curated products from your favorite shop
            </p>
          </div>
        </div>
      </div>
    </header>

    <main className="w-full p-4">
        {/* Categories */}
        <div className="w-full bg-white border-b border-[oklch(0.92_0.01_70)] sticky top-20 z-40">
         <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-3 md:pb-0 scrollbar-hide">

            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] shadow-sm'
                  : 'bg-[oklch(0.88_0.005_70)] text-[oklch(0.50_0.01_0)] hover:bg-secondary'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>

          {categories.map((category) => (

            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] shadow-sm'
                  : 'bg-[oklch(0.88_0.005_70)] text-[oklch(0.50_0.01_0)] hover:bg-secondary'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>

          ))}

        </div>
        </div>
        </div>

         {/* Products */}
    <div className="flex flex-col gap-8 p-4">

        {products.map((product) => {
          const message = `🛍️ *${product.name}*

            💰 Price: KSh ${product.price}

            📦 Store: ${store?.store_name || ''}

            Hi 👋 I'm interested. Is it available?`

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[oklch(0.92_0.01_70)]"
            >

              {/* Images */}
              <div className="relative bg-[oklch(0.88_0.005_70)] flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                onScroll={(e) => {

                  const scrollLeft = e.target.scrollLeft
                  const width = e.target.clientWidth

                  const index = Math.round(scrollLeft / width)

                  setCurrentIndex(index)
                }}
              >

                {product.product_images?.map((img, index) => (

                  <img
                    key={index}
                    src={img.image_url}
                    alt={product.name}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />

                ))}

              </div>

              {/* Slider dots */}
              {product.product_images?.length > 1 && (

                <div className="flex items-center justify-center gap-2 py-3">

                  {product.product_images.map((_, index) => (

                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all ${
                        currentIndex === index
                          ? 'bg-black w-5'
                          : 'bg-gray-300'
                      }`}
                    />

                  ))}

                </div>

              )}

              {/* Content */}
              <div className="p-4">

                <div className="flex flex-col items-start gap-3">

                  <div className="flex items-start justify-between gap-2 w-full">
                    <h2 className="text-xl font-medium truncate">
                      {product.name}
                    </h2>

                    {product.size && (
                      <p className="text-sm font-semibold text-gray-500 uppercase whitespace-nowrap">
                        {product.size}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>

                  <div className="text-lg text-[oklch(0.35_0.08_50)] font-semibold">
                    KSh {product.price}
                  </div>

                </div>

                {/* CTA */}
                <Link
                  to={`/${store?.store_name}/product/${product.id}`}
                  className="mt-5 flex items-center justify-center rounded-2xl bg-[oklch(0.35_0.08_50)] px-5 py-4 text-white font-medium"
                >
                  View Product
                </Link>

              </div>

            </div>
          )
        })}

    </div>

    </main>

    </div>
  )
}

export default ProductPage