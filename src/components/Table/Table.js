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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.renderWeightRecords();
  }

  async handleSubmit(e) {
    e.preventDefault();

    const weightValue = this.weightInput.value;
    if (weightValue) {
      try {
        const request = await fetch('/.netlify/functions/addRecord', {
          method: 'POST',
          body: JSON.stringify({ weight: weightValue }),
        });
        const responseJson = await request.json();

        if (!responseJson.error) {
          this.setState(prevState => ({
            data: [responseJson, ...prevState.data],
          }));
          console.log(responseJson);
        } else {
          console.log(responseJson);
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

  async renderWeightRecords() {
    try {
      const response = await fetch('/.netlify/functions/records');
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
    console.log(data);
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
          {data.map(record => (
            <tr key={record._id}>
              <td>{record.date.substring(0, 10)}</td>
              <td>{record.weight}</td>
            </tr>
          ))}
        </table>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="weight"
            step="100"
            placeholder="Enter today's weight"
            ref={input => (this.weightInput = input)}
          />
          <button type="submit">Save</button>
        </form>
        {err && <h3>{err}</h3>}
      </>
    );
  }
}

Table.propTypes = {
  name: PropTypes.oneOf(['Monticek', 'Kulicek']).isRequired,
};
