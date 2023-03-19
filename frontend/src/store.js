import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';

const reducers = {};
const initialState = {};
const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
});

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: middleware
});

export default store;
