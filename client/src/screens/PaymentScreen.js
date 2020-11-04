import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { Row, Col, ListGroup, ListGroupItem, Card,Button,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import Message from '../components/Message'
import Loading from '../components/Loading'


const PaymentScreen = ({match,history}) => {

  const dispatch = useDispatch()

  const orderId=match.params.id

  const userLogin = useSelector(state => state.userLogin)
  const { user } = userLogin

  const orderDetails = useSelector(state => state.orderDetails)
  const { orderData, loading } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { success, loading:payLoading, error:payError } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { success:deliverSuccess, loading:deliverLoading, error:deliverError } = orderDeliver

  const [sdkReady, setSdkReady] = useState(false)

  const addPayPalScript=async()=>{
    const {data:clientId} = await axios.get('/config/paypal')
    let script=document.createElement('script')
    script.type = 'text/javascript'
    script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async = true
    script.onload=()=>{
       setSdkReady(true)
      //  console.log(script,'loaded')
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if(!user){
      history.push('/login')
    }
    if(!orderData || orderData?._id!==orderId ||success){
      dispatch(getOrderDetails(orderId))
    }
   if(!orderData?.isPaid){
      if(!window.paypal){
        addPayPalScript()
      }else{
        setSdkReady(true)
      }
    }
  }, [match,dispatch,history,success,deliverSuccess])


  const successHandler=(result)=>{
    dispatch(payOrder(orderId,result))
  }

  const deliverHandler=(id)=>{
    dispatch(deliverOrder(id))
  }

  return (
    <>
    {
      (loading || payLoading ||deliverLoading)?<Loading />
    :payError?<Message>{payError}</Message>
    :deliverError?<Message>{deliverError}</Message>
    :
      <Row>
      <Col md={8} className='text-left'>
        <h3>
          ORDER ID : {orderId}
        </h3>
        <ListGroup variant='flush'>
        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p><strong>Name :</strong> {orderData?.user.name}</p>
                            <p><strong>Email :</strong><a href={`mailto:${orderData?.user.email}`} 
                            style={{textDecoration:'none',color:'green'}}>{orderData?.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {orderData?.shippingAddress.address},
                          {orderData?.shippingAddress.city},
                          {orderData?.shippingAddress.postalCode},
                          {orderData?.shippingAddress.country}
                            </p>
                            {orderData?.isDelivered ? <Message variant='success'>Delivered on {orderData?.deliveredAt}</Message>
                                :
                                <Message variant='danger'>Not delivered</Message>
                            }
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {orderData?.paymentMethod}
                            </p>

                            {orderData?.isPaid ? <Message variant='success'>Paid on {orderData?.paidAt}</Message>
                                :
                                <Message variant='danger'>Not paid</Message>
                            }
                        </ListGroupItem>

                        {
        orderData && orderData.orderItems.map((item,k)=>{
          const imgUrl=(`${item?.image}`).includes('uploads')?`${item?.image}`:`/${item?.image}`
            return <ListGroupItem key={k}>
                   <Row>
                       <Col md={1}><Image src={imgUrl}
                       alt={item.name} fluid rounded style={{width:'30px'}}/></Col>
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
          <ListGroup variant='flush' >
            <ListGroupItem>
              <h2 className='text-center'>Order Summary</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Items</Col>
                <Col>$ {orderData?.itemsPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Shipping</Col>
                <Col>$ {orderData?.shippingPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Tax</Col>
                <Col>$ {orderData?.taxPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Total</Col>
                <Col>$ {orderData?.totalPrice}</Col>
              </Row>
            </ListGroupItem>
            {
              !orderData?.isPaid &&(<ListGroupItem>
                {!sdkReady? <Loading/>
                :
                <PayPalButton
                amount={orderData?.totalPrice}
                onSuccess={(result)=>successHandler(result)}
                >

                </PayPalButton>
                }
                
                
              </ListGroupItem>)
            }

             {user && user.isAdmin && orderData?.isPaid && !orderData?.isDelivered && (
                                <ListGroupItem>
                                    <Button variant='dark' type='button' className='btn btn-block' onClick={()=>deliverHandler(orderData?._id)}>
                                    Mark as delivered
                                    </Button>
                                </ListGroupItem>
                            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
    }
    </>
  )
}

export default PaymentScreen
