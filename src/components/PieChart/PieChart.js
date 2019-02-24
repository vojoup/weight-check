import React, { useEffect, useState } from 'react';

import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const PieChartCompare = () => {
  const [initialized, setInitialized] = useState(false);
  const [kulikWeight, setKulikWeight] = useState(null);
  const [montikWeight, setMontikWeight] = useState(null);

  const getLastWeight = async (name, limit) => {
    try {
      const response = await fetch(
        `/.netlify/functions/records?name=${name.toLowerCase()}&limit=${+limit}`
      );
      const lastRecord = await response.json();

      if (!lastRecord.error) {
        switch (name) {
          case 'kulik':
            setKulikWeight(lastRecord[0].weight);
            break;
          case 'montik':
            setMontikWeight(lastRecord[0].weight);
            break;
          default:
            break;
        }
      }
      return lastRecord.error;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!initialized) {
      getLastWeight('kulik', 1);
      getLastWeight('montik', 1);
      setInitialized(true);
    }
  }, [getLastWeight, initialized]);

  return (
    <div>
      <h2>Comparison of weights</h2>
      <PieChart
        colors={['#2eb47b', '#416ea8']}
        data={{ Kulik: kulikWeight, Montik: montikWeight }}
        suffix="g"
      />
    </div>
  );
};

export default PieChartCompare;
