import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const convertCurrency = async () => {
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      setConvertedAmount(response.data.rates[toCurrency]);
      setError(null);
    } catch (error) {
      console.error('Error converting currency:', error);
      setError('Failed to convert currency');
      setConvertedAmount(null);
    }
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {/* Agrega más monedas según sea necesario */}
      </select>
      <span> to </span>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        {/* Agrega más monedas según sea necesario */}
      </select>
      <button onClick={convertCurrency}>Convert</button>
      {error ? <p>{error}</p> : <p>Converted Amount: {convertedAmount}</p>}
    </div>
  );
};

export default CurrencyConverter;
