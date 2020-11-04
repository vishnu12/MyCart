
import React,{useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { deliverOrder, listAllOrders } from '../actions/orderActions'
import Loading from '../components/Loading'
import Message from '../components/Message'

const OrderListScreen = ({history}) => {

    const userLogin=useSelector(state=>state.userLogin)
    const {user}=userLogin

    const orderListAll=useSelector(state=>state.orderListAll)
    const {error,loading,order}=orderListAll

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { success, loading:deliverLoading, error:deliverError } = orderDeliver

    const dispatch=useDispatch()

    useEffect(()=>{
       if(!user && !user?.isAdmin){
         history.push('/login')
       } 
      dispatch(listAllOrders())
    },[dispatch,success,history,user])

    const deliverHandler=(id)=>{
     dispatch(deliverOrder(id))
    }

  return (
      <>
    <h1 className='text-center'>ORDERS</h1>
    {
        (loading || deliverLoading)?<Loading />
        :error?<Message>{error}</Message>
        :deliverError?<Message>{deliverError}</Message>
        :
        <Table striped bordered responsive className='my-4 text-center'>
            <thead>
              <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PAYMENT STATUS</th>
              <th>DELIVERY STATUS</th>
              </tr> 
            </thead>
            <tbody>
              {
                order && order.map((item,k)=>{
                  return <tr key={k}>
                  <td><Link to={`/payment/${item._id}`} style={{textDecoration:'none',color:'green'}}>{item._id}</Link></td>
                  <td>{item.user.name}</td>
                  <td><a href={`mailto:${item.user.email}`} style={{textDecoration:'none',color:'green'}}>{item.user.email}</a></td>
                  <td>{item.isPaid?'PAID':'NOT PAID'}</td>
                  <td>
                      {
                          item.isDelivered?'DELIVERED'
                          :
                          <Button variant='dark' className='btn btn-block'
                          onClick={()=>deliverHandler(item._id)}>MARK DELIVERED</Button>
                      }
                  </td>
                </tr>
                })
              }
            </tbody>

          </Table>
    }
    </>
  )
}

export default OrderListScreen
