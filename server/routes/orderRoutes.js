import express from 'express'
import { createOrder,getAllOrders,getOrderById, getOrdersOfUser, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import { isAdmin, isSignedIn } from '../middlewares/authMiddleware.js'

const router=express.Router()

router.post('/create',isSignedIn,createOrder)

router.get('/:id',isSignedIn,getOrderById)

router.put('/:id/pay',isSignedIn,updateOrderToPaid)

router.put('/:id/deliver',isSignedIn,isAdmin,updateOrderToDelivered)

router.get('/find/all-orders',isSignedIn,isAdmin,getAllOrders)

router.get('/find/user',isSignedIn,getOrdersOfUser)


export default router