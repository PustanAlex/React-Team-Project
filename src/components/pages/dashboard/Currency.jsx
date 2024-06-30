import styles from './home/home.module.css';
import { API_KEY2, baseURL2 } from '../../API/apiKey';
import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

function Currency() {
  const apiKey = API_KEY2;
  const URL = baseURL2;
  const [currencyDataEUR, setCurrencyDataEUR] = useState(null);
  const [currencyDataUSD, setCurrencyDataUSD] = useState(null);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchCurrencyEUR = async () => {
      try {
        const response = await fetch(
          `${URL}/latest/EUR?app_id=${apiKey}&symbols=USD,RON`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.rates) {
          throw new Error('Invalid data structure received');
        }
        setCurrencyDataEUR(data);
      } catch (error) {
        console.error('Fetching EUR currency data failed', error);
        setError('Failed to fetch EUR currency data');
      }
    };

    const fetchCurrencyUSD = async () => {
      try {
        const response = await fetch(
          `${URL}/latest/USD?app_id=${apiKey}&symbols=EUR,RON`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.rates) {
          throw new Error('Invalid data structure received');
        }
        setCurrencyDataUSD(data);
      } catch (error) {
        console.error('Fetching USD currency data failed', error);
        setError('Failed to fetch USD currency data');
      }
    };

    fetchCurrencyEUR();
    fetchCurrencyUSD();
  }, [apiKey, URL]);

  useEffect(() => {
    if (currencyDataEUR && currencyDataUSD) {
      renderChart();
    }
  });

  const renderChart = () => {
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const labels = ['EUR', 'USD'];
    const purchaseData = [
      currencyDataEUR.rates.RON.toFixed(2),
      currencyDataUSD.rates.RON.toFixed(2),
    ];
    const saleData = [
      (currencyDataEUR.rates.RON + currencyDataEUR.rates.RON * 0.02).toFixed(2),
      (currencyDataUSD.rates.RON + currencyDataUSD.rates.RON * 0.02).toFixed(2),
    ];

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Purchase',
          data: purchaseData,
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
        {
          label: 'Sale',
          data: saleData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      plugins: {
        datalabels: {
          display: true,
          color: '#000000',
          font: {
            weight: 'bold',
          },
          formatter: function (value, context) {
            return value.toFixed(2);
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      tooltips: {
        enabled: false,
      },
    };

    const ctx = document.getElementById('currencyChart');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  };

  const targetData = {
    EUR: {
      display_symbol: '€',
    },
    USD: {
      display_symbol: '$',
    },
  };

  return (
    <div className={styles.currencyContainer}>
      {error && <p>Error: {error}</p>}
      {currencyDataEUR && currencyDataUSD ? (
        <div>
          <div className={styles.currencyTable}>
            <div className={styles.currencyHeader}>
              <div>Currency</div>
              <div>Purchase</div>
              <div>Sale</div>
              <div>Rate</div>
            </div>
            <div className={styles.currencyBody}>
              <div className={styles.currencyRow}>
                <div>{targetData.EUR.display_symbol} EUR</div>
                <div>{currencyDataEUR.rates.RON.toFixed(2)}</div>
                <div>
                  {(
                    currencyDataEUR.rates.RON +
                    currencyDataEUR.rates.RON * 0.02
                  ).toFixed(2)}
                </div>
                <div>{currencyDataEUR.rates.RON.toFixed(2)}</div>
              </div>
              <div className={styles.currencyRow}>
                <div>{targetData.USD.display_symbol} USD</div>
                <div>{currencyDataUSD.rates.RON.toFixed(2)}</div>
                <div>
                  {(
                    currencyDataUSD.rates.RON +
                    currencyDataUSD.rates.RON * 0.02
                  ).toFixed(2)}
                </div>
                <div>{currencyDataUSD.rates.RON.toFixed(2)}</div>
              </div>
            </div>
          </div>
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
