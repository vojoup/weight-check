import React, { Component } from 'react';
import PropTypes from 'prop-types';

import handleError from '../../helpers/handleError';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      err: '',
    };
    this.renderWeightRecords = this.renderWeightRecords.bind(this);
  }

  componentDidMount() {
    this.renderWeightRecords();
  }

  renderWeightRecords() {
    fetch('/.netlify/functions/records')
      .then(response => response.json())
      .then(records => {
        if (!records.error) {
          this.setState({ data: records });
        } else {
          console.log(records);
          this.setState({ err: handleError(records.error) });
        }
      });
  }

  render() {
    const { name } = this.props;
    const { data, err } = this.state;
    if (err) {
      return <h2>{err}</h2>;
    }
    return (
      <table>
        <caption>
          <span role="img" aria-label="boar emoji">
            🐗
          </span>
          {name}
          <span role="img" aria-label="boar emoji">
            🐗
          </span>
        </caption>
        <thead>
          <tr>
            <th>Date (yyy-mm-dd)</th>
            <th>Weight (g)</th>
          </tr>
        </thead>
        {data.map(record => (
          <tr key={record._id}>
            <td>{record.date.substring(0, 10)}</td>
            <td>{record.weight}</td>
          </tr>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  name: PropTypes.oneOf(['Monticek', 'Kulicek']).isRequired,
};
