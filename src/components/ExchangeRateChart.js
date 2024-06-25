import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const ExchangeRateChart = ({ fromCurrency, toCurrency }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const formatDate = (date) => date.toISOString().split('T')[0];

      try {
        const response = await fetch(`http://localhost:8080/${formatDate(startDate)}..${formatDate(endDate)}?from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        const rates = Object.entries(data.rates).sort((a, b) => new Date(a[0]) - new Date(b[0]));

        const labels = rates.map(rate => rate[0]);
        const values = rates.map(rate => rate[1][toCurrency]);

        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: `Exchange Rate ${fromCurrency} to ${toCurrency}`,
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
              fill: false
            }]
          },
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'day'
                }
              }]
            }
          }
        });
      } catch (error) {
        console.error('Error fetching historical rates:', error);
      }
    };

    fetchHistoricalRates();
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ExchangeRateChart;
