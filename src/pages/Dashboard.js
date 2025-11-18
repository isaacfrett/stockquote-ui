// src/pages/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, deleteAccount } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setLoading(true);
    const result = await deleteAccount();
    
    if (result.success) {
      navigate('/signup');
    } else {
      alert(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome to Your Dashboard</h2>
        <div className="user-info">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Member since:</strong> {new Date(user?.created_at).toLocaleDateString()}</p>
        </div>
        
        <div className="dashboard-actions">
          <button 
            onClick={() => navigate('/stock-quote')} 
            className="primary-button"
          >
            Get Stock Quote
          </button>
          
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="danger-button"
          >
            Delete Account
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="delete-confirm">
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="confirm-buttons">
              <button 
                onClick={handleDeleteAccount} 
                disabled={loading}
                className="danger-button"
              >
                {loading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="secondary-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;