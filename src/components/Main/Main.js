import React from 'react';

import Table from '../Table/Table';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Table name="Kulik" />
        <Table name="Montik" />
      </main>
    );
  }
}

export default Main;
