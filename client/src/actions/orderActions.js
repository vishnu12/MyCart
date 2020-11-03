import axios from 'axios'
import {
 ORDER_CREATE_FAIL,
 ORDER_CREATE_REQUEST,
 ORDER_CREATE_SUCCESS,
 ORDER_DETAILS_FAIL,
 ORDER_DETAILS_REQUEST,
 ORDER_DETAILS_SUCCESS,
 ORDER_PAY_FAIL,
 ORDER_PAY_REQUEST,
 ORDER_PAY_SUCCESS,
 ORDER_DELIVER_FAIL,
 ORDER_DELIVER_REQUEST,
 ORDER_DELIVER_SUCCESS,
 ORDER_LIST_ALL_FAIL,
 ORDER_LIST_ALL_REQUEST,
 ORDER_LIST_ALL_SUCCESS,
 ORDER_LIST_USER_FAIL,
 ORDER_LIST_USER_REQUEST,
 ORDER_LIST_USER_SUCCESS,
 
} from '../constants/orderConstants'



export const createOrder=(orderdata)=>async(dispatch,getState)=>{
    try {
        dispatch({type:ORDER_CREATE_REQUEST})
       
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.post('/order/create',orderdata,config)
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}


export const getOrderDetails=(orderId)=>async(dispatch,getState)=>{
    try {
        dispatch({type:ORDER_DETAILS_REQUEST})
       
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.get(`/order/${orderId}`,config)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}


export const payOrder=(orderId,result)=>async(dispatch,getState)=>{
    try {
        dispatch({type:ORDER_PAY_REQUEST})
       
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
          await axios.put(`/order/${orderId}/pay`,result,config)
        dispatch({
            type:ORDER_PAY_SUCCESS,
        })
        
        localStorage.removeItem('cart')
        
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}

export const deliverOrder=(orderId)=>async(dispatch,getState)=>{
    try {
        dispatch({type:ORDER_DELIVER_REQUEST})
       
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
          await axios.put(`/order/${orderId}/deliver`,{},config)
        dispatch({
            type:ORDER_DELIVER_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type:ORDER_DELIVER_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}

export const listUserOrders=()=>async(dispatch,getState)=>{
    try {
        dispatch({type:ORDER_LIST_USER_REQUEST})
       
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}= await axios.get(`/order/find/user`,config)
        dispatch({
            type:ORDER_LIST_USER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ORDER_LIST_USER_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}

export const listAllOrders=()=>async(dispatch,getState)=>{
    try {
        dispatch({type:ORDER_LIST_ALL_REQUEST})
       
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }
        const {data}= await axios.get(`/order/find/all-orders`,config)
        dispatch({
            type:ORDER_LIST_ALL_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ORDER_LIST_ALL_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}



