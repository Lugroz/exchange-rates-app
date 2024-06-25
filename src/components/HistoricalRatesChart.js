import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const HistoricalRatesChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const formattedStartDate = startDate.toISOString().split('T')[0];

      try {
        const response = await axios.get(
          `http://localhost:8080/timeseries?start_date=${formattedStartDate}&end_date=${endDate}&base=USD&symbols=EUR`
        );
        const rates = response.data.rates;

        const dates = Object.keys(rates);
        const data = dates.map(date => rates[date]['EUR']);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'USD to EUR Exchange Rate',
              data: data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching historical rates:', error);
      }
    };

    fetchHistoricalRates();
  }, []);

  return (
    <div>
      <h2>Historical Exchange Rates (USD to EUR)</h2>
      <Line data={chartData} />
    </div>
  );
};

export default HistoricalRatesChart;
