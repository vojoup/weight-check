import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import netlifyIdentity from 'netlify-identity-widget';
import { BrowserRouter } from 'react-router-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// const middleware = [];

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middleware));
// const store = createStore(null, enhancer);

netlifyIdentity.init();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
