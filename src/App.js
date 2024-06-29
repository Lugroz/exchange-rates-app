// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExchangeRatesList from './components/ExchangeRatesList';
import CurrencyConverter from './components/CurrencyConverter';
import HistoricalRatesChart from './components/HistoricalRatesChart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');

  return (
    <Router basename="/exchange-rates-app/">
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<ExchangeRatesList baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />}
          />
          <Route
            path="/converter"
            element={<CurrencyConverter />}
          />
          <Route
            path="/historical"
            element={
              <HistoricalRatesChart
                baseCurrency={baseCurrency}
                targetCurrency={targetCurrency}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
