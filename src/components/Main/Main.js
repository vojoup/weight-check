import React from 'react';

import Table from '../Table/Table';
import Link from '../Link/Link';
import './Main.css';
import PieChartCompare from '../PieChart/PieChart';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Table name="Kulik" />
        <Link to="/detail/kulik">See more records for Kulik</Link>
        <Table name="Montik" />
        <Link to="/detail/montik">See more records for Montik</Link>
        <PieChartCompare />
      </main>
    );
  }
}

export default Main;
