import React from 'react';

import Table from '../Table/Table';
import './Main.css';

const data = {
  records: [
    { date: new Date().toISOString(), weight: 1000 },
    { date: new Date().toISOString(), weight: 1000 },
    { date: new Date().toISOString(), weight: 1000 },
    { date: new Date().toISOString(), weight: 1000 },
    { date: new Date().toISOString(), weight: 1000 },
  ],
};

const Main = () => (
  <main>
    <Table name="Kulicek" data={data} />
    <Table name="Monticek" data={data} />
  </main>
);

export default Main;
