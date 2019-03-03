import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';

import Chart from 'react-google-charts';

// import ReactChartkick, { PieChart } from 'react-chartkick';
// import Chart from 'chart.js';

// ReactChartkick.addAdapter(Chart);

const PieChartCompare = () => {
  const [initialized, setInitialized] = useState(false);
  const [kulikWeight, setKulikWeight] = useState(0);
  const [montikWeight, setMontikWeight] = useState(0);

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
      <h3>Total weight: {montikWeight + kulikWeight}g</h3>
      <animated.div>
        <Chart
          // colors={['#2eb47b', '#416ea8']}
          // data={{
          //   Kulik: kulikWeight,
          //   Montik: montikWeight,
          // }}
          // suffix="g"
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Name', 'Weight'],
            ['Montik', montikWeight],
            ['Kulik', kulikWeight],
          ]}
          width="500px"
          height="300px"
          options={{
            legend: 'right',
            title: 'Comparison of last weight records',
          }}
        />
      </animated.div>
    </div>
  );
};

export default PieChartCompare;
