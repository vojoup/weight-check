import React from 'react';

import Table from '../Table/Table';
import Link from '../Link/Link';

const Detail = props => {
  console.log(props);
  return (
    <main>
      <Link id="go-back" to="/">
        Go back
      </Link>
      <Table name={props.match.params.name} limit={30} />
    </main>
  );
};

export default Detail;
