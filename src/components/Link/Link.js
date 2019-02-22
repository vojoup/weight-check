import React from 'react';
import { withRouter } from 'react-router-dom';

import './Link.css';

const Link = ({ children, to, history, ...props }) => (
  <button {...props} type="button" onClick={() => history.push(to)}>
    {children}
  </button>
);
export default withRouter(Link);
