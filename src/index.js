import React from 'react';
import ReactDOM from 'react-dom/client';
// import { App } from 'components/App';
import './index.css';



import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './components/redux/auth/store';
import {App} from './components/App.jsx';
import { api, setToken } from './components/API/apiAuth';

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
