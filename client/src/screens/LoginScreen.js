import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Form,Button,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'

const LoginScreen = ({history,location}) => {


const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const redirect=location.search?location.search.split('=')[1]:'/'

const dispatch=useDispatch()

const submit=e=>{
  e.preventDefault()
  const data={email,password}
  dispatch(login(data))
}

const userLogin=useSelector(state=>state.userLogin)
const {user,loading,error}=userLogin

useEffect(()=>{
 if(user){
   history.push(redirect)
 }
},[history,dispatch,user,error,redirect])

  return (
    <>

      {
        loading?<Loading />
        :error?<Message>{error}</Message>
        :
        <>
        <Card className='col-md-6 m-auto text-center form'>
    <Form onSubmit={submit}>
    <Form.Group controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name='email' value={email} placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/>
    </Form.Group>
  
    <Form.Group controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
    </Form.Group>
  
    <Button variant="dark" type="submit">
      Login
    </Button>
    <Link className='mt-3' to='/register' style={{textDecoration:'none'}}><p style={{color:'black'}}>Don't have an account?</p></Link>
  </Form>
  </Card>
        </>
      }
    
    
    </>
  )
}

export default LoginScreen
