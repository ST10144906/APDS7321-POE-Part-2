import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]); // State to store transactions

  useEffect(() => {
    // Fetch all transactions when the component mounts
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions/getTransactions');
        setTransactions(response.data); // Store transactions in state
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, []);

  const handlePaymentClick = () => {
    navigate('/transactionform');
  };

  const handleLogsClick = () => {
    navigate('/payment-logs');
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-content">
        <p className="welcome-message">Welcome to the payment portal. Please choose an option below:</p>
        <div className="button-container">
          <button className="dashboard-button" onClick={handlePaymentClick}>Make a Payment</button>
          {isAdmin && (
            <button className="dashboard-button" onClick={handleLogsClick}>Review Payment Logs</button>
          )}
        </div>
      </div>

      {/* Transaction Area */}
      <div className="transaction-area">
        <h3>All Transactions</h3>
        <div className="transaction-list">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div className="transaction-card" key={index}>
                <div className="transaction-label">Amount:</div>
                <div className="transaction-value">{transaction.amount} {transaction.currency}</div>
                <div className="transaction-label">Account Info:</div>
                <div className="transaction-value">{transaction.accountInfo}</div>
                <div className="transaction-label">SWIFT Code:</div>
                <div className="transaction-value">{transaction.swiftCode}</div>
                <div className="transaction-label">Verified:</div>
                <div className="transaction-value">{transaction.verified ? 'Yes' : 'No'}</div>
              </div>
            ))
          ) : (
            <p>No transactions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
