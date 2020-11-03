import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Form,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'

const RegisterScreen = ({history}) => {

  const dispatch=useDispatch()
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const {name,email,password,confirmPassword}=values

  const userRegister=useSelector(state=>state.userRegister)
  const {error,loading,success} =userRegister

  const handleChange=e=>{
    const {name,value}=e.target
    setValues({
      ...values,
      [name]:value
    })
  }


  const submit=e=>{
    e.preventDefault()
    if(password !==confirmPassword){
      window.alert('Passwords do not match')
    }else{
      const regData={name,email,password}
    dispatch(register(regData))
    }
    
  }


  useEffect(()=>{
    if(success){
      history.push('/')
    }
  },[success])

  return (
    <>
    {
      loading?<Loading />
      :
      <section className='col-md-6 m-auto text-center form-register'>
      {
        error && <Message>{error}</Message>
      }
    <Form onSubmit={submit}>
    <Form.Group controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" name='name' value={name} onChange={handleChange}/>
    </Form.Group>

    <Form.Group controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={handleChange}/>
    </Form.Group>
  
    <Form.Group controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={handleChange}/>
    </Form.Group>

    <Form.Group controlId="confPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="text" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
    </Form.Group>
  
    <Button variant="dark" type="submit">
      Register
    </Button>
    <Link className='mt-3' to='/login' style={{textDecoration:'none'}}><p style={{color:'black'}}>Already have an account?</p></Link>
  </Form>
  </section>
    }
    
  </>
  )
}

export default RegisterScreen
