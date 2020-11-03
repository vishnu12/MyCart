import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Container, Form,Button, ListGroup,ListGroupItem} from 'react-bootstrap'
import Message from './Message'
import Rating from './Rating'
import { createReview } from '../actions/productActions'
import { Link } from 'react-router-dom'



const ProductReview = () => {

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')

    const dispatch=useDispatch()

    const productDetails=useSelector(state=>state.productDetails)
    const {error,product}=productDetails

    const userLogin=useSelector(state=>state.userLogin)
    const {user}=userLogin

    // const productReview=useSelector(state=>state.productReview)
    // const {loading:reviewLoading,error:reviewError,success}=productReview



    const submit=e=>{
        e.preventDefault()
        const data={
            id:product._id,
            rating,
            comment
        }
    dispatch(createReview(data))
    }

  return (
    <section className='review'>
        <Container>
            <ListGroup variant='flush'>
                    
                        <ListGroupItem>
                        <h3 className='mb-4'>Write A Review</h3>
                        {
                            !user?<Link to='/login'>Please login to write a review</Link>
                            :
                            <Form onSubmit={submit} variant='flush'>
                                          <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} 
                                        onChange={e=>setRating(e.target.value)}>
                                      <option value=''>select...</option>
                                      <option value='1'>1 -Poor</option>
                                      <option value='2'>2 -Fair</option>
                                      <option value='3'>3 -Good</option>
                                      <option value='4'>4 -Very good</option>
                                      <option value='5'>5 -Excellent</option>
                                        </Form.Control>
                                          </Form.Group>
                                          <Form.Group controlId='comment'>
                                         <Form.Label>Comment</Form.Label>
                                         <Form.Control as='textarea' rows='3' value={comment}
                                         onChange={e=>setComment(e.target.value)}>
                  
                                         </Form.Control>
                                          </Form.Group>
                                          <Button type='submit' variant='outline-dark'>
                                              Submit
                                          </Button>
                                         </Form>
                        }
                        </ListGroupItem>
                        
                        <h5 style={{marginTop:'2rem'}}>Reviews</h5>
                        {
                          error && <Message>{error}</Message>
                        }
                       {
                           product && product.review && product.review.length===0 &&<Message variant='info'>No Reviews</Message>
                       }
            
                       {
                           product && product.review.map((item,k)=>{
                               return <ListGroupItem key={k}>
                                       <strong>{item.name}</strong>
                                       <Rating value={item.rating}/>
                                       {/* <p>{item.createdAt.substring(0,10)}</p> */}
                                       <p>{item.comment}</p>
                                     </ListGroupItem>
                           })
                       }

                       </ListGroup>
      </Container>
    </section>
  )
}

export default ProductReview
