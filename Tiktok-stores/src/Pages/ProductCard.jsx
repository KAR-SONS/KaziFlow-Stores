import React, { useState } from 'react'

const ProductCard = ({ product }) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  return (

    <div className="rounded-3xl overflow-hidden bg-white border">

      {/* Images */}
      <div className="relative overflow-hidden">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide min-h-[260px] md:min-h-[320px]"
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
              className="min-w-full h-[260px] md:h-[320px] lg:h-[380px] object-cover flex-shrink-0 snap-center"
            />
          ))}
        </div>
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

    </div>
  )
}

export default ProductCard