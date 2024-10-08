import React from 'react';
import currencyCodes from 'currency-codes';

const CurrencyDropdown = ({ onChange, value }) => {
  // Get the list of currency codes
  const currencies = currencyCodes.codes();

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} required>
      <option value="">Select Currency</option> {/* Default option */}
      {currencies.map((code) => {
        const currency = currencyCodes.code(code);
        return (
          <option key={code} value={code}>
            {`${code} - ${currency.currency}`}
          </option>
        );
      })}
    </select>
  );
};

export default CurrencyDropdown;
