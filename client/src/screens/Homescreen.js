import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listAllProducts } from "../actions/productActions"
import { Col, Container, Row } from "react-bootstrap"
import Product from '../components/Product'
import Loading from '../components/Loading'
import Message from '../components/Message'

const Homescreen = () => {

const dispatch=useDispatch()
const listProducts=useSelector(state=>state.listProducts)
const {error,loading,productList}=listProducts

useEffect(()=>{
 dispatch(listAllProducts())
},[dispatch])
 



  return (
    
    loading?<Loading />:error?<Message variant='danger'>{error}</Message>
    :
    <Container className='mt-4' style={{overflow:'hidden'}}>
        <Row>
        {
       productList && productList.map((product,k)=>{
          return  <Col sm={12} md={3} key={k}>
            <Product product={product}/>
            </Col>
        })
        }
        </Row>
   
    </Container>
    
  )
}

export default Homescreen
