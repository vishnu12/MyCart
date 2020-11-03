import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Table,Button, Col,Row} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { listAllProducts } from '../actions/productActions'
// import { Link } from 'react-router-dom'
import { createProduct,deleteProduct } from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({history,match}) => {

    const dispatch=useDispatch()
    
    const userLogin=useSelector(state=>state.userLogin)
    const {user}=userLogin

    const listProducts=useSelector(state=>state.listProducts)
    const {error,loading,productList}=listProducts

    const productCreate=useSelector(state=>state.productCreate)
    const {error:createError,loading:createLoading,success,createdProduct}=productCreate

    const productDelete=useSelector(state=>state.productDelete)
    const {success:deleteSuccess,error:deleteError}=productDelete

    useEffect(()=>{
      dispatch({type:PRODUCT_CREATE_RESET})  
     if(!user?.isAdmin){
         history.push('/login')
     }else if(success){
        history.push(`/admin/products/${createdProduct._id}/edit`)
     }else{
        dispatch(listAllProducts())
     }
    },[history,user,success,deleteSuccess])

    const createHandler=()=>{
     dispatch(createProduct())
    }

    const deleteHandler=(id)=>{
      if(window.confirm('Are you sure to delete?')){
        dispatch(deleteProduct(id))
      }
    }

  return (
    <>
    <Row>
        <Col className='text-center'><h2>PRODUCTS</h2></Col>
        <Col className='text-right'>
            <Button className='my-3 btn btn-light' onClick={createHandler}>
             <i className='fas fa-plus mr-1'></i>Create
            </Button>
        </Col>
    </Row>
    {
        (loading || createLoading)?<Loading />
    :error?<Message>{error}</Message>
    :
    <>
    {
        createError && <Message>{createError}</Message>
    }
    {
        deleteError && <Message>{deleteError}</Message>
    }
        <Table striped bordered responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {productList && productList.map(product=>{
                    return <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        {user && user.isAdmin?<i className='fas fa-check' style={{color:'green'}}></i>
                        :
                        <i className='fas fa-times' style={{color:'red'}}></i>
                        }
                    </td>
                    <td>
                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                    </td>
                    </tr>
                })}
            </tbody>
         </Table> 
    
    </>
    }
     
    </>
  )
}

export default ProductListScreen
