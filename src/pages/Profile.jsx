import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('profile')
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'JohnnyD',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'United States'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saving profile:', formData)
    // Handle save logic
  }

  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: 'profile' },
    { id: 'contact', label: 'Contact Details', icon: 'contact' },
    { id: 'security', label: 'Security', icon: 'security' },
    { id: 'kyc', label: 'KYC Verification', icon: 'kyc' }
  ]

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'profile':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'contact':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'security':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'kyc':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="profile-page">
      {/* Dashboard Header */}
      <header className="profile-header">
        <div className="profile-header-container">
          <Link to="/dashboard" className="profile-logo">
            <img src={logo} alt="Hammers & Tongues Logo" />
            <span>Hammers & Tongues</span>
          </Link>
          
          <nav className="profile-header-nav">
            <Link to="/dashboard" className="nav-link">Home</Link>
            <Link to="/buyer/auctions" className="nav-link">Auctions</Link>
            <Link to="/my-bids" className="nav-link">My Bids</Link>
            <Link to="/won-items" className="nav-link">Won Items</Link>
          </nav>

          <div className="profile-header-right">
            <button className="notification-button" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8C6 11.3137 3.31371 14 0 14M18 8C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16M18 8C20.2091 8 22 5.79086 22 3C22 0.790861 20.2091 -1 18 -1C15.7909 -1 14 0.790861 14 3C14 5.79086 15.7909 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="notification-badge">3</span>
            </button>
            <Link to="/profile" className="profile-button" aria-label="Profile">
              <div className="profile-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Profile Content */}
      <main className="profile-main">
        <div className="profile-container">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="user-info-card">
              <div className="user-avatar">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="user-details">
                <h3 className="user-name">{formData.firstName} {formData.lastName}</h3>
                <p className="user-email">{formData.email}</p>
              </div>
            </div>

            <nav className="profile-menu">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="menu-icon">{getIcon(item.icon)}</span>
                  <span className="menu-label">{item.label}</span>
                </button>
              ))}
              <button className="menu-item logout" onClick={() => navigate('/signin')}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="menu-label">Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="profile-content">
            {activeSection === 'profile' && (
              <div className="content-section">
                <div className="section-header">
                  <h1 className="section-title">Profile Information</h1>
                  <p className="section-subtitle">Update your personal details here.</p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="form-card">
                    <div className="card-header">
                      <h2 className="card-title">Personal Details</h2>
                      <p className="card-subtitle">Manage your name and display name as it appears on H&T.</p>
                    </div>

                    <div className="form-fields">
                      <div className="field-row">
                        <div className="form-group">
                          <label htmlFor="firstName" className="form-label">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-input"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-input"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="displayName" className="form-label">Display Name</label>
                        <input
                          type="text"
                          id="displayName"
                          name="displayName"
                          className="form-input"
                          value={formData.displayName}
                          onChange={handleChange}
                        />
                        <p className="form-helper">This will be how your name will be displayed in the account section and in reviews.</p>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="content-section">
                <div className="section-header">
                  <h1 className="section-title">Contact Details</h1>
                  <p className="section-subtitle">Update your contact information.</p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="form-card">
                    <div className="card-header">
                      <h2 className="card-title">Contact Information</h2>
                      <p className="card-subtitle">Manage your email, phone, and address details.</p>
                    </div>

                    <div className="form-fields">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-input"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address" className="form-label">Street Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-input"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="field-row">
                        <div className="form-group">
                          <label htmlFor="city" className="form-label">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="form-input"
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="state" className="form-label">State</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            className="form-input"
                            value={formData.state}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="zipCode" className="form-label">Zip Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className="form-input"
                            value={formData.zipCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          className="form-input"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="content-section">
                <div className="section-header">
                  <h1 className="section-title">Security</h1>
                  <p className="section-subtitle">Manage your password and security settings.</p>
                </div>

                <div className="form-card">
                  <div className="card-header">
                    <h2 className="card-title">Change Password</h2>
                    <p className="card-subtitle">Update your password to keep your account secure.</p>
                  </div>

                  <div className="form-fields">
                    <div className="form-group">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                      Cancel
                    </button>
                    <button type="button" className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'kyc' && (
              <div className="content-section">
                <div className="section-header">
                  <h1 className="section-title">KYC Verification</h1>
                  <p className="section-subtitle">View your KYC verification status and documents.</p>
                </div>

                <div className="form-card">
                  <div className="card-header">
                    <h2 className="card-title">Verification Status</h2>
                    <p className="card-subtitle">Your identity verification status and submitted documents.</p>
                  </div>

                  <div className="kyc-status">
                    <div className="status-badge verified">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Verified</span>
                    </div>
                    <p className="status-description">Your identity has been successfully verified. You can now participate in all auctions.</p>
                  </div>

                  <div className="form-actions">
                    <Link to="/kyc-verification" className="btn-primary">
                      View Documents
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile

