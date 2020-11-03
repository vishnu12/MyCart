import axios from 'axios'

import {
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGOUT,
 USER_DETAILS_CLEAR,
 USER_DETAILS_FAIL,
 USER_DETAILS_REQUEST,
 USER_DETAILS_SUCCESS,
 USER_REGISTER_FAIL,
 USER_REGISTER_REQUEST,
 USER_REGISTER_SUCCESS,
 USER_UPDATE_FAIL,
 USER_UPDATE_REQUEST,
 USER_UPDATE_SUCCESS,
 USER_ALL_FAIL,
 USER_ALL_REQUEST,
 USER_ALL_SUCCESS,
 USER_BY_ID_FAIL,
 USER_BY_ID_REQUEST,
 USER_BY_ID_SUCCESS,
 USER_UPDATE_BY_ID_FAIL,
 USER_UPDATE_BY_ID_REQUEST,
 USER_UPDATE_BY_ID_SUCCESS,
 USER_DELETE_FAIL,
 USER_DELETE_REQUEST,
 USER_DELETE_SUCCESS
} from '../constants/userConstants'



export const login=(loginData)=>async(dispatch)=>{

    try {
        dispatch({type:USER_LOGIN_REQUEST})

      const {data}=await axios.post('/user/signin',loginData)

      dispatch({
          type:USER_LOGIN_SUCCESS,
          payload:data
      })


      localStorage.setItem('user',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}

export const register=(regData)=>async(dispatch)=>{

    try {
        dispatch({type:USER_REGISTER_REQUEST})

      await axios.post('/user/signup',regData)

      dispatch({
          type:USER_REGISTER_SUCCESS,
      })
   const {email,password}=regData
   const {data}=await axios.post('/user/signin',{email,password})

   dispatch({
       type:USER_LOGIN_SUCCESS,
       payload:data
   })

   localStorage.setItem('user',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}

export const logout=()=>(dispatch)=>{
    localStorage.removeItem('user')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_CLEAR})
}

export const getUserDetails=()=>async(dispatch,getState)=>{

    try {
       
      const {userLogin:{user}}=getState()

     dispatch({type:USER_DETAILS_REQUEST})

    const config={
        headers:{
            authorization:`Bearer ${user.token}`
        }
    }

     const {data}=await axios.get('/user/userDetails',config)
     dispatch({
         type:USER_DETAILS_SUCCESS,
         payload:data
     })

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }
}

export const editUserDetails=(editData)=>async(dispatch,getState)=>{
   
    try {
        const {userLogin:{user}}=getState()

        dispatch({type:USER_UPDATE_REQUEST})

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data}=await axios.put('/user/edit',editData,config)

        dispatch({
            type:USER_UPDATE_SUCCESS,
            payload:data
        })

      console.log(data)

    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }

}


export const getAllUsers=()=>async(dispatch,getState)=>{
   
    try {
        const {userLogin:{user}}=getState()

        dispatch({type:USER_ALL_REQUEST})

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data}=await axios.get('/user/all',config)

        dispatch({
            type:USER_ALL_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type:USER_ALL_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }

}


export const getUserDetailsById=(id)=>async(dispatch,getState)=>{
   
    try {
        const {userLogin:{user}}=getState()

        dispatch({type:USER_BY_ID_REQUEST})

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data}=await axios.get(`/user/${id}`,config)

        dispatch({
            type:USER_BY_ID_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:USER_BY_ID_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }

}


export const editUserDetailsById=(editData)=>async(dispatch,getState)=>{
   
    try {
        const {userLogin:{user}}=getState()

        dispatch({type:USER_UPDATE_BY_ID_REQUEST})

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data}=await axios.put(`/user/edit/${editData.id}`,editData,config)

        dispatch({
            type:USER_UPDATE_BY_ID_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type:USER_UPDATE_BY_ID_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }

}


export const deleteUser=(id)=>async(dispatch,getState)=>{
   
    try {
        const {userLogin:{user}}=getState()

        dispatch({type:USER_DELETE_REQUEST})

        const config={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data}=await axios.delete(`/user/${id}`,config)

        dispatch({
            type:USER_DELETE_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.message?
            error.response.data.message : error.message
        })
    }

}