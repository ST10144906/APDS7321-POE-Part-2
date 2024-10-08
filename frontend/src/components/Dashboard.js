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

        {/* Display Transactions */}
        <div className="form-group">
          <h3>All Transactions</h3>
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index}>
                  <strong>Amount:</strong> {transaction.amount} {transaction.currency} <br />
                  <strong>Account Info:</strong> {transaction.accountInfo} <br />
                  <strong>SWIFT Code:</strong> {transaction.swiftCode} <br />
                  <strong>Verified:</strong> {transaction.verified ? 'Yes' : 'No'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;