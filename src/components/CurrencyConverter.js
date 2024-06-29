import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoricalRatesChart from './HistoricalRatesChart';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchConversion = async () => {
      try {
        const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        setConvertedAmount(response.data.rates[toCurrency]);
      } catch (error) {
        console.error('Error fetching conversion data:', error);
      }
    };

    fetchConversion();
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div>
        <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
      </div>
      <HistoricalRatesChart fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </div>
  );
};

export default CurrencyConverter;
