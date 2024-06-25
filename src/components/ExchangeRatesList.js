import React, { useEffect, useState } from 'react';

const ExchangeRatesList = ({ setBaseCurrency }) => {
  const [rates, setRates] = useState({});
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080' 
    : 'https://api.frankfurter.app';

  useEffect(() => {
    fetch(`${baseUrl}/latest?from=USD`)
      .then(response => response.json())
      .then(data => setRates(data.rates))
      .catch(error => console.error('Error fetching exchange rates:', error));
  }, [baseUrl]);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  return (
    <div>
      <h2>Exchange Rates</h2>
      <select onChange={handleBaseCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <ul>
        {Object.keys(rates).map((currency) => (
          <li key={currency}>
            {currency}: {rates[currency]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRatesList;
