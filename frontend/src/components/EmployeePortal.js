import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeePortal.css'; 

const EmployeePortal = () => {
  const [transactions, setTransactions] = useState([]);
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions'); 
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleVerify = async (transactionId) => {
    try {
      await axios.patch(`http://localhost:5000/api/transactions/${transactionId}/verify`);
      fetchTransactions(); 
    } catch (error) {
      console.error('Error verifying transaction:', error);
    }
  };

  const handleSubmitToSwift = async (transactionId) => {
    try {
      await axios.patch(`http://localhost:5000/api/transactions/${transactionId}/submit`);
      setConfirmation(`Transaction ${transactionId} has been sent to SWIFT!`); 
      fetchTransactions(); 
    } catch (error) {
      console.error('Error submitting transaction to SWIFT:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Employee Portal</h2>
      <div className="dashboard-content">
        <p className="welcome-message">Manage Transactions Below</p>
        {confirmation && <p className="confirmation-message">{confirmation}</p>}
        <div className="button-container">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="card">
              <h3>Transaction Details</h3>
              <p>Amount: {transaction.amount}</p>
              <p>Currency: {transaction.currency}</p>
              <p>Provider: {transaction.provider}</p>
              <p>Account Info: {transaction.accountInfo}</p>
              <p>SWIFT Code: {transaction.swiftCode}</p>
              <p>Status: {transaction.verified ? 'Verified' : 'Pending'}</p>
              <div className="button-group">
                <button
                  className="dashboard-button"
                  onClick={() => handleVerify(transaction._id)}
                  disabled={transaction.verified}
                >
                  {transaction.verified ? 'Verified' : 'Verify'}
                </button>
                {transaction.verified && (
                  <button
                    className="dashboard-button"
                    onClick={() => handleSubmitToSwift(transaction._id)}
                    disabled={transaction.submittedToSwift}
                  >
                    {transaction.submittedToSwift ? 'Submitted' : 'Send to SWIFT'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;
