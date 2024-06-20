import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExchangeRatesList = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      const response = await axios.get(`https://api.exchangerate.host/latest?base=${baseCurrency}`);
      setRates(response.data.rates);
      setLoading(false);
    };
    fetchRates();
  }, [baseCurrency]);

  const handleBaseChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  return (
    <div>
      <h2>Exchange Rates</h2>
      <select onChange={handleBaseChange} value={baseCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        {/* Añadir más opciones según necesites */}
      </select>
      {loading ? <p>Loading...</p> : (
        <ul>
          {Object.keys(rates).map(currency => (
            <li key={currency}>{currency}: {rates[currency]}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExchangeRatesList;
