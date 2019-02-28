import React from 'react';
import { animated, useSpring } from 'react-spring';

import Table from '../Table/Table';
import Link from '../Link/Link';
import './Main.css';
import PieChartCompare from '../PieChart/PieChart';

const Main = () => {
  const styles = useSpring({ from: { height: 0 }, to: { height: 'auto' } });
  return (
    <animated.main style={styles}>
      <Table name="Kulik" />
      <Link to="/detail/kulik">See more records for Kulik</Link>
      <Table name="Montik" />
      <Link to="/detail/montik">See more records for Montik</Link>
      <PieChartCompare />
    </animated.main>
  );
};

export default Main;
