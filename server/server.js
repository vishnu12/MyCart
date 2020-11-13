import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import {notFound,errorHandler} from './middlewares/errorMiddleware.js'

dotenv.config()
const app=express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/user',userRoutes)
app.use('/products',productRoutes)
app.use('/upload',uploadRoutes)
app.use('/order',orderRoutes)

app.get('/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.use('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
 }else{
     app.get('/',(req,res)=>{
         res.send('API is running')
     })
 }


app.use(notFound)
app.use(errorHandler)

const port=process.env.PORT || 3001


app.listen(port,()=>console.log(`server running on port ${port}`))