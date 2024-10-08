import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    navigate('/transactionform');
  };

  const handleLogsClick = () => {
    navigate('/payment-logs');
  };

  return (
    <div className="form-container">
      <h2>Dashboard</h2>
      <div className="dashboard-content">
        <p>Welcome to the payment portal. Please choose an option below:</p>
        <div className="form-group">
          <button onClick={handlePaymentClick}>Make a Payment</button>
        </div>
        {isAdmin && (
          <div className="form-group">
            <button onClick={handleLogsClick}>Review Payment Logs</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;