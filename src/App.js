import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import ExchangeRatesList from './components/ExchangeRatesList';
import CurrencyConverter from './components/CurrencyConverter';
import Footer from './components/Footer';
import axios from 'axios';

const App = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`https://api.frankfurter.app/latest?from=${baseCurrency}`);
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/rates">Rates</Link>
            </li>
            <li>
              <Link to="/converter">Converter</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/rates" />} />
          <Route path="/rates" element={<ExchangeRatesList rates={rates} setBaseCurrency={setBaseCurrency} />} />
          <Route path="/converter" element={<CurrencyConverter />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
