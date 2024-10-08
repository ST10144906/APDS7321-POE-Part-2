import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { role } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    setUserInfo(`Role: ${role}`);
  }, [role]);

  const handlePaymentClick = () => {
    navigate('/payment');
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
        {role === 'admin' && (
          <div className="form-group">
            <button onClick={handleLogsClick}>Review Payment Logs</button>
          </div>
        )}
        <div className="form-group">
          <label>User Information:</label>
          <textarea
            value={userInfo}
            readOnly
            rows="10"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
