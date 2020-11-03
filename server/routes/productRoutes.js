

import express from 'express'

import { getAllProducts,getSingleProduct,addReview, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js'
import {isSignedIn,isAdmin} from '../middlewares/authMiddleware.js'

const router=express.Router()

router.get('/',getAllProducts)

router.get('/:id',getSingleProduct)

router.post('/:id/review',isSignedIn,addReview)

router.post('/create',isSignedIn,isAdmin,createProduct)

router.delete('/:id',isSignedIn,isAdmin,deleteProduct)

router.put('/:id',isSignedIn,isAdmin,updateProduct)





export default router
