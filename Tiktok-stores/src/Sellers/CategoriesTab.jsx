import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import supabase from '../supabaseClient'

const CategoriesTab = () => {
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpenModal = () => setShowModal(true)
  const storeId = localStorage.getItem("store_id")
  
  const handleCloseModal = () => {
    setShowModal(false)
    setCategoryName('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([
          {
            store_id: storeId,
            name: categoryName
          }
        ])
        .select()
      // Use the data from the API response
      if (data && data.length > 0) {
        const newCategory = data[0]

        setCategories((prev) => [
          newCategory,
          ...prev
        ])
      }

      handleCloseModal()
    } catch (error) {
      console.error("Error creating category:", error)
      setError(error.response?.data?.message || "Failed to create category. Please try again.")
    } finally {
       setLoading(false)
    }
    
  }

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId)

    if (error) {
      console.error(error)
      alert("Failed to delete category")
      return
    }

    setCategories((prev) =>
      prev.filter((cat) => cat.id !== categoryId)
    )
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('store_id', storeId)
          .order('created_at', { ascending: false })

        if (error) {
          console.error("Error fetching categories:", error)
          return
        }

        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    
    fetchCategories()
  } , [storeId])
  
  return (
   <div className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[oklch(0.2_0.01_0)]">Categories</h2>
          <p className="text-[oklch(0.5_0.01_0)] text-sm mt-1">{categories.length} categories in your store</p>
        </div>  
        <button
          onClick={handleOpenModal}
          className="w-full sm:w-auto px-6 py-2 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] font-semibold rounded-lg hover:opacity-90 transition-all"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 bg-white border border-[oklch(0.5_0_0)] rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[oklch(0.2_0.01_0)]">{category.name}</h3>
              </div>
              <button className="text-[oklch(0.5_0.01_0)] hover:text-[oklch(0.2_0.01_0)] transition-colors text-xl">⋯</button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleDelete(category.id)} className="flex-1 px-3 py-2 text-md text-red-600 hover:bg-red-50 rounded transition-colors font-medium">
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
                <h3 className="text-2xl font-bold text-[oklch(0.2_0.01_0)]">Add New Category</h3>
                <p className="text-sm text-[oklch(0.5_0.01_0)] mt-1">Add your category details below.</p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-[oklch(0.5_0.01_0)] text-lg font-semibold hover:text-[oklch(0.2_0.01_0)]"
              >
                Close
              </button>
            </div>

             <form id="categoryForm" className="space-y-6 overflow-y-auto p-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[oklch(0.2_0.01_0)]">Category Name</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-[oklch(0.5_0_0)] px-4 py-3 text-md focus:border-[oklch(0.35_0.08_50)] focus:outline-none disabled:opacity-50"
                  />
                </div>
                </div>
              </form>
               <div className="p-6 border-t border-[oklch(0.92_0.01_70)] flex-shrink-0 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={loading}
                className="rounded-xl border border-[oklch(0.5_0_0)] px-6 py-3 text-sm font-semibold text-[oklch(0.2_0.01_0)] hover:bg-[oklch(0.98_0.002_70)] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="categoryForm"
                disabled={loading}
                className="rounded-xl bg-[oklch(0.35_0.08_50)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Category'}
              </button>
            </div>
            </div>
          </div>
        )}

    </div>
  )
}

export default CategoriesTab