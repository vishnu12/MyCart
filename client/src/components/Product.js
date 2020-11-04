import React from 'react'
import {Card} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'

const Product = ({product}) => {

  const imgUrl=((`${product?.image}`).includes('search')||(`${product?.image}`).includes('upload'))?`${product?.image}`:`/${product?.image}`
  return (
 <LinkContainer to={`/product/${product._id}`} style={{cursor:'pointer',marginBottom:'1.5rem'}}>
 <Card style={{ width: '10rem',height:'20rem' }} className='mt-2 text-center align-items-center'>
  <Card.Img variant="top" src={imgUrl} style={{height:'10rem',width:'auto'}} className='img-fluid'/>
  <Card.Body>
    <Card.Title>{product.name}</Card.Title>
    <Card.Text as='div'>
     <div className='my-3'>
     <Rating value={product.rating} text={`${product.numReviews}`}/>
     </div>
    </Card.Text>
    <Card.Text>
      {product.description}
    </Card.Text>
  </Card.Body>
</Card>
</LinkContainer>   
   
  )
}

export default Product
