import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TransactionForm.css';
import axios from 'axios';

const TransactionForm = () => {
  const navigate = useNavigate()
  // State to manage form input
  const [transactionData, setTransactionData] = useState({
    amount: '',
    currency: '',
    provider: 'SWIFT',
    accountInfo: '',
    swiftCode: ''
  });

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Confirmation popup
    const confirmation = window.confirm('Are you sure the details are correct?');

    if (confirmation) {
      try {
        // Assuming the user is logged in and you have the customerId
        const customerId = 'hello'; // You should replace this with actual customer ID from login

        const res = await axios.post('http://localhost:5000/api/transactions', {
          ...transactionData,
          customerId, // Send customerId along with transaction data
        });

        // Success message
        alert(res.data.msg);
        navigate('/dashboard'); // Redirect user back to the dashboard
      } catch (err) {
        alert('Error: ' + (err.response ? err.response.data.msg : err.message));
      }
    }
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  return (
    <div className="transaction-form">
      <h2>International Payment</h2>
      <form onSubmit={handleSubmit}>
        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transactionData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Currency Input */}
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={transactionData.currency}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Provider (defaulting to SWIFT) */}
        <div className="form-group">
          <label htmlFor="provider">Provider:</label>
          <select
            id="provider"
            name="provider"
            value={transactionData.provider}
            onChange={handleInputChange}
            disabled
          >
            <option value="SWIFT">SWIFT</option>
          </select>
        </div>

        {/* Account Info Input */}
        <div className="form-group">
          <label htmlFor="accountInfo">Account Information:</label>
          <input
            type="text"
            id="accountInfo"
            name="accountInfo"
            value={transactionData.accountInfo}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* SWIFT Code Input */}
        <div className="form-group">
          <label htmlFor="swiftCode">SWIFT Code:</label>
          <input
            type="text"
            id="swiftCode"
            name="swiftCode"
            value={transactionData.swiftCode}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default TransactionForm;