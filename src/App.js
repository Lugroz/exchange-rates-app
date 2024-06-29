import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ExchangeRatesList from './components/ExchangeRatesList';
import CurrencyConverter from './components/CurrencyConverter';
import HistoricalRatesChart from './components/HistoricalRatesChart';
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
              <Link to="/">Rates</Link>
            </li>
            <li>
              <Link to="/converter">Converter</Link>
            </li>
            <li>
              <Link to="/historical">Historical</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/converter">
            <CurrencyConverter />
          </Route>
          <Route path="/historical">
            <HistoricalRatesChart fromCurrency={baseCurrency} toCurrency="EUR" />
          </Route>
          <Route path="/">
            <ExchangeRatesList rates={rates} setBaseCurrency={setBaseCurrency} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
