import Chart from './Chart';
import StatisticsDashboard from './StatisticsDashboard';
import StatisticsTable from './StatisticsTable';
import css from './StatisticsTab.module.css';

function StatisticsTab() {
  return (
    <div className={css.statisticsTab}>
      <h3 className={css.title}>Statistics</h3>
      <div className={css.statistics}>
        <Chart />
        <div className={css.data}>
          <StatisticsDashboard className={css.statisticsDashboard} />
          <StatisticsTable />
        </div>
      </div>
    </div>
  );
}

export default StatisticsTab;
