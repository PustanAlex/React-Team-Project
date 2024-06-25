import styles from './home/home.module.css'; 
import { API_KEY, baseURL } from '../../API/apiKey'; 
import { useEffect, useState, useRef } from 'react'; 
import Chart from 'chart.js/auto';

function Currency() {
  const apiKey = API_KEY;
  const URL = baseURL;
  const [currencyData, setCurrencyData] = useState(null);
  const [error, setError] = useState(null);
  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch(
          `${URL}/latest.json?app_id=${apiKey}&base=USD&symbols=EUR,USD`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.rates) {
          throw new Error('Invalid data structure received');
        }
        setCurrencyData(data);
      } catch (error) {
        console.error('Fetching currency data failed', error);
        setError(error.message);
      }
    };

    fetchCurrency();
  }, [URL, apiKey]);

  useEffect(() => {
    if (currencyData) {
      renderChart();
    }
  }, [currencyData]);

  const renderChart = () => {
  
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

   
    const chartData = {
      labels: ['EUR', 'USD'], 
      datasets: [
        {
          label: 'Purchase',
          data: [
            currencyData?.rates?.EUR?.bid || 0,
            currencyData?.rates?.USD?.bid || 0,
          ],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
        {
          label: 'Sale',
          data: [
            currencyData?.rates?.EUR?.ask || 0,
            currencyData?.rates?.USD?.ask || 0,
          ],
          fill: false,
          borderColor: 'rgba(192,75,192,1)',
          tension: 0.1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = document.getElementById('currencyChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  };

  return (
    <div className={styles.currencyContainer}>
      {error && <p>Error: {error}</p>}
      {currencyData ? (
        <div>
          <table className={styles.currencyTable}>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Purchase</th>
                <th>Sale</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(currencyData.rates).map(([currency, rate]) => (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{rate.bid}</td>
                  <td>{rate.ask}</td>
                  <td>{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Chart */}
      <div className={styles.chartContainer}>
      <canvas id="currencyChart" />
      </div>
    </div>
  );
}

export default Currency;
