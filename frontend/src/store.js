import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';


const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];


const initialState = {

    cart: { cartItems: cartItemsFromStorage }
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: middleware
});

export default store;
