import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Table extends Component {
  renderWeightRecords({ records }) {
    return records.map(record => (
      <tr>
        <td>{record.date.substring(0, 10)}</td>
        <td>{record.weight}</td>
      </tr>
    ));
  }

  render() {
    const { name, data } = this.props;
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
          <th>Date (yyy-mm-dd)</th>
          <th>Weight (g)</th>
        </thead>
        {this.renderWeightRecords(data)}
      </table>
    );
  }
}

Table.propTypes = {
  name: PropTypes.oneOf(['Monticek', 'Kulicek']).isRequired,
  data: PropTypes.object.isRequired,
};
