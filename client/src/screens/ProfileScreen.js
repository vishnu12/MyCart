import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col, Row ,Form,Button, Table} from 'react-bootstrap'
import { getUserDetails } from '../actions/userActions'
import {editUserDetails} from '../actions/userActions'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { listUserOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'


const ProfileScreen = ({history}) => {

    const dispatch=useDispatch()

    const userLogin=useSelector(state=>state.userLogin)
    const {user}=userLogin
    
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,userData}=userDetails

    const editUser=useSelector(state=>state.editUser)
    const {loading:editLoading,error:editError,message}=editUser

    const orderListUser=useSelector(state=>state.orderListUser)
    const {loading:orderLoading,error:orderError,order}=orderListUser

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        errMessage:''
      })
    
      
    useEffect(()=>{

        if(!user){
          history.push('/login')
        }
        if(!(userData && userData.name && userData.email)){
            dispatch(getUserDetails())
           
        }else{
            setValues({
                name:userData.name,
                email:userData.email
            })
        }
       
        },[dispatch,userData,message,history,user])


      useEffect(()=>{
        dispatch(listUserOrders())
      },[])  

      const {name,email,password,confirmPassword,errMessage}=values

    const handleChange=e=>{
        const {name,value}=e.target
        setValues({
          ...values,
          [name]:value
        })
      }

      const submit=e=>{
        e.preventDefault()

        if(password!==confirmPassword){
          setValues({errMessage:'Passwords do not match'})
        }else{
          const details={name,email,password}
          dispatch(editUserDetails(details))
          setValues({errMessage:''})
        }
       
      }

     

  return (
      <>
    {
        (editLoading || loading ||orderLoading)?<Loading />
        :
    orderError?<Message>{orderError}</Message>
        :
        <Row>
      <Col sm={12} md={4}>
          <h2>User Details</h2>
          {
              editError && <Message>{editError}</Message>
          }
          {
              message && <Message variant='success'>{message.message}</Message>
          }

          {
            errMessage && <Message>{errMessage}</Message>
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

    <Form.Group controlId="confirmPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="text" placeholder="confirmPassword" name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
    </Form.Group>
  
    <Button variant="dark" type="submit">
      Edit
    </Button>
  </Form>
      </Col>

      <Col sm={12} md={8} className='text-center'>
          <h2>Order details</h2>
          {
            order && order.length===0?<h4>No Orders Found</h4>
            :
            <Table striped bordered responsive className='my-4'>
            <thead>
              <tr>
              <th>ID</th>
              <th>TOTAL AMOUNT</th>
              <th>PAYMENT STATUS</th>
              <th>DELIVERY STATUS</th>
              </tr> 
            </thead>
            <tbody>
              {
                order && order.map((item,k)=>{
                  return <tr key={k}>
                  <td><Link to={`/payment/${item._id}`} style={{textDecoration:'none',color:'green'}}>{item._id}</Link></td>
                  <td>{item.totalPrice}</td>
                  <td>{item.isPaid?'PAID':'NOT PAID'}</td>
                  <td>{item.isDelivered?'DELIVERED':'NOT DELIVERED'}</td>
                </tr>
                })
              }
            </tbody>

          </Table>
          }
      </Col>
    </Row>
    }
    </>
  )
}

export default ProfileScreen
