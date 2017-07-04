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
const store = createStore(reducers, middleWare);

import BooksList from './components/pages/BooksList';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Cart from './components/pages/Cart';
import BooksForm from './components/pages/BooksForm';
import Main from './Main';

const Routes = (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={BooksList} />
          <Route path="/admin" component={BooksForm} />
          <Route path="/cart" component={Cart} />
        </Route>
      </Router>
    </Provider>
);

render(Routes, document.getElementById('app'));

