import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Header from '../Pages/Header'

const HomePage = () => {
  const message = `Hi 👋 I'm interested in creating a store on KAZIFLOW Stores. Can you help me get started?`
  return (
    <div className='min-h-screen bg-background'>
      <Header/>
       <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[oklch(0.2_0.01_0)] text-balance">
              Sell Your Products Directly to Your Customers
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.5_0.01_0)] text-balance leading-relaxed">
              Your personal storefront. No complex setup. No hidden fees. Just beautiful products, direct WhatsApp sales, and complete control.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <a 
                href={`https://wa.me/254728482191?text=${encodeURIComponent(message)}`} 
                className="px-6 py-3 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] font-semibold rounded-lg hover:opacity-90 transition-all inline-flex items-center gap-2">
                Create Your Store <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary border-y border-[oklch(0.92_0.01_70)]">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-[oklch(0.2_0.01_0)] mb-4">Why Choose Shop</h3>
              <p className="text-lg text-[oklch(0.5_0.01_0)]">Everything you need to sell successfully</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '✨',
                  title: 'Beautiful Stores',
                  description: 'Professional storefronts that showcase your products perfectly. No design skills needed.'
                },
                {
                  icon: '💬',
                  title: 'WhatsApp Sales',
                  description: 'Direct WhatsApp integration. Customers order directly. You handle sales immediately.'
                },
                {
                  icon: '📊',
                  title: 'Full Control',
                  description: 'Manage products, categories, and pricing. Complete dashboard at your fingertips.'
                },
                {
                  icon: '🚀',
                  title: 'Instant Setup',
                  description: 'Go live in minutes. No waiting. Start selling right away.'
                },
                {
                  icon: '🎯',
                  title: 'Real Customers',
                  description: 'Reach millions of buyers browsing our curated marketplace.'
                },
                {
                  icon: '💰',
                  title: 'Zero Hidden Fees',
                  description: 'Simple, transparent pricing. See exactly what you pay.'
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 bg-white rounded-lg border border-[oklch(0.92_0.01_70)] hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-[oklch(0.2_0.01_0)] mb-2">{feature.title}</h4>
                  <p className="text-[oklch(0.5_0.01_0)]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-[oklch(0.2_0.01_0)] mb-4">Simple, Transparent Pricing</h3>
            <p className="text-lg text-[oklch(0.5_0.01_0)]">Start today. Upgrade as you grow.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">

            {/* Pro Tier */}
            <div className="border-2 border-[oklch(0.35_0.08_50)] rounded-lg p-8 hover:shadow-lg transition-shadow bg-white relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h4 className="text-2xl font-bold text-[oklch(0.2_0.01_0)] mb-2">Pro</h4>
              <p className="text-[oklch(0.5_0.01_0)] mb-6">For all businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[oklch(0.2_0.01_0)]">Kes 2,499</span>
                <span className="text-[oklch(0.5_0.01_0)] pl-5">One Time Payment</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">Unlimited products</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">Unlimited categories</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">Advanced analytics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">Priority support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">Shop domain</span>
                </li>
              </ul>
              <a href={`https://wa.me/254728482191?text=${encodeURIComponent(message)}`} className="w-full px-4 py-3 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] font-semibold rounded-lg hover:opacity-90 transition-all text-center block">
                Start Today
              </a>
            </div>

            {/* Enterprise Tier */}
            <div className="border border-[oklch(0.92_0.01_70)] rounded-lg p-8 hover:shadow-lg transition-shadow bg-white">
              <h4 className="text-2xl font-bold text-[oklch(0.2_0.01_0)] mb-2">Enterprise</h4>
              <p className="text-[oklch(0.5_0.01_0)] mb-6">Custom solutions</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[oklch(0.2_0.01_0)]">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">All Pro features</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">API access</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">Dedicated support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.35_0.08_50)]">✓</span>
                  <span className="text-[oklch(0.2_0.01_0)]">Advanced integrations</span>
                </li>
              </ul>
              <button className="w-full px-4 py-2 border border-[oklch(0.92_0.01_70)] text-[oklch(0.2_0.01_0)] font-semibold rounded-lg hover:bg-[oklch(0.92_0.01_70)] transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)]">
          <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Selling?</h3>
            <p className="text-lg mb-8 opacity-95">Join thousands of sellers making money on Shop. It takes less than 2 minutes to set up.</p>
            <a href={`https://wa.me/254728482191?text=${encodeURIComponent(message)}`} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[oklch(0.35_0.08_50)] font-bold rounded-lg hover:opacity-90 transition-all">
              Create Store Now <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[oklch(0.92_0.01_70)] border-t border-[oklch(0.8_0.01_70)]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center text-[oklch(0.2_0.01_0)]">
              <p>&copy; 2026 KAZIFLOW stores. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default HomePage