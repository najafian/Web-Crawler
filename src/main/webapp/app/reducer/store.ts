import {applyMiddleware, compose, createStore} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import {loadingBarMiddleware} from 'react-redux-loading-bar';
import reducer, {IRootState} from './index';

const defaultMiddlewares = [
    loadingBarMiddleware(),
    promiseMiddleware,
    thunkMiddleware
];
const composedMiddlewares = middlewares =>
    compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
