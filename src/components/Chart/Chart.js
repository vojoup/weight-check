import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

import './Chart.css';

ReactChartkick.addAdapter(Chart);

const getMininum = records => {
  let min;
  if (typeof records === typeof []) {
    min = records[0].weight;
    records.forEach(record => {
      if (record.weight < min) {
        min = record.weight;
      }
    });
  } else {
    return records.weight;
  }
  return min;
};

const getMaxinum = records => {
  let max;
  if (typeof records === typeof []) {
    records.forEach(record => {
      if (record.weight > max) {
        max = record.weight;
      }
    });
  } else {
    return records.weight;
  }
  return max;
};

const computeAverageWeight = records => {
  const total = records.reduce(
    (acc, currentValue) => acc + currentValue.weight,
    0
  );
  return total / records.length;
};

const RecordsChart = ({ records, name }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [averageDateRange, setAverageDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (records.length) {
      setMin(getMininum(records) - 50);
      setMax(getMaxinum(records) + 50);
      setAverageDateRange({
        startDate: records[records.length - 1].date,
        endDate: records[0].date,
      });
    }
  }, [records]);

  const result = records.reduce(function(obj, item) {
    obj[item.date] = item.weight;
    return obj;
  }, {});
  const color = name === 'Montik' ? '#416ea8' : '#2eb47b';
  const average = computeAverageWeight(records);
  const chartData = [
    { name, data: { ...result } },
    {
      name: 'Average',
      data: {
        [averageDateRange.endDate]: average,
        [averageDateRange.startDate]: average,
      },
    },
  ];

  return (
    <>
      {records.length && <h3>Avereage weight: {average}</h3>}
      <LineChart
        min={min}
        max={max}
        xtitle="Date"
        ytitle="Weight"
        curve
        id={name.toLowerCase()}
        legend
        colors={[color, 'red']}
        label="Weight"
        messages={{ empty: 'No data to be displayed' }}
        thousands=","
        suffix="g"
        data={chartData}
      />
    </>
  );
};

export default RecordsChart;

RecordsChart.propTypes = {
  records: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
};
