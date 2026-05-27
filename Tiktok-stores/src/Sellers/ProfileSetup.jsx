import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'

const ProfileSetup = () => {
    const [storeName, setStoreName] = useState('')
    const [whatsappNumber, setWhatsappNumber] = useState('')
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const generateSlug = () => {
        return storeName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/-+/g, '-')
        .slice(0, 50)
    }

    const slug = generateSlug()

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error('Supabase auth getUser error:', error)
                setLoading(false)
                return
            }
            setUser(data.user)
            setLoading(false)
        }

        fetchUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            console.error('No authenticated user found.')
            return
        }

        const formData = {
            user_id: user.id,
            store_name: storeName,
            whatsapp_no: whatsappNumber,
            store_slug: slug,
        }

        try {
            const res = await axios.post(
                'http://localhost:8000/create-store/',
                formData
            )

           navigate(`/${slug}/login`);
        } catch (err) {
            console.log(err)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-base text-gray-600">Loading your profile...</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md text-center border rounded-2xl p-8 bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Not signed in</h2>
                    <p className="text-sm text-gray-600 mb-6">Please login or signup before creating a store.</p>
                </div>
            </div>
        )
    }

    return (
    <div className="min-h-screen bg-[oklch(0.98_0.002_70)] flex flex-col">
         <main className="flex-1 flex items-center justify-center px-4 py-8">
             <div className="w-full max-w-md">
                 {/* Form Card */}
          <div className="bg-[oklch(1_0_70)] rounded-2xl p-8 border border-[oklch(0.92_0.01_70)] shadow-sm">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[oklch(0.20_0.01_0)] mb-2">Create Your Store</h1>
              <p className="text-sm text-[oklch(0.50_0.01_0)]">
                Set up your shop in seconds and start selling
              </p>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Store Name Input */}
              <div>
                <label htmlFor="storeName" className="block text-sm font-semibold text-[oklch(0.2_0.01_0)] mb-2">
                  Store Name
                </label>
                <input
                  id="storeName"
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g., Trendy Fashion Hub"
                  className="w-full px-4 py-3 font-semibold rounded-lg bg-[oklch(0.98_0.002_70)] border border-[oklch(0.92_0.01_70)] text-[oklch(0.2_0.01_0)] placeholder-[oklch(0.5_0.01_0)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.35_0.08_50)] focus:border-transparent transition-all"
                />
              </div>

                {/* Slug Preview */}
              {storeName && (
                <div className="p-4 bg-[oklch(0.92_0.01_70)] rounded-lg border border-[oklch(0.92_0.01_70)]">
                  <p className="text-sm text-[oklch(0.50_0.01_0)] mb-1">Your shop URL</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[oklch(0.50_0.01_0)]">kaziflow.co.ke/</span>
                    <span className="font-semibold text-[oklch(0.2_0.01_0)] break-all">{slug || 'your-store'}</span>
                  </div>
                </div>
              )}

                {/* WhatsApp Number Input */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-[oklch(0.2_0.01_0)] mb-2">
                  WhatsApp Number
                </label>
                <div className="flex items-center">
                  <span className="px-4 py-3 bg-[oklch(0.92_0.01_70)] border border-r-0 border-[oklch(0.92_0.01_70)] rounded-l-lg text-sm text-[oklch(0.50_0.01_0)] font-medium">
                    +
                  </span>
                  <input
                    id="whatsapp"
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234567890"
                    className="flex-1 px-4 py-3 font-semibold rounded-r-lg bg-[oklch(0.98_0.002_70)] border border-[oklch(0.92_0.01_70)] text-[oklch(0.2_0.01_0)] placeholder:[oklch(0.5_0.01_0)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.35_0.08_50)] focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-sm text-[oklch(0.50_0.01_0)] mt-2">
                  Include your country code (e.g., 254 for KE)
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!storeName.trim() || !whatsappNumber.trim()}
                className="w-full py-3 px-4 bg-[oklch(0.35_0.08_50)] text-[oklch(1_0_0)] font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-8"
              >
                Create Store
              </button>

            </form>
            </div>
             </div>
         </main>
    </div>
  )
}

export default ProfileSetup