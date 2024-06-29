import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const HistoricalRatesChart = ({ baseCurrency = 'USD', targetCurrency = 'EUR' }) => {
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const formattedStartDate = startDate.toISOString().split('T')[0];

      try {
        const response = await axios.get(
          `https://api.frankfurter.app/${formattedStartDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`
        );
        const rates = response.data.rates;

        const dates = Object.keys(rates);
        const data = dates.map(date => rates[date][targetCurrency]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${baseCurrency} to ${targetCurrency} Exchange Rate`,
              data: data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching historical rates:', error);
        setError('Failed to fetch historical rates');
      }
    };

    fetchHistoricalRates();
  }, [baseCurrency, targetCurrency]);

  return (
    <div>
      <h2>Historical Exchange Rates ({baseCurrency} to {targetCurrency})</h2>
      {error ? <p>{error}</p> : <Line data={chartData} />}
    </div>
  );
};

export default HistoricalRatesChart;
