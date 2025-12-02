import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import './MyBids.css'

const MyBids = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Mock active bids data
  const activeBids = [
    {
      id: 1,
      lotId: '#789012',
      title: 'Antique Ming Dynasty Vase',
      category: 'Fine Art & Collectibles Auction',
      image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80',
      status: 'outbid',
      isLive: true,
      currentHighestBid: 2500.00,
      yourBid: 2400.00,
      timeRemaining: '1d 4h 12m 5s'
    },
    {
      id: 2,
      lotId: '#456789',
      title: '1985 Rolex Submariner',
      category: 'Luxury Watch Auction',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      status: 'leading',
      isLive: true,
      currentHighestBid: 8750.00,
      yourBid: 8750.00,
      timeRemaining: '2h 30m 15s'
    },
    {
      id: 3,
      lotId: '#123456',
      title: '1969 Ford Mustang Boss 429',
      category: 'Classic Car Auction',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      status: 'upcoming',
      isLive: false,
      startingBid: 150000.00,
      yourMaxBid: 175000.00,
      timeRemaining: '3d 8h 0m 0s'
    },
    {
      id: 4,
      lotId: '#345678',
      title: 'Vintage Persian Rug',
      category: 'Fine Art & Collectibles Auction',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
      status: 'leading',
      isLive: true,
      currentHighestBid: 3200.00,
      yourBid: 3200.00,
      timeRemaining: '5h 45m 30s'
    },
    {
      id: 5,
      lotId: '#567890',
      title: 'Modern Abstract Painting',
      category: 'Fine Art & Collectibles Auction',
      image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80',
      status: 'outbid',
      isLive: true,
      currentHighestBid: 4500.00,
      yourBid: 4200.00,
      timeRemaining: '12h 20m 10s'
    }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // Filter to only show live auctions (exclude upcoming)
  const filteredBids = activeBids.filter(bid => {
    // Only show live auctions
    if (!bid.isLive) return false
    
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.lotId.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  const itemsPerPage = 12
  const totalPages = Math.ceil(filteredBids.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleBids = filteredBids.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="my-bids-page">
      {/* Buyer Dashboard Header */}
      <header className="my-bids-header">
        <div className="my-bids-header-container">
          <Link to="/dashboard" className="my-bids-logo">
            <img src={logo} alt="Hammers & Tongues Logo" />
            <span>Hammers & Tongues</span>
          </Link>
          
          <nav className="my-bids-nav">
            <Link to="/dashboard" className="nav-link">Home</Link>
            <Link to="/buyer/auctions" className="nav-link">Auctions</Link>
            <Link to="/my-bids" className="nav-link active">My Bids</Link>
            <Link to="/won-items" className="nav-link">Won Items</Link>
          </nav>

          <div className="my-bids-header-right">
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

      {/* My Bids Content */}
      <div className="my-bids-content">
        <div className="my-bids-container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs">
            <Link to="/dashboard">Dashboard</Link>
            <span>/</span>
            <span>Bids</span>
            <span>/</span>
            <span>Active</span>
          </nav>

          {/* Page Header */}
          <div className="page-header">
            <div className="header-left">
              <h1 className="page-title">Active Bids</h1>
            </div>
            <div className="header-right">
              <div className="live-updates-indicator">
                <span className="live-dot">•</span>
                <span>Live Updates Enabled</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="search-bar">
            <div className="search-wrapper">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by Lot Name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Bids Grid */}
          <div className="bids-grid">
            {visibleBids.map(bid => (
              <div 
                key={bid.id} 
                className={`bid-card ${bid.status === 'outbid' ? 'outbid' : bid.status === 'leading' ? 'leading' : 'upcoming'}`}
              >
                {/* Status Banner */}
                {bid.status === 'outbid' && (
                  <div className="status-banner outbid-banner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>You have been outbid — Increase your bid to stay in the lead.</span>
                  </div>
                )}
                {bid.status === 'leading' && (
                  <div className="status-banner leading-banner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>You are the leading bidder!</span>
                  </div>
                )}

                  {/* Image */}
                <div className="bid-image">
                  <img src={bid.image} alt={bid.title} />
                  <div className="live-badge">
                    <span className="live-dot">•</span>
                    <span>Live</span>
                  </div>
                </div>

                {/* Details */}
                <div className="bid-details">
                  <div className="bid-lot-id">{bid.lotId}</div>
                  <h3 className="bid-title">{bid.title}</h3>
                  <div className="bid-category">{bid.category}</div>

                  {/* Bidding Info */}
                  <div className="bidding-info">
                    <div className="bid-row">
                      <span className="bid-label">Current Highest Bid</span>
                      <span className="bid-value">{formatCurrency(bid.currentHighestBid)}</span>
                    </div>
                    <div className={`bid-row ${bid.status === 'outbid' ? 'outbid-row' : 'leading-row'}`}>
                      <span className="bid-label">Your Bid</span>
                      <span className={`bid-value ${bid.status === 'outbid' ? 'outbid-value' : 'leading-value'}`}>
                        {formatCurrency(bid.yourBid)}
                      </span>
                    </div>
                  </div>

                  {/* Time Remaining */}
                  <div className="time-remaining">
                    <span className="time-label">Time Remaining</span>
                    <span className="time-value">{bid.timeRemaining}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bid-actions">
                  <button 
                    className="action-btn secondary"
                    onClick={() => navigate(`/buyer/auction/${bid.id}`)}
                  >
                    Enter Live Room
                  </button>
                  <button 
                    className="action-btn primary"
                    onClick={() => navigate(`/buyer/auction/${bid.id}`)}
                  >
                    Increase Bid
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="pagination-numbers">
                {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => {
                  const pageNum = index + 1
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                {totalPages > 3 && (
                  <>
                    <span className="pagination-ellipsis">...</span>
                    <button
                      className={`pagination-number ${currentPage === totalPages ? 'active' : ''}`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBids

