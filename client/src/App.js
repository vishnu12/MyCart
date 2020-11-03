import React from 'react';
import { Container } from 'react-bootstrap';
import {Switch,Route} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import Homescreen from './screens/Homescreen';
import LoginScreen from './screens/LoginScreen';
import OrderListScreen from './screens/OrderListScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderSreen from './screens/PlaceOrderSreen';
import ProductDetails from './screens/ProductDetails';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';


function App() {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
    <Switch>
    <Route exact path='/' component={Homescreen}/>
    <Route path='/login' component={LoginScreen} />
    <Route path='/register' component={RegisterScreen} />
    <Route path='/profile' component={ProfileScreen} />
    <Route path='/cart/:id?' component={CartScreen} />
    <Route path='/product/:id' component={ProductDetails} />
    <Route path='/shipping' component={ShippingScreen} />
    <Route path='/placeorder' component={PlaceOrderSreen} />
    <Route path='/payment/:id?' component={PaymentScreen} />
    <Route exact path='/admin/users' component={UserListScreen} />
    <Route exact path='/admin/users/:id/edit' component={UserEditScreen} />
    <Route exact path='/admin/products' component={ProductListScreen} />
    <Route exact path='/admin/products/:id/edit' component={ProductEditScreen} />
    <Route exact path='/admin/orders' component={OrderListScreen} />
    </Switch>
    </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;
