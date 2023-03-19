import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers';

const initialState = {};
const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: middleware
});

export default store;
