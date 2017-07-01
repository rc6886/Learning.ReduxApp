"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';

import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks} from './actions/booksActions';

const middleWare = applyMiddleware(logger);
const store = createStore(reducers, middleWare);

import BooksList from './components/pages/BooksList';

render(
    <Provider store={store}>
        <BooksList />
    </Provider>, document.getElementById('app')
);

