import React, {useState} from 'react'


const ProductsTab = () => {

 const sampleProducts = [
  { id: 1, name: 'Designer Handbag', price: 89.99, category: 'Fashion', stock: 12, image: '👜' },
  { id: 2, name: 'Organic Face Serum', price: 45.99, category: 'Beauty', stock: 28, image: '✨' },
  { id: 3, name: 'Wireless Earbuds', price: 79.99, category: 'Electronics', stock: 5, image: '🎧' },
  { id: 4, name: 'Silk Pillowcase', price: 34.99, category: 'Home & Living', stock: 15, image: '🛏️' },
  { id: 5, name: 'Gold Necklace', price: 129.99, category: 'Accessories', stock: 8, image: '⛓️' },
  { id: 6, name: 'Summer Dress', price: 62.99, category: 'Fashion', stock: 22, image: '👗' },
]

 const [products] = useState(sampleProducts)
  return (
     <div className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[oklch(0.2_0.01_0)]">Your Products</h2>
          <p className="text-[oklch(0.5_0.01_0)] text-sm mt-1">{products.length} products in your store</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-2 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] font-semibold rounded-lg hover:opacity-90 transition-all">
          Add Product
        </button>
      </div>

      <div className="grid gap-4">
        {/* Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-[oklch(0.88_0.005_70)] rounded-lg">
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Product</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Category</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Price</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)]">Stock</div>
          <div className="text-sm font-semibold text-[oklch(0.2_0.01_0)] text-right">Action</div>
        </div>

        {/* Product Rows */}
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center p-4 bg-white border border-[oklch(0.92_0.01_70)] rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{product.image}</span>
              <div>
                <p className="font-medium text-[oklch(0.2_0.01_0)] text-sm sm:text-base">{product.name}</p>
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
              <button className="px-3 py-1 text-sm font-medium sm:text-sm text-[oklch(0.2_0.01_0)] hover:bg-[oklch(0.88_0.005_70)] rounded transition-colors">
                Edit
              </button>
              <button className="px-3 py-1 text-sm font-medium sm:text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsTab