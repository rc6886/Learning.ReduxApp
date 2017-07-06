"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import reducers from './reducers/index';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

const middleWare = applyMiddleware(thunk, logger);
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleWare);

const Routes = (
    <Provider store={store}>
      {routes}
    </Provider>
);

render(Routes, document.getElementById('app'));

