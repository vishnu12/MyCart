import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col,Row, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getUserDetailsById,editUserDetailsById } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'


const UserEditScreen = ({match}) => {

    const dispatch=useDispatch()
    const userId=match.params.id


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetailsById=useSelector(state=>state.userDetailsById)
    const {user}=userDetailsById

    const updateUserById=useSelector(state=>state.updateUserById)
    const {success,loading,message}=updateUserById
    
  
    useEffect(()=>{
           if(!user || user._id !==userId ||success){
               dispatch(getUserDetailsById(userId))
           }else{
               setName(user.name)
               setEmail(user.email)
               setIsAdmin(user.isAdmin)
           }
       },[dispatch,match,user,success,message])
   

       const submit=e=>{
           e.preventDefault()
         const editData={
             id:userId,
             name,
             email,
             isAdmin
         }
        
         dispatch(editUserDetailsById(editData))
       }

  return (
    <>
     {
         loading?<Loading />
         :
         <>
         {
             message && <Message variant='success'>{message}</Message>
         }
         <Link className='btn btn-light my-3' to='/admin/users'>Go Back</Link> 
     <section className='justfy-content-md-center' style={{marginLeft:'15rem'}}>
         <Container>
             <Row>
            <Col sm={12} md={6}>
                <Form onSubmit={submit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='name' value={name} onChange={e=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox' 
                        checked={isAdmin} onChange={e=>setIsAdmin(e.target.checked)}/>
                    </Form.Group>
                   <Button type='submit' variant='outline-dark'>Edit</Button>
                </Form>
            </Col>
             </Row>
         </Container>
     </section>
         </>
     }
    </>
  )
}

export default UserEditScreen
