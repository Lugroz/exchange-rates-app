import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null); // Usa `null` en lugar de 0 para manejar mejor el estado inicial

  useEffect(() => {
    const convert = async () => {
      try {
        // Asegúrate de que `amount` esté convertido a número
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
          setConvertedAmount('Invalid amount');
          return;
        }
        
        const response = await axios.get(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${numericAmount}`);
        setConvertedAmount(response.data.result);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConvertedAmount('Error fetching conversion rate');
      }
    };

    if (amount && fromCurrency && toCurrency) {
      convert();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
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
          <option value="GBP">GBP</option>
        </select>
        <span> to </span>
        <select 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <p>Converted Amount: {convertedAmount !== null ? convertedAmount : '...'}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
