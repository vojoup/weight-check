import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const login = () => netlifyIdentity.open();
const Login = () => (
  <div>
    <p>The open-source project to manage your open-source projects</p>
    <button type="button" onClick={login}>
      Login to Open Sauced
    </button>
  </div>
);

export default Login;
