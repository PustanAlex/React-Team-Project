import Chart from './Chart';
import StatisticsDashboard from './StatisticsDashboard';
import StatisticsTable from './StatisticsTable';

function Statistics() {
  return (
    <div className="container">
      <h1>Statistics Component</h1>
      <div className="content">
        <Chart />
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
}

export default Statistics;
