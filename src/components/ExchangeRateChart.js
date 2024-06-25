import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const ExchangeRateChart = ({ fromCurrency, toCurrency }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/timeseries?base=${fromCurrency}&symbols=${toCurrency}`);
        const rates = response.data.rates;

        const dates = Object.keys(rates);
        const rateValues = dates.map(date => rates[date][toCurrency]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Exchange Rate: ${fromCurrency} to ${toCurrency}`,
              data: rateValues,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            }
          ],
        });
      } catch (error) {
        console.error('Error fetching historical rates', error);
      }
    };

    fetchHistoricalRates();
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      <h3>Historical Exchange Rate Chart</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ExchangeRateChart;
