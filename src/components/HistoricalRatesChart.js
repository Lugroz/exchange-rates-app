import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const HistoricalRatesChart = ({ fromCurrency, toCurrency }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.frankfurter.app/${getStartDate()}..${getEndDate()}?from=${fromCurrency}&to=${toCurrency}`);
        const data = response.data.rates;
        const labels = Object.keys(data);
        const rates = labels.map((date) => data[date][toCurrency]);

        setChartData({
          labels,
          datasets: [
            {
              label: `${fromCurrency} to ${toCurrency}`,
              data: rates,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchData();
  }, [fromCurrency, toCurrency]);

  const getStartDate = () => {
    const today = new Date();
    const priorDate = new Date().setDate(today.getDate() - 30);
    return new Date(priorDate).toISOString().split('T')[0];
  };

  const getEndDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div>
      <h2>Historical Rates</h2>
      <Line data={chartData} />
    </div>
  );
};

export default HistoricalRatesChart;
