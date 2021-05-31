import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
const myStore = createStore(rootReducer , applyMiddleware(thunk))

import PruebaLucas from './pages/PruebaLucas';

ReactDOM.render(
  <Provider store={myStore}>
    <App />
    {/* <PruebaLucas /> */}
  </Provider>,

  document.getElementById('root')
);