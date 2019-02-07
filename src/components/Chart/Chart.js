import React from 'react';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

import './Chart.css';

ReactChartkick.addAdapter(Chart);

const RecordsChart = ({ records, name }) => {
  const result = records.reduce(function(obj, item) {
    obj[item.date] = item.weight;
    return obj;
  }, {});
  const color = name === 'Montik' ? '#416ea8' : '#2eb47b';
  return (
    <LineChart
      min={500}
      max={1500}
      xtitle="Date"
      ytitle="Weight"
      curve
      id={name.toLowerCase()}
      legend
      colors={[color]}
      label="Weight"
      messages={{ empty: 'No data to be displayed' }}
      thousands=","
      suffix="g"
      data={{ ...result }}
    />
  );
};

export default RecordsChart;

RecordsChart.propTypes = {
  records: Array,
  name: String,
};
