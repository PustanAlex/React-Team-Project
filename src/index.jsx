// import React from 'react';
// import { App } from 'components/App';
import './index.css';



import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './components/redux/store.js';
import { App } from './components/App.jsx';
import { setToken } from './components/API/apiAuth.js';

const token = localStorage.getItem('token');
if (token) {
  setToken(token);
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
