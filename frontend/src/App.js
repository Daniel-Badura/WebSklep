import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import VerificationScreen from './screens/VerificationScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import Message from './components/Message';
import UsersListScreen from './screens/UsersListScreen';
import EditUserScreen from './screens/EditUserScreen';
import ProductListScreen from './screens/ProductListScreen';
import EditProductScreen from './screens/EditProductScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserAccountSettingsScreen from './screens/UserAccountSettingsScreen';


function App() {


  return (

    <Router>
      <Header />
      <Message variant='warning'><div className='warning-message'>Please note that this website is intended solely for presentation purposes and should be used judiciously for its intended purpose</div></Message>
      <main className='py-3'>

        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/profile/orders' element={<MyOrdersScreen />} />
            <Route path='/profile/verify' element={<VerificationScreen />} />
            <Route path='/profile/settings' element={<UserAccountSettingsScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/users/list' element={<UsersListScreen />} />
            <Route path='/admin/users/:id/edit' element={<EditUserScreen />} />
            <Route path='/admin/products/list' element={<ProductListScreen />} />
            <Route path='/admin/products/list/:pageNumber' element={<ProductListScreen />} />
            <Route path='/admin/products/:id/edit' element={<EditProductScreen />} />
            <Route path='/admin/orders/list' element={<OrderListScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} exact />

            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />


          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>


  );
};

export default App;;;;