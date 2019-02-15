import React from 'react';

import Table from '../Table/Table';
import './Main.css';

// Todo: Connect componet to router and navigate to detail page programatically!
class Main extends React.Component {
  render() {
    return (
      <main>
        <Table name="Kulik" />
        <a href="/detail/kulik">See more records for Kulik</a>
        <Table name="Montik" />
        <a href="/detail/montik">See more records for Montik</a>
      </main>
    );
  }
}

export default Main;
