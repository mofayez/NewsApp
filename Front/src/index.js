import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer, 
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
