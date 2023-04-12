import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userVerifyEmailReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';


const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userVerifyEmail: userVerifyEmailReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
});
// localStorage.removeItem('userInfo'); web;
// localStorage.removeItem('cartItems'); web;
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = (localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressFromStorage = (localStorage.getItem('shippingAddress'))
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};


const initialState = {

    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        itemsPrice: cartItemsFromStorage.reduce((acc, item) => acc + item.price * item.quantity, 0),
    },
    userLogin: { userInfo: userInfoFromStorage },

};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: middleware
});

export default store;
