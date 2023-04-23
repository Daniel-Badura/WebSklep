import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userVerifyEmailReducer, usersListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderMyOrdersReducer, orderPayReducer } from './reducers/orderReducers';


const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userVerifyEmail: userVerifyEmailReducer,
    usersList: usersListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyOrders: orderMyOrdersReducer,

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
