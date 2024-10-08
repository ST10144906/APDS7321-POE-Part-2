import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './Dashboard.css';

const Dashboard = ({ isAdmin }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    if (user) {
      setUserInfo(JSON.stringify(user, null, 2));
    }
  }, [user]);

  const handlePaymentClick = () => {
    navigate('/transactionform');
  };

  const handleLogsClick = () => {
    navigate('/employeeportal');
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-content">
        <p className="welcome-message">Welcome to the Payment Portal</p>
        <div className="button-container">
          {user?.role === 'customer' && (
          <div className="card">
            <h3>Make a Payment</h3>
            <p>Click the button below to initiate a payment.</p>
            <button className="dashboard-button" onClick={handlePaymentClick}>
              Make a Payment
            </button>
          </div>
          )}
          {user?.role === 'admin' && (
            <div className="card">
              <h3>Review Payment Logs</h3>
              <p>Click the button below to view payment logs.</p>
              <button className="dashboard-button" onClick={handleLogsClick}>
                Review Payment Logs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
