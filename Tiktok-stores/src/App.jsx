import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignupPage from './Sellers/SignupPage';
import ProfileSetup from './Sellers/ProfileSetup';
import Login from './Sellers/Login';
import SellerDashboard from './Sellers/SellerDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/profile-setup' element={<ProfileSetup />} />
        <Route path="/:storeSlug/login" element={<Login />} />
        <Route path='/:storeSlug/seller-dashboard' element={<SellerDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
