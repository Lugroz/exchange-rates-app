import React from 'react';

const ExchangeRatesList = ({ rates, setBaseCurrency }) => {
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
        {/* Agrega más opciones según sea necesario */}
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
