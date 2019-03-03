import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Chart from 'react-google-charts';

import './Chart.css';

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
    max = records[0].weight;
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

const formatRecords = records => {
  const result = [['Date', 'Weight', 'Average']];
  const total = records.reduce(
    (acc, currentValue) => acc + currentValue.weight,
    0
  );
  const average = total / records.length;
  records.map(({ date, weight }) =>
    result.push([new Date(date.substring(0, 10)), weight, average])
  );
  return result;
};

const RecordsChart = ({ records, name }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    if (records.length) {
      setMin(getMininum(records) - 50);
      setMax(getMaxinum(records) + 50);
    }
  }, [records]);

  const data = formatRecords(records);
  const color = name === 'Montik' ? '#416ea8' : '#2eb47b';

  return (
    <>
      {records && (
        <Chart
          width="100%"
          height="30vh"
          chartType="LineChart"
          options={{
            curveType: 'function',
            title: 'The last 10 weight records',
            subtitle: 'in grams (g)',
            hAxis: { title: 'Date' },
            vAxis: { title: 'Weight', minValue: min, maxValue: max },
            legend: 'right',
            animation: {
              duration: 600,
              easing: 'out',
              startup: true,
            },
            series: {
              1: { pointSize: 0, pointShape: 'circle' },
            },
            enableInteractivity: true,
            colors: [color, 'red'],
            pointShape: 'diamond',
            pointSize: 20,
            compare: true,
            selectionMode: 'multiple',
            crosshair: {
              trigger: 'selection',
              opacity: 0.5,
            },
          }}
          loader={<div>Loading Chart</div>}
          data={data}
        />
      )}
    </>
  );
};

export default RecordsChart;

RecordsChart.propTypes = {
  records: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
};
