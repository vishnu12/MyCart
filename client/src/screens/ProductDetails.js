import React,{useEffect} from 'react'
import { Col,Row,Image, Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
// import { Link } from 'react-router-dom'
import { getProductDetails } from '../actions/productActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import ProductReview from '../components/ProductReview'
const ProductDetails = ({match,history,location}) => {

    const prodId=match.params.id
    const dispatch=useDispatch()

    const productDetails=useSelector(state=>state.productDetails)
    const {error,loading,product}=productDetails

    const productReview=useSelector(state=>state.productReview)
    const {loading:reviewLoading,error:reviewError,success}=productReview
   
    const addToCart=(id)=>{
      history.push(`/cart/${prodId}?qty=1`)
      
    }

    
    useEffect(()=>{
      dispatch(getProductDetails(prodId))
    },[match,dispatch,success])

   const imgUrl=(`${product?.image}`).includes('uploads')?`${product?.image}`:`/${product?.image}`
  return (
      <>
      {
          (loading ||reviewLoading) && <Loading />
      }

       {
          error && <Message>{error}</Message>
      }
  {
  product && 
     <Row>
         <Col md={6}>
          <Row>
       <Col md={7} className='text-center'>
  <h2>{product.name}</h2>
  <Image src={imgUrl} alt={product.name} fluid/>
 
       </Col>
       <Col md={5} style={{marginTop:'5rem'}}>
  <h5><strong>Brand : {product.brand}</strong></h5>
  <p>{product.description}</p>
  <h5>Price : ${product.price}</h5>
  {
    product.stock !==0?
    <p>In stock</p>
    :
    <p style={{color:'red'}}>Out of stock</p>
  }
  <Button variant='outline-dark' style={{marginTop:'2rem'}} onClick={addToCart} disabled={product.stock===0}>
   Add to Cart
  </Button>
  
  
       </Col>
          </Row>
         </Col>

         
         <Col md={6} className='text-center align-items-center'>
           {
             reviewError && <Message>{reviewError}</Message>
           }
      <ProductReview />
         </Col>
    </Row> 
    }
    </>
  )
}

export default ProductDetails
