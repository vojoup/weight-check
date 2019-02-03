import React from 'react';

import Table from '../Table/Table';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Table name="Kulicek" />
        {/* <Table name="Monticek" data={dataMontik} /> */}
      </main>
    );
  }
}

export default Main;
