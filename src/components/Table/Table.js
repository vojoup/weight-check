import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RecordsChart from '../Chart/Chart';
import handleError from '../../helpers/handleError';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      err: '',
    };
    this.renderWeightRecords = this.renderWeightRecords.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;
    this.renderWeightRecords(name.toLowerCase());
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name } = this.props;

    const weightValue = this.weightInput.value;
    if (weightValue) {
      try {
        const request = await fetch('/.netlify/functions/addRecord', {
          method: 'POST',
          body: JSON.stringify({ weight: weightValue, name }),
        });
        const responseJson = await request.json();

        if (!responseJson.error) {
          this.setState(prevState => ({
            data: [responseJson, ...prevState.data],
          }));
        } else {
          this.setState({ err: handleError(responseJson.error) });
        }
      } catch (err) {
        console.error(err);
      }

      this.weightInput.value = '';
    } else {
      this.setState({ err: 'Enter a weight' });
    }
  }

  async renderWeightRecords(name = 'kulik') {
    try {
      const response = await fetch(
        `/.netlify/functions/records?name=${name.toLowerCase()}`
      );
      const recordsJson = await response.json();

      if (!recordsJson.error) {
        this.setState({ data: recordsJson });
      } else {
        console.log(recordsJson);
        this.setState({ err: handleError(recordsJson.error) });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { name } = this.props;
    const { data, err } = this.state;
    return (
      <>
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
          <tbody>
            {data.map(record => (
              <tr key={record._id}>
                <td>{record.date.substring(0, 10)}</td>
                <td>{record.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="weight"
            placeholder="Enter today's weight"
            ref={input => (this.weightInput = input)}
          />
          <button type="submit">Save</button>
        </form>
        {err && <h3>{err}</h3>}
        {data.length >= 1 ? (
          <RecordsChart name={name} records={data} />
        ) : (
            <h3>No data to show</h3>
          )}
      </>
    );
  }
}

Table.propTypes = {
  name: PropTypes.oneOf(['Montik', 'Kulik']).isRequired,
};
