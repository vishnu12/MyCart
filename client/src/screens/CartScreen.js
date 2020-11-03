import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col, ListGroup, ListGroupItem, Row,Image, FormControl,Card,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addItemsToCart ,removeItemsFromCart} from '../actions/cartActions'

const CartScreen = ({match,history,location}) => {

const prodId=match.params.id
const qty=location.search?Number(location.search.split('=')[1]):1
const dispatch=useDispatch()

const cart=useSelector(state=>state.cart)
const {cartItems}=cart


useEffect(()=>{
  dispatch(addItemsToCart(prodId,qty))
},[dispatch])

const checkout=()=>{

  history.push(`/login?redirect=shipping`)
}

const removeItem=(id)=>{
  dispatch(removeItemsFromCart(id))
}

  return (
    <section className='text-center'>
    {
      cartItems && cartItems.length===0?
      <>
      <h1 className='text-center'>Your cart is empty</h1>
      <Link variant='dark' to='/' style={{textDecoration:'none',color:'green'}}>Go Back</Link>
      </>
      :
      <>
       <h1 className='mb-4'>Your Cart</h1>
     <Row>
       <Col md={8}>
         <ListGroup variant='flush'>
           {
             cartItems && cartItems.map((item,k)=>{
              return <ListGroupItem key={k}>
              <Row>
                <Col md={2}><Image src={`/${item.image}`} alt={item.name} fluid rounded/></Col>
             <Col md={3}><Link to={`/product/${item.id}`} style={{textDecoration:'none',color:'black'}}>{item.name}</Link></Col>
             <Col md={2}>$ {item.price}</Col>
                <Col md={3}>
                  <FormControl as='select'
                  value={item.qty}
                  onChange={e=>dispatch(addItemsToCart(item.id,Number(e.target.value)))}>
                    <option value=''>select</option>
                   {
                     [...Array(item.stock).keys()].map(k=>{
                       return <option value={k+1} key={k+1}>{k+1}</option>
                     })
                   }
                  </FormControl>
                </Col>
                <Col md={2}>
                  <Button variant='light' onClick={()=>removeItem(item.id)}>
                  <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
             })
           }
         </ListGroup>
       </Col>


       <Col md={4}>
         <Card>
         <ListGroup variant='flush'>
           <ListGroupItem>
          {
            <>
            <h4>Total ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h4>
          <h5>$ {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</h5>
            </>
          }
           </ListGroupItem>
           <ListGroupItem>
           <Button variant='dark' className='btn btn-block' onClick={checkout}>
            Checkout
           </Button>
           </ListGroupItem>
         </ListGroup>
         </Card>
       </Col>
     </Row>
      </>
    }
    </section>
  )
}

export default CartScreen
