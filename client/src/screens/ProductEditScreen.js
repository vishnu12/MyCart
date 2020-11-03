import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button, Row, Col} from 'react-bootstrap'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { getProductDetails, updateProduct } from '../actions/productActions'
import Message from '../components/Message'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'

const ProductEditScreen = ({match,history}) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
  
    const prodId=match.params.id
    const dispatch=useDispatch()

    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails

    const productUpdate=useSelector(state=>state.productUpdate)
    const {loading:updateLoading,error:updateError,success}=productUpdate

    useEffect(()=>{
      dispatch({type:PRODUCT_UPDATE_RESET})  
      if(success){
        history.push('/admin/products')
      }else{
        if(!product?.name || product?._id !==prodId){
            dispatch(getProductDetails(prodId))
        }else{
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setCategory(product.category)
          setStock(product.stock)
          setBrand(product.brand)
          setDescription(product.description)
        }
      }
      
    },[match,prodId,product,success,history])


    const uploadHandler=async e=>{
        const file=e.target.files[0]
        let formData=new FormData()
        formData.append('image',file)
        setUploading(true)

        try {

        const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }

            const {data}=await axios.post('/upload',formData,config)
            setUploading(false)
            setImage(data)
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
    }

    const submit=e=>{
        e.preventDefault()
        const data={
            id:prodId,
            name,
            description,
            price,
            image,
            category,
            brand,
            stock
        }

        dispatch(updateProduct(data))
    }

  return (
    <>
            {
             (updateLoading || loading)?<Loading />
            :error?<Message>{error}</Message>
            :updateError?<Message>{updateError}</Message>
            :
            <>
            <Link to='/admin/products' className='btn btn-light my-3'>Go back</Link>
            <Row className='col-md-6 m-auto'>
             <Col>
                <h1 className='text-center'>Edit Product</h1>
                  <Form onSubmit={submit}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name'
                                    value={name} onChange={e => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' placeholder='Enter price'
                                    value={price} onChange={e => setPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter Image url'
                                    value={image} onChange={e => setImage(e.target.value)} />
                            </Form.Group>
                            <Form.File id='image-file' label='choose file' custom
                            onChange={uploadHandler}></Form.File>
                            {uploading && <Loading />}
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand'
                                    value={brand} onChange={e => setBrand(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' placeholder='Enter category'
                                    value={category} onChange={e => setCategory(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='stock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type='number' placeholder='Enter stock'
                                    value={stock} onChange={e => setStock(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' placeholder='Enter description'
                                    value={description} onChange={e => setDescription(e.target.value)} />
                            </Form.Group>
                            <Button type='submit' variant='outline-dark'>
                                Update
</Button>
                        </Form>
            
                        </Col>
            </Row>
            </>
            }
        </>
  )
}

export default ProductEditScreen
