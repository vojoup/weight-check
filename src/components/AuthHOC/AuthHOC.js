import React from 'react';
import Login from '../Login/Login';

export default function requireAuthentication(Component) {
  const user = localStorage.getItem('currentOpenSaucedUser');
  return user ? Component : Login;
}
