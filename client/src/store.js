
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
    listProductsReducer,
    productDetailsReducer,
    productReviewReducer,
    productCreateReducer,
    productDeleteReducer,
    productUpdateReducer
    
 } 
 from './reducers/productReducers'

 import {
    userLoginReducer,
    userDetailsReducer,
    userRegisterReducer,
    userUpdateReducer,
    userListReducer,
    userDetailsByIdReducer,
    userUpdateByIdReducer,
    userDeleteReducer
    
 } from './reducers/userReducers'

import {
  cartReducer
} from './reducers/cartReducers'

import {
 orderCreateReducer,
 orderDetailsReducer,
 orderPayReducer,
 orderDeliverReducer,
 orderListAllReducer,
 orderListUserReducer,
} from './reducers/orderReducers'

const reducer=combineReducers({
   listProducts:listProductsReducer,
   productDetails:productDetailsReducer,
   productReview:productReviewReducer,
   productCreate:productCreateReducer,
   productDelete:productDeleteReducer,
   productUpdate:productUpdateReducer,
   userLogin:userLoginReducer,
   userDetails:userDetailsReducer,
   userRegister:userRegisterReducer,
   editUser:userUpdateReducer,
   updateUserById:userUpdateByIdReducer,
   userList:userListReducer,
   userDetailsById:userDetailsByIdReducer,
   userDelete:userDeleteReducer,
   cart:cartReducer,
   orderCreate:orderCreateReducer,
   orderDetails:orderDetailsReducer,
   orderPay:orderPayReducer,
   orderDeliver:orderDeliverReducer,
   orderListUser:orderListUserReducer,
   orderListAll:orderListAllReducer,
})


const userDataFromStorage=localStorage.getItem('user')?
JSON.parse(localStorage.getItem('user')) :null

const cartItemsFromStorage=localStorage.getItem('cart')?
JSON.parse(localStorage.getItem('cart')):[]

const initialState={
    userLogin:{user:userDataFromStorage},
    cart:{cartItems:cartItemsFromStorage}
}
const middleware=[thunk]

const store=createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))


export default store