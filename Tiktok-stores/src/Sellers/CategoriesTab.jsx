import React, {useState} from 'react'

const CategoriesTab = () => {
  const sampleCategories = [
    { id: 1, name: 'Fashion', productCount: 12, color: 'bg-blue-100' },
    { id: 2, name: 'Beauty', productCount: 8, color: 'bg-pink-100' },
    { id: 3, name: 'Electronics', productCount: 5, color: 'bg-purple-100' },
    { id: 4, name: 'Home & Living', productCount: 9, color: 'bg-green-100' },
    { id: 5, name: 'Accessories', productCount: 15, color: 'bg-yellow-100' },
  ]
  const [categories] = useState(sampleCategories)
  return (
   <div className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[oklch(0.2_0.01_0)]">Categories</h2>
          <p className="text-[oklch(0.5_0.01_0)] text-sm mt-1">{categories.length} categories in your store</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-2 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] font-semibold rounded-lg hover:opacity-90 transition-all">
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 bg-white border border-[oklch(0.92_0.01_70)] rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[oklch(0.2_0.01_0)]">{category.name}</h3>
                <p className="text-md text-[oklch(0.5_0.01_0)] mt-1">{category.productCount} products</p>
              </div>
              <button className="text-[oklch(0.5_0.01_0)] hover:text-[oklch(0.2_0.01_0)] transition-colors text-xl">⋯</button>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-md text-[oklch(0.2_0.01_0)] hover:bg-[oklch(0.88_0.005_70)] rounded transition-colors font-medium">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-md text-red-600 hover:bg-red-50 rounded transition-colors font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesTab