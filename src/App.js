import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExchangeRatesList from './components/ExchangeRatesList';
import CurrencyConverter from './components/CurrencyConverter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/latest?from=${baseCurrency}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return (
    <Router basename="/exchange-rates-app/">
      <div>
        <Navbar />
        <main>
          {loading ? (
            <p>Loading rates...</p>
          ) : error ? (
            <p>Error loading rates: {error}</p>
          ) : (
            <Routes>
              <Route path="/" element={<ExchangeRatesList rates={rates} setBaseCurrency={setBaseCurrency} />} />
              <Route path="/converter" element={<CurrencyConverter rates={rates} />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
