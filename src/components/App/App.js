import React, { Component } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import './App.css';
import { Route } from 'react-router-dom';
import auth from '../AuthHOC/AuthHOC';

import Main from '../Main/Main';

import { loginUser, logoutUser } from '../../helpers/identityActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      this.setState({ user: JSON.parse(localStorageUser) });
    } else {
      loginUser();
    }
    netlifyIdentity.on('login', user => this.setState({ user }, loginUser()));
    netlifyIdentity.on('logout', () =>
      this.setState({ user: null }, logoutUser())
    );
  }

  handleLogIn = () => {
    netlifyIdentity.open();
  };

  handleLogOut = () => {
    netlifyIdentity.logout();
  };

  render() {
    const { user } = this.state;

    return (
      <div>
        {user ? (
          <header>
            <button type="button" onClick={this.handleLogOut}>
              Logout
            </button>
          </header>
        ) : (
          <header>
            <button type="button" onClick={this.handleLogIn}>
              Welcome
            </button>
          </header>
        )}
        <section>
          <Route exact path="/" component={auth(Main)} />
        </section>
      </div>
    );
  }
}

export default App;
