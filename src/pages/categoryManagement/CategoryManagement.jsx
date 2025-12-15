import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryManagement.css';

export default function CategoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Industrial Machinery', items: 142, status: true, description: 'Heavy machinery and industrial equipment', icon: '🏭' },
    { id: 2, name: 'Vehicles & Fleet', items: 88, status: true, description: 'Cars, trucks, and commercial vehicles', icon: '🚗' },
    { id: 3, name: 'Office Furniture', items: 231, status: false, description: 'Office desks, chairs, and furnishings', icon: '🪑' },
    { id: 4, name: 'Electronics & IT', items: 175, status: true, description: 'Computers, servers, and IT equipment', icon: '💻' },
    { id: 5, name: 'Real Estate', items: 12, status: false, description: 'Commercial and residential properties', icon: '🏠' },
    { id: 6, name: 'Construction Equipment', items: 98, status: true, description: 'Construction tools and machinery', icon: '🚧' },
    { id: 7, name: 'Medical Equipment', items: 45, status: true, description: 'Medical devices and hospital equipment', icon: '🏥' },
    { id: 8, name: 'Agriculture Tools', items: 67, status: false, description: 'Farming equipment and agricultural tools', icon: '🚜' },
    { id: 9, name: 'Sports Equipment', items: 34, status: true, description: 'Sports gear and fitness equipment', icon: '⚽' },
    { id: 10, name: 'Art & Collectibles', items: 156, status: true, description: 'Artwork and collectible items', icon: '🎨' },
    { id: 11, name: 'Restaurant Equipment', items: 89, status: false, description: 'Kitchen and restaurant equipment', icon: '🍽️' },
    { id: 12, name: 'Lab Equipment', items: 43, status: true, description: 'Laboratory instruments and equipment', icon: '🔬' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleStatusToggle = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, status: !cat.status } : cat
    ));
  };

  const handleEdit = (id) => {
    const category = categories.find(cat => cat.id === id);
    if (category) {
      setNewCategoryName(category.name);
      setNewCategoryDesc(category.description);
      setEditCategoryId(id);
      setIsAddingCategory(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleSaveCategory = () => {
    if (newCategoryName.trim()) {
      if (editCategoryId) {
        // Edit existing category
        setCategories(categories.map(cat => 
          cat.id === editCategoryId 
            ? { ...cat, name: newCategoryName, description: newCategoryDesc }
            : cat
        ));
      } else {
        // Add new category
        const newCategory = {
          id: categories.length + 1,
          name: newCategoryName,
          items: 0,
          status: true,
          description: newCategoryDesc,
          icon: '📁'
        };
        setCategories([...categories, newCategory]);
      }
      setNewCategoryName('');
      setNewCategoryDesc('');
      setEditCategoryId(null);
      setIsAddingCategory(false);
    }
  };

  const handleCancel = () => {
    setIsAddingCategory(false);
    setNewCategoryName('');
    setNewCategoryDesc('');
    setEditCategoryId(null);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Page Header */}
          <div className="section-header">
            <div className="header-content">
              <h1 className="page-title">Category Management</h1>
              <p className="page-subtitle">Manage auction categories and their visibility status</p>
            </div>
            <div className="header-actions">
              {!isAddingCategory ? (
                <button className="primary-action-btn" onClick={() => setIsAddingCategory(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  New Category
                </button>
              ) : (
                <div className="quick-action-form">
                  <div className="form-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveCategory()}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Description (optional)"
                      value={newCategoryDesc}
                      onChange={(e) => setNewCategoryDesc(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveCategory()}
                    />
                  </div>
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button className="primary-btn" onClick={handleSaveCategory}>
                      {editCategoryId ? 'Update' : 'Add'} Category
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Stats */}
          <div className="category-stats-grid">
            <div className="stat-card">
              <div className="card-bg-gradient" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)' }}></div>
              <div className="card-icon-container">
                <div className="card-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <span className="card-label">Total Categories</span>
                <h3 className="card-value">{categories.length}</h3>
                <span className="card-change positive">+12%</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-bg-gradient" style={{ background: 'linear-gradient(135deg, rgba(140, 198, 63, 0.2) 0%, rgba(140, 198, 63, 0.05) 100%)' }}></div>
              <div className="card-icon-container">
                <div className="card-icon" style={{ backgroundColor: 'rgba(140, 198, 63, 0.15)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="#8CC63F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#8CC63F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <span className="card-label">Active Categories</span>
                <h3 className="card-value">{categories.filter(cat => cat.status).length}</h3>
                <span className="card-change positive">+8%</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-bg-gradient" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)' }}></div>
              <div className="card-icon-container">
                <div className="card-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <span className="card-label">Inactive Categories</span>
                <h3 className="card-value">{categories.filter(cat => !cat.status).length}</h3>
                <span className="card-change negative">-3%</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-bg-gradient" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 100%)' }}></div>
              <div className="card-icon-container">
                <div className="card-icon" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <span className="card-label">Total Items</span>
                <h3 className="card-value">{categories.reduce((sum, cat) => sum + cat.items, 0)}</h3>
                <span className="card-change positive">+24%</span>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="data-table-section">
            <div className="table-header">
              <div className="search-container">
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="table-info">
                <span className="table-count">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} categories
                </span>
              </div>
            </div>

            {/* Categories Table */}
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Items</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.length > 0 ? (
                    currentCategories.map((category) => (
                      <tr key={category.id} className="table-row">
                        <td>
                          <div className="category-info">
                            <div className="category-icon">
                              <span className="icon">{category.icon}</span>
                            </div>
                            <div className="category-details">
                              <h4 className="category-name">{category.name}</h4>
                              <span className="category-id">ID: CAT-{category.id.toString().padStart(3, '0')}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="description-cell">
                            <p className="description-text">{category.description}</p>
                          </div>
                        </td>
                        <td>
                          <div className="items-cell">
                            <div className="items-count-badge">
                              <span className="count">{category.items}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="status-cell">
                            <div 
                              className={`status-toggle ${category.status ? 'active' : ''}`}
                              onClick={() => handleStatusToggle(category.id)}
                            >
                              <div className="toggle-handle"></div>
                            </div>
                            <span className={`status-label ${category.status ? 'active' : 'inactive'}`}>
                              {category.status ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn edit-btn"
                              onClick={() => handleEdit(category.id)}
                              title="Edit category"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDelete(category.id)}
                              title="Delete category"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <div className="empty-state">
                          <div className="empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <h3>No categories found</h3>
                          <p>Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCategories.length > 0 && (
              <div className="table-pagination">
                <div className="pagination-info">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <div className="page-numbers">
                    {generatePageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`dots-${index}`} className="page-dots">...</span>
                      ) : (
                        <button
                          key={page}
                          className={`page-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>
                  
                  <button 
                    className="pagination-btn next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}