import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExchangeRatesList from './components/ExchangeRatesList';
import CurrencyConverter from './components/CurrencyConverter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');

  return (
    <Router basename="/exchange-rates-app/">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExchangeRatesList rates={rates} setBaseCurrency={setBaseCurrency} />} />
          <Route path="/converter" element={<CurrencyConverter />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
