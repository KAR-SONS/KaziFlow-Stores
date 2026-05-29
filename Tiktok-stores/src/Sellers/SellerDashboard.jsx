import React,{useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ProductsTab from './ProductsTab'
import CategoriesTab from './CategoriesTab'
import supabase from '../supabaseClient'

const SellerDashboard = () => {
  const { storeSlug } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [activeTab, setActiveTab] = useState('products')
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchStore = async () => {

      // get logged in user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        navigate(`/${storeSlug}/login`)
        return
      }

      // fetch user's store
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error(error)
        navigate(`/${storeSlug}/login`)
      } else {
        setStore(data)

        // optional
        localStorage.setItem("store_id", data.id)
      }

      setLoading(false)
    }

    fetchStore()

  }, [storeSlug, navigate])
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading dashboard...
    </div>
  )
}

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No store found
      </div>
    )
  }

  const onTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const tabs = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
  ]
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.002_70)]">
      <header className="w-full bg-white border-b border-[oklch(0.92_0.01_70)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="#" className="text-2xl font-bold text-[oklch(0.2_0.010_70)]">
            KAZIFLOW <span className='text-xl font-semibold '>stores</span>
          </Link>
          <div className="hidden sm:block h-6 w-px bg-[oklch(0.92_0.01_70)]"></div>
          <span className="hidden sm:inline-block text-sm text-[oklch(0.5_0.01_0)]">Seller Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm text-[oklch(0.5_0.01_0)] hover:text-foreground transition-colors">
            Your Store
          </button>
        </div>
      </div>
    </header>

    <div className="flex">
    <nav className="hidden md:block w-64 bg-white border-r border-[oklch(0.92_0.01_70)] min-h-[calc(100vh-73px)]">
      <div className="p-6 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all flex items-center gap-3 ${
              activeTab === tab.id
                ? 'bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)]'
                : 'text-[oklch(0.2_0.01_0)] hover:bg-muted'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>

    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center text-xs ${
            activeTab === tab.id ? 'text-orange-600' : 'text-gray-500'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>

    <main className="flex-1 pb-16 md:pb-0">
          {activeTab === 'products' && <ProductsTab store={store}/>}
          {activeTab === 'categories' && <CategoriesTab store={store} />}
        </main>
    </div>
    </div>
  )
}

export default SellerDashboard