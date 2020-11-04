import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listAllProducts } from "../actions/productActions"
import { Col, Container, Row } from "react-bootstrap"
import Product from '../components/Product'
import Loading from '../components/Loading'
import Message from '../components/Message'
import PaginateComponent from '../components/PaginateComponent'

const Homescreen = ({match}) => {

 const keyword= match.params.keyword
 const page=match.params.page ||1

const dispatch=useDispatch()
const listProducts=useSelector(state=>state.listProducts)
const {error,loading,productList,pages}=listProducts

useEffect(()=>{
 dispatch(listAllProducts(keyword,page))
},[dispatch,match,keyword,page])
 



  return (
    
    loading?<Loading />:error?<Message variant='danger'>{error}</Message>
    :productList && productList.length===0?<Message>No Products found</Message>
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
   <PaginateComponent page={page} pages={pages} keyword={keyword?keyword:''}/>
    </Container>
    
  )
}

export default Homescreen
