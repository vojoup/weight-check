import React from 'react';
import Table from '../Table/Table';

const Detail = props => {
  console.log(props);
  return (
    <div>
      <Table name={props.match.params.name} limit={30} />
    </div>
  );
};

export default Detail;
