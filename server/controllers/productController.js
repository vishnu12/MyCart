import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

export const getAllProducts=asyncHandler(async(req,res)=>{

    const products=await Product.find({})
    if(products){
        res.json(products)
    }else{
        res.status(404)
        throw new Error('No produts found')
    }
})

export const getSingleProduct=asyncHandler(async(req,res)=>{

    let product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


export const addReview=asyncHandler(async(req,res)=>{

    const {rating,comment} =req.body
    const prod=await Product.findById(req.params.id)
    if(prod){
        let addedReview=prod.review.find(item=>item.user.toString()===req.user._id.toString())
        if(addedReview){
          res.status(400)
          throw new Error('Already reviewed')
        }else{
            const review={
                name:req.user.name,
                user:req.user._id,
                rating,
                comment
            }

            prod.review.push(review)
            prod.numReviews=prod.review.length
            prod.rating=prod.review.reduce((acc,itm)=>acc+itm.rating,0)/prod.review.length
            const updatedProd=await prod.save()
            res.status(201).json({message:'Review added',updatedProd})
        }
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

})


export const createProduct=asyncHandler(async(req,res)=>{

      const sampleProduct=new Product({
          name:'Sample name',
          description:'Sample description',
          price:10,
          brand:'Sample brand',
          image:'images/image.jpg',
          category:'sample',
          rating:0,
          numReviews:0,
          stock:0,

      })

     const savedProd=await sampleProduct.save()
     if(savedProd){
         res.status(201).json(savedProd)
     }else{
         res.status(400)
         throw new Error('Could not create product')
     }
})


export const deleteProduct=asyncHandler(async(req,res)=>{

    const product=await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.status(200).json({message:'Product removed'})
    }else{
        res.status(400)
        throw new Error('Could not remove product')
    }
})

export const updateProduct=asyncHandler(async(req,res)=>{

    let product=await Product.findById(req.params.id)
    if(product){
        product.name=req.body.name
        product.description=req.body.description
        product.price=Number(req.body.price)
        product.category=req.body.category
        product.stock=Number(req.body.stock)
        product.brand=req.body.brand
        product.image=req.body.image

        const updatedProduct=await product.save()
        if(updateProduct){
            res.status(200).json(updatedProduct)
        }else{
            res.status(400)
            throw new Error('Product update failed')
        }
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})