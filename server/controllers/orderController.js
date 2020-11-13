
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


export const createOrder=asyncHandler(async(req,res)=>{

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } =req.body

    if(orderItems && orderItems.length===0){
        res.status(404)
        throw new Error('No order found')
    }else{

        const order=new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder=await order.save()
        if(createdOrder){
            res.status(201).json(createdOrder)
        }else{
            res.status(400)
            throw new Error('Failed to create order')
        }
    }

    
})

export const getOrderById=asyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id).populate('user','name email')
   
    if(order){
        res.status(200).json(order)
    }else{
        res.status(404)
        throw new Error('No order found')
    }
})


export const updateOrderToPaid=asyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address

        }

        const updatedOrder=await order.save()
        if(updatedOrder){
            res.status(200).json(updatedOrder)
        }else{
            res.status(400)
            throw new Error('Could not update order')
        }
    }else{
        res.status(400)
        throw new Error('No order found')
    }
})


export const updateOrderToDelivered=asyncHandler(async(req,res)=>{

     const order=await Order.findById(req.params.id)
     if(order){
         order.isDelivered=true
         order.deliveredAt=Date.now()

         const updatedOrder=await order.save()
         res.json({message:'Order updated'})
     }else{
         res.status(404)
         throw new Error('No order found')
     }
})

export const getOrdersOfUser=asyncHandler(async(req,res)=>{

    const orders=await Order.find({user:req.user._id})
    .populate('user','name email')
    .sort('-createdAt')
    if(orders){
        res.status(200).json(orders)
    }else{
        res.status(404)
        throw new Error('No orders found for this user')
    }
})


export const getAllOrders=asyncHandler(async(req,res)=>{

    const orders=await Order.find({}).populate('user','name email').sort('-createdAt')
    if(orders){
        res.status(200).json(orders)
    }else{
        res.status(404)
        throw new Error('No orders found')
    }
})