function StatisticsDashboard() {
  return (
    <div className="statisticsDashboard">
      <h1>Statistics Dashboard</h1>
      {/* Statistics Dashboard content goes here */}
    </div>
  );
}

export default StatisticsDashboard;

const month = new Date(),
  formater = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }),
  months = Array.from({ length: 12 }, (_, i) => {
    month.setMonth(i);
    return { label: formater.format(month), value: i + 1 };
  });
console.log(months);
