import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRatesList = ({ baseCurrency, setBaseCurrency }) => {
  const [rates, setRates] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://api.frankfurter.app/latest?from=${baseCurrency}`
        );
        setRates(response.data.rates);
        setError(null);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setError('Failed to fetch exchange rates');
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return (
    <div>
      <h2>Exchange Rates</h2>
      <select
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {/* Agrega más monedas según sea necesario */}
      </select>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {Object.entries(rates).map(([currency, rate]) => (
            <li key={currency}>
              {currency}: {rate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExchangeRatesList;
