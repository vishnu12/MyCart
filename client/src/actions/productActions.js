import axios from 'axios'
import {

  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
//   PRODUCT_REVIEW_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS
}from '../constants/productConstants'



export const listAllProducts=()=>async(dispatch)=>{

    try {
        dispatch({
            type:PRODUCT_LIST_REQUEST
        }) 
      const {data}=await axios.get('/products')
       
      dispatch({
          type:PRODUCT_LIST_SUCCESS,
          payload:data
      })


    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}


export const getProductDetails=(prodId)=>async(dispatch)=>{

    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        }) 
      const {data}=await axios.get(`/products/${prodId}`)
       
      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload:data
      })


    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}


export const createReview=({id,rating,comment})=>async(dispatch,getState)=>{

     try {
         dispatch({type:PRODUCT_REVIEW_REQUEST})
         const {userLogin:{user}}=getState()

         const config={
             headers:{
                 authorization:`Bearer ${user.token}`
             }
         }

         await axios.post(`/products/${id}/review`,{rating,comment},config)
         dispatch({type:PRODUCT_REVIEW_SUCCESS})

     } catch (error) {
        dispatch({
            type:PRODUCT_REVIEW_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
     }
}


export const createProduct=()=>async(dispatch,getState)=>{

    try {
        dispatch({type:PRODUCT_CREATE_REQUEST})
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data} = await axios.post(`/products/create`,{},config)
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
        })

    } catch (error) {
       dispatch({
           type:PRODUCT_CREATE_FAIL,
           payload:error.response && error.response.data.message?
           error.response.data.message : error.message
       })
    }
}

export const deleteProduct=(id)=>async(dispatch,getState)=>{

    try {
        dispatch({type:PRODUCT_DELETE_REQUEST})
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        await axios.delete(`/products/${id}`,config)
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
       dispatch({
           type:PRODUCT_DELETE_FAIL,
           payload:error.response && error.response.data.message?
           error.response.data.message : error.message
       })
    }
}


export const updateProduct=(data)=>async(dispatch,getState)=>{

    try {
        dispatch({type:PRODUCT_UPDATE_REQUEST})
        const {userLogin:{user}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        await axios.put(`/products/${data.id}`,data,config)
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
        })

    } catch (error) {
       dispatch({
           type:PRODUCT_UPDATE_FAIL,
           payload:error.response && error.response.data.message?
           error.response.data.message : error.message
       })
    }
}