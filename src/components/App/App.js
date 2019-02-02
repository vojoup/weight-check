import React, { Component } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import './App.css';
import { Route } from 'react-router-dom';
import auth from '../../helpers/auth';

import Main from '../Main/Main';
import Button from '../Button/Button';

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
            <Button type="button" onClick={this.handleLogOut} title="Logout" />
          </header>
        ) : null}
        <section>
          <Route exact path="/" component={auth(Main)} />
        </section>
      </div>
    );
  }
}

export default App;
