import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoricalRatesChart from './HistoricalRatesChart';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const convert = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/latest?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
        setConvertedAmount(response.data.result);
      } catch (error) {
        console.error('Error converting currency', error);
      }
    };

    convert();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <span> to </span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <p>Converted Amount: {convertedAmount}</p>
      </div>
      <HistoricalRatesChart fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </div>
  );
};

export default CurrencyConverter;
