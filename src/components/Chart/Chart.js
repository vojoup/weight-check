import React from 'react';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

import './Chart.css';

ReactChartkick.addAdapter(Chart);

const RecordsChart = ({ records }) => {
  const result = records.reduce(function(obj, item) {
    obj[item.date] = item.weight;
    return obj;
  }, {});
  console.log(result);
  return (
    <LineChart
      min={500}
      max={1500}
      xtitle="Date"
      ytitle="Weight"
      curve
      id="kulik"
      colors={['#416ea8']}
      label="Weight"
      data={{ ...result }}
    />
  );
};

export default RecordsChart;

RecordsChart.propTypes = {
  records: Array,
};
