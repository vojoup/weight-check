import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import Button from '../Button/Button';
import './Login.css';

const login = () => netlifyIdentity.open();
const Login = () => (
  <div id="login-center">
    <h1>Login to access the app</h1>
    <Button type="button" onClick={login} title="Login" />
  </div>
);

export default Login;
