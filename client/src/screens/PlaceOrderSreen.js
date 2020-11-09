import React,{useEffect} from 'react'
import { Col, ListGroup, ListGroupItem, Row,Image,Card,Button } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { createOrder } from '../actions/orderActions'
import Loading from '../components/Loading'
import Message from '../components/Message'

const PlaceOrderSreen = ({history}) => {

  const dispatch=useDispatch()

  const cart=useSelector(state=>state.cart)
  const {cartItems,details}=cart

  const orderCreate=useSelector(state=>state.orderCreate)
  const {loading,success,order,error}=orderCreate

  let itemsPrice=cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)
  let shippingPrice=itemsPrice>10?10:0
  let taxPrice=(itemsPrice*.05).toFixed(2)

  let totalPrice=Number(itemsPrice)+Number(shippingPrice)+Number(taxPrice)

 const palceOrder=()=>{
     const orderData={
         shippingAddress:{
             address:details?.address,
             city:details?.city,
             postalCode:details?.postalcode,
             country:details?.country
         },
         orderItems:cartItems?cartItems:[],
         paymentMethod:details?.payment,
         itemsPrice,
         shippingPrice,
         taxPrice,
         totalPrice
     }

    dispatch(createOrder(orderData))
 }

useEffect(()=>{
  if(success){
    history.push(`/payment/${order._id}`)
  }
},[success])

  return (
      
    <>
    {
        loading?<Loading />
        :
        <Row>
    <Col md={8} className='text-left'>
    <ListGroup variant='flush'>
    <h2>SHIPPING</h2>
    {
        details && <ListGroupItem>
       <div className='d-flex'>
       <p>{details.address},</p>
        <p>{details.city},</p>
        <p>{details.postalcode},</p>
        <p>{details.country}</p>
       </div>
       </ListGroupItem>
    }
      <h2>PAYMENT</h2>
    <ListGroupItem>
        <p>Payment method : {details && details.payment}</p>
    </ListGroupItem>
    {
        cartItems && cartItems.map((item,k)=>{
            return <ListGroupItem key={k}>
                   <Row>
                       <Col md={1}><Image src={item.image} alt={item.name} fluid rounded style={{width:'30px'}}/></Col>
                       <Col md={3}>
                      <p>{item.name}</p>
                       </Col>
                       <Col md={6}>
        <p>{item.qty} X {item.price} = {item.qty*item.price}</p>
                       </Col>
                   </Row>
                </ListGroupItem>
        })
    }
    </ListGroup>
    </Col>
    <Col md={4}>
        <Card>
<ListGroup>
    <ListGroupItem>
        <h3 className='text-center'>ORDER SUMMARY</h3>
    </ListGroupItem>
    <ListGroupItem>
                          <Row>
                              <Col>Items</Col>
                    <Col className='text-right'>$ {itemsPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col>Shipping</Col>
                    <Col className='text-right'>$ {shippingPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col>Tax</Col>
                    <Col className='text-right'>$ {taxPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col>Total</Col>
                    <Col className='text-right'>$ {totalPrice}</Col>
                          </Row>
                      </ListGroupItem>
                      {error && <Message>{error}</Message>}
                      <ListGroupItem>
                          <Button variant='dark' type='button' className='btn btn-block'
                          onClick={()=>palceOrder()}
                          >Place Order</Button>
                      </ListGroupItem>
</ListGroup>
        </Card>
    </Col>
    </Row>
    }
    </>
  )
}

export default PlaceOrderSreen
