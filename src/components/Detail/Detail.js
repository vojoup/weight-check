import React, { useEffect } from 'react';

import Table from '../Table/Table';
import Link from '../Link/Link';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Detail = props => {
  const { name } = props.match.params;
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(name)} weight records`;
    return () => {
      document.title = 'Weight check';
    };
  });
  return (
    <main>
      <Link id="go-back" to="/">
        Go back
      </Link>
      <Table name={name} limit={30} />
    </main>
  );
};

export default Detail;
