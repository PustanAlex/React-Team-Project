import { useEffect, useMemo, useState } from 'react';
import css from './StatisticsDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { getTransactionsSummary } from '../../../redux/transactions/operations';
import { selectorSummary } from '../../../redux/transactions/selectors';


const months = (() => {
  const month = new Date(),
    formater = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    });
  return Array.from({ length: 12 }, (_, i) => {
    month.setMonth(i);
    return formater.format(month);
  });
})();
// console.log(months);

function StatisticsDashboard() {
  const dispatch = useDispatch();
  const summary = useSelector(selectorSummary);
  const [selectedMonth, setSelectedMonth] = useState(summary.month);
  const [selectedYear, setSelectedYear] = useState(summary.year);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getTransactionsSummary({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  const { handleMonthChange, handleYearChange, toggleMonthDropdown, toggleYearDropdown } = useMemo(() => ({
    handleMonthChange: (month) => {
      setSelectedMonth(month + 1);
      setIsMonthDropdownOpen(false);
    },
    handleYearChange: (year) => {
      setSelectedYear(year);
      setIsYearDropdownOpen(false);
    },
    toggleMonthDropdown: () => {
      setIsMonthDropdownOpen(v => !v);
      setIsYearDropdownOpen(false);
    },
    toggleYearDropdown: () => {
      setIsYearDropdownOpen(v => !v);
      setIsMonthDropdownOpen(false);
    }
  }), []);

  const yearOptions = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  return (
    // <div className={css.statisticsDashboard}>
    <div className={css.selectContainer}>
      <div className={css.selectWrapper}>
        <div className={css.label} onClick={toggleMonthDropdown}>
          {months[selectedMonth - 1]}
          <IoIosArrowDown className={`${css.dropdownIcon} ${isMonthDropdownOpen ? 'open' : ''}`} />
        </div>
        <div className={css.dropdown} hidden={!isMonthDropdownOpen}>
          {months.map((month, index) => (
            <div key={index} className={css.option} onClick={() => handleMonthChange(index)}>
              {month}
            </div>
          ))}
        </div>
      </div>
      <div className={css.selectWrapper}>
        <div className={css.label} onClick={toggleYearDropdown}>
          {selectedYear}
          <IoIosArrowDown className={`${css.dropdownIcon} ${isYearDropdownOpen ? 'open' : ''}`} />
        </div>
        <div className={css.dropdown} hidden={!isYearDropdownOpen}>
          {yearOptions.map((year, index) => (
            <div key={index} className={css.option} onClick={() => handleYearChange(year)}>
              {year}
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default StatisticsDashboard;
