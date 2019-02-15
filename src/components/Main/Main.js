import React from 'react';

import Table from '../Table/Table';
import Link from '../Link/Link';
import './Main.css';

// Todo: Connect componet to router and navigate to detail page programatically!
class Main extends React.Component {
  render() {
    return (
      <main>
        <Table name="Kulik" />
        <Link to="/detail/kulik">See more records for Kulik</Link>
        <Table name="Montik" />
        <Link to="/detail/montik">See more records for Montik</Link>
      </main>
    );
  }
}

export default Main;
