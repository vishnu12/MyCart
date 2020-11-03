import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Table,Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { getAllUsers } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {deleteUser} from '../actions/userActions'

const UserListScreen = ({history}) => {

const dispatch=useDispatch()

const userLogin=useSelector(state=>state.userLogin)
const {user}=userLogin

const userList=useSelector(state=>state.userList)
const {loading,error,users}=userList

const userDelete=useSelector(state=>state.userDelete)
const {message,error:deleteError,success}=userDelete

useEffect(()=>{
  if(!user?.isAdmin){
    history.push('/login')
  }else{
    dispatch(getAllUsers())
  }
},[dispatch,message,success,history,user])


const deleteHandler=(id)=>{
    if(window.confirm('Are you sure')){
        dispatch(deleteUser(id))
    }
}

  return (
    <>
    <h1 className='mb-5 text-center'>USERS</h1>
     {
         loading?<Loading />
         :
     error?<Message>{error}</Message>
     :
     <>
     {
         message && <Message variant='success'>{message}</Message>
     }
     {
         deleteError && <Message>{deleteError}</Message>
     }
     <Table striped bordered responsive className='table-sm text-center'>
     <thead>
         <tr>
             <th>ID</th>
             <th>NAME</th>
             <th>EMAIL</th>
             <th>ADMIN</th>
             <th></th>
         </tr>
     </thead>
     <tbody>
         {
            users && users.map((user,k)=>{
              return <tr key={k}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.name}</a></td>
              <td>
                        {user.isAdmin?<i className='fas fa-check' style={{color:'green'}}></i>
                        :
                        <i className='fas fa-times' style={{color:'red'}}></i>
                        }
                    </td>
              <td>
              <LinkContainer to={`/admin/users/${user._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                          </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                          <i className='fas fa-trash'></i>
                      </Button>
              </td>
          </tr>
          })
         }
     </tbody>

 </Table>
 </>
     }
    
      
    </>
  )
}

export default UserListScreen

