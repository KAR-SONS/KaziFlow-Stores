import React from 'react'
import { Link } from 'react-router-dom'
import ProductsTab from './ProductsTab'
import CategoriesTab from './CategoriesTab'

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('products')

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
          <Link to="/" className="text-2xl font-bold text-[oklch(0.2_0.010_70)]">
            Shop
          </Link>
          <div className="hidden sm:block h-6 w-px bg-[oklch(0.92_0.01_70)]"></div>
          <span className="hidden sm:inline-block text-sm text-[oklch(0.5_0.01_0)]">Seller Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm text-[oklch(0.5_0.01_0)] hover:text-foreground transition-colors">
            Your Store
          </button>
          <button className="px-4 py-2 text-md bg-[oklch(0.88_0.005_70)] text-[oklch(0.2_0.01_0)] rounded-lg hover:bg-muted/80 transition-colors">
            Logout
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

    <main className="flex-1">
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'categories' && <CategoriesTab />}
        </main>
    </div>
    </div>
  )
}

export default SellerDashboard