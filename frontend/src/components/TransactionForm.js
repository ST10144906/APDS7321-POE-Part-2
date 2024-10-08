import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TransactionForm.css';
import axios from 'axios';
import CurrencyDropdown from './CurrencyDropdown'; // Import CurrencyDropdown component

const TransactionForm = () => {
  const navigate = useNavigate();

  // Regular Expressions for validation
  const currencyRegex = /^[A-Z]{3}$/; // 3 uppercase letters for currency code
  const accountInfoRegex = /^\d{9,12}$/; // 9-12 digits for account info
  const swiftCodeRegex = /^[A-Za-z0-9]{6}$/; // 6 alphanumeric characters for SWIFT code

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

    // Basic validation
    if (!currencyRegex.test(transactionData.currency)) {
      return alert('Invalid currency code. It must be 3 uppercase letters.');
    }
    if (!accountInfoRegex.test(transactionData.accountInfo)) {
      return alert('Account Information must be between 9 and 12 digits.');
    }
    if (!swiftCodeRegex.test(transactionData.swiftCode)) {
      return alert('SWIFT Code must be 6 alphanumeric characters.');
    }

    // Confirmation popup
    const confirmation = window.confirm('Are you sure the details are correct?');

    if (confirmation) {
      try {
        const res = await axios.post('http://localhost:5000/api/transactions/add', {
          ...transactionData,
        });

        // Success message
        alert(res.data.msg);
        navigate('/dashboard'); // Redirect user back to the dashboard
      } catch (err) {
        console.error(err); // Log the full error
        alert('Error: ' + (err.response ? err.response.data.msg : err.message));
      }
    }
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  // Handler for currency change using the CurrencyDropdown
  const handleCurrencyChange = (value) => {
    setTransactionData({ ...transactionData, currency: value });
  };

  const goBackToDash = () => {
    navigate('/dashboard'); // Navigate to home page
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

        {/* Currency Dropdown */}
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <CurrencyDropdown
            value={transactionData.currency}
            onChange={handleCurrencyChange} // Use the new handler
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
            minLength={9}
            maxLength={12}
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
            maxLength={6}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Pay Now</button>
      </form>

      <button className="back-button" onClick={goBackToDash}>Back to Dashboard</button>
    </div>
  );
};

export default TransactionForm;
