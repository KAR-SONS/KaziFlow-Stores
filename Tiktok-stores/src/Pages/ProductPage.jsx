import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../supabaseClient'
import Header from './Header'

const ProductPage = () => {

  const { storeSlug } = useParams()

  const [store, setStore] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

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
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
            *,
            product_images (
            image_url
            )
        `)
        .eq('store_id', storeData.id)

        if (productError) {
        console.error(productError)
        } else {
        setProducts(productData)
        }
    }

    fetchStoreData()

  }, [storeSlug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
          <div className="flex gap-2 overflow-x-auto pb-3 md:pb-0">

          {categories.map((category) => (

            <button
              key={category.id}
              className="px-4 py-2 rounded-full text-md font-medium transition-all whitespace-nowrap bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] shadow-sm"
            >
              {category.name}
            </button>

          ))}

        </div>
        </div>
        </div>

         {/* Products */}
    <div className="flex flex-col gap-8 p-4">

        {products.map((product) => (

        <div
            key={product.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border"
        >

            {/* Images */}
            <div className="flex overflow-x-auto snap-x snap-mandatory">

            {product.product_images?.map((img, index) => (

                <img
                key={index}
                src={img.image_url}
                alt={product.name}
                className="w-full h-[500px] object-cover flex-shrink-0 snap-center"
                />

            ))}

            </div>

            {/* Content */}
            <div className="p-4">

            <div className="flex items-start justify-between gap-3">

                <div>
                <h2 className="text-xl font-bold">
                    {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                </p>
                </div>

                <div className="text-lg font-bold">
                KSh {product.price}
                </div>

            </div>

            {/* CTA */}
            <a
                href={`https://wa.me/${store?.whatsapp_no}?text=Hi, I'm interested in ${product.name}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-center rounded-2xl bg-green-500 px-5 py-4 text-white font-semibold"
            >
                Order on WhatsApp
            </a>

            </div>

        </div>

        ))}

    </div>

    </main>

    </div>
  )
}

export default ProductPage