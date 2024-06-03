import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers'

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
  <BrowserRouter>
    <App />
  </BrowserRouter></Provider>,
  document.getElementById('root')
);

