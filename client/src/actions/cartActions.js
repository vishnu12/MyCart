import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_DETAILS
} from '../constants/cartConstants'


export const addItemsToCart=(prodId,qty)=>async(dispatch,getState)=>{

    const {data}=await axios.get(`/products/${prodId}`)
     dispatch({
         type:CART_ADD_ITEM,
         payload:{
             id:data._id,
             name:data.name,
             image:data.image,
             price:data.price,
             stock:data.stock,
             qty
         }
     })

     localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))
}


export const removeItemsFromCart=(id)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
 localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))
}


export const saveDetails=(details)=>(dispatch)=>{

    dispatch({type:SAVE_SHIPPING_DETAILS,payload:details})

    localStorage.setItem('details',JSON.stringify(details))
}