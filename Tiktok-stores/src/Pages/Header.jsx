import React from 'react'

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-[oklch(0.92_0.01_70)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-[oklch(0.20_0.01_0)] tracking-tight">
              Shop
            </h1>
            <p className="text-base sm:text-lg text-[oklch(0.50_0.01_0)]">
              Discover curated products from your favorite shop
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header