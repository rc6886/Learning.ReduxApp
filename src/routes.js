"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import BooksList from './components/pages/BooksList';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Cart from './components/pages/Cart';
import BooksForm from './components/pages/BooksForm';
import Main from './Main';

const routes = (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={BooksList} />
          <Route path="/admin" component={BooksForm} />
          <Route path="/cart" component={Cart} />
        </Route>
      </Router>
);

export default routes;

