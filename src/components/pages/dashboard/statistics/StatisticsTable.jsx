import css from './StatisticsTable.module.css';
import { useSelector } from 'react-redux';
import { selectorSummary } from '../../../redux/transactions/selectors';

export const colors = [
  '#fed057',
  '#ffd8d0',
  '#fd9498',
  '#c5baff',
  '#6e78e8',
  '#4a56e2',
  '#81e1ff',
  '#24cca7',
  '#00ad84',
];

function StatisticsTable() {
  const summary = useSelector(selectorSummary);
  // console.log('summary', summary);

  const { categoriesSummary, incomeSummary, expenseSummary } = summary;
  const hasTransactions = categoriesSummary.length > 0;

  return (
    <div className={css.statisticsTable}>
      {hasTransactions ? (
        <>
          <table className={css.table}>
            <thead>
              <tr className={`${css.container} ${css.containerCol}`}>
                <th className={css.col}>Category</th>
                <th className={css.col}>Sum</th>
              </tr>
            </thead>
            <tbody>
              {categoriesSummary.map((category, index) => (
                <tr key={index} className={`${css.container} ${css.containerRow}`}>
                  <td className={css.row}>
                    <div
                      className={css.colorBox}
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    {category.name}
                  </td>
                  <td className={css.row}>{category.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`${css.container} ${css.containerTypesExpenses} ${css.containerStyle}`}>
            <span>Income</span>
            <span className={css[incomeSummary >= 0 ? 'income' : 'expense']}>{incomeSummary}</span>
          </div>
          <div className={`${css.container} ${css.containerStyle}`}>
            <span>Expense</span>
            <span className={css[expenseSummary >= 0 ? 'income' : 'expense']}>{expenseSummary}</span>
          </div>
        </>
      ) : (
        <div className={css.noTransactions}>
          You don&apos;t have any transactions in this period.
        </div>
      )}
    </div>
  );
}

export default StatisticsTable;

