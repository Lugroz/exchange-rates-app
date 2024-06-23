import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ rates }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const convertCurrency = () => {
      if (fromCurrency === toCurrency) {
        // If both currencies are the same, the converted amount is the same as the input amount.
        setConvertedAmount(amount);
        return;
      }

      if (rates[fromCurrency] && rates[toCurrency]) {
        const conversionRate = rates[toCurrency] / rates[fromCurrency];
        setConvertedAmount(amount * conversionRate);
      } else {
        setConvertedAmount(null);
      }
    };

    convertCurrency();
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
          step="0.01"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span> to </span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button onClick={() => setAmount(0)}>Clear</button>
        {convertedAmount !== null && (
          <p>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
