import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ExchangeRatesList from './components/ExchangeRatesList';
import CurrencyConverter from './components/CurrencyConverter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExchangeRatesList />} />
          <Route path="/converter" element={<CurrencyConverter />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
