import React, { Component } from 'react';
import { Spring, Trail } from 'react-spring/renderprops';
import PropTypes from 'prop-types';

import RecordsChart from '../Chart/Chart';
import handleError from '../../helpers/handleError';
import Button from '../Button/Button';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      err: '',
      loading: false,
    };
    this.renderWeightRecords = this.renderWeightRecords.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { name, limit } = this.props;
    this.renderWeightRecords(name.toLowerCase(), limit);
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

  async renderWeightRecords(name = 'kulik', limit = 10) {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `/.netlify/functions/records?name=${name.toLowerCase()}&limit=${+limit}`
      );
      const recordsJson = await response.json();

      if (!recordsJson.error) {
        this.setState({ data: recordsJson, loading: false });
      } else {
        console.log(recordsJson);
        this.setState({ err: handleError(recordsJson.error), loading: false });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { name } = this.props;
    const { data, err, loading } = this.state;
    return (
      <>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
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
              <Trail
                items={data}
                keys={record => record._id}
                from={{
                  opacity: 0,
                  transform: 'translate3d(-100px,-40px,0)',
                }}
                to={{
                  opacity: 1,
                  transform: 'translate3d(0,0px,0)',
                }}
                config={{
                  mass: 2,
                  tension: 300,
                  friction: 30,
                  precision: 0.00001,
                }}
              >
                {record => styles => (
                  <tr style={styles} key={record._id}>
                    <td>{record.date.substring(0, 10)}</td>
                    <td>{record.weight}</td>
                  </tr>
                )}
              </Trail>
            </tbody>
          </table>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="weight"
            placeholder="Enter today's weight"
            ref={input => (this.weightInput = input)}
          />
          <Button type="submit" title="Save" />
        </form>
        {err && <h3>{err}</h3>}
        <RecordsChart name={name} records={data} />
      </>
    );
  }
}

Table.propTypes = {
  name: PropTypes.oneOf(['Montik', 'Kulik']).isRequired,
};
