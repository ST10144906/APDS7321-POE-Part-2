import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeePortal.css';

const EmployeePortal = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/transactions/pending');
        setTransactions(res.data);
      } catch (err) {
        alert('Error fetching transactions: ' + err.response.data.msg);
      }
    };
    fetchTransactions();
  }, []);

  const handleVerify = (id) => {
    setTransactions(transactions.map(txn => txn._id === id ? { ...txn, verified: true } : txn));
  };

  const handleSubmitToSwift = async () => {
    try {
      await axios.post('http://localhost:5000/api/transactions/submit', {
        transactions: transactions.filter(txn => txn.verified)
      });
      alert('Transactions submitted to SWIFT');
    } catch (err) {
      alert('Error submitting transactions: ' + err.response.data.msg);
    }
  };

  return (
    <div className="employee-portal">
      <h2>Employee Portal - Transaction Verification</h2>
      <ul className="transaction-list">
        {transactions.map(txn => (
          <li key={txn._id} className={txn.verified ? 'verified' : ''}>
            <p>Amount: {txn.amount} {txn.currency}</p>
            <p>Account Info: {txn.accountInfo}</p>
            <p>SWIFT Code: {txn.swiftCode}</p>
            <button disabled={txn.verified} onClick={() => handleVerify(txn._id)}>
              {txn.verified ? 'Verified' : 'Verify'}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmitToSwift} disabled={!transactions.some(txn => txn.verified)}>
        Submit to SWIFT
      </button>
    </div>
  );
};

export default EmployeePortal;
