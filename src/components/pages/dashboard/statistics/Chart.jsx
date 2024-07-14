import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectorSummary } from '../../../redux/transactions/selectors';
import { colors } from './StatisticsTable';

function Chart() {
  const summary = useSelector(selectorSummary);
  const labels = summary.categoriesSummary.map(category => category.name);
  const datas = summary.categoriesSummary.map(category => -category.total);
  const totalExpenses = summary.expenseSummary;

  const data = {
    labels,
    datasets: [
      {
        data: datas,
        backgroundColor: colors,
        borderColor: [
          'rgba(0, 191, 255, 1)',
          'rgba(128, 0, 128, 1)',
          'rgba(255, 165, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
    totalExpenses
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: RON ${tooltipItem.raw.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
          }
        },
        bodyFont: {
          // size: 30,
          family: "'Poppins', sans-serif"
        },
      }
    }
  };

  return (
    <div>
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}

export default Chart;
