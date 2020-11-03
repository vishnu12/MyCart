import mongoose from 'mongoose'

const {ObjectId}=mongoose.Schema.Types


const reviewSchema=mongoose.Schema({
    name:{type:String,required:true},
    user:{
        type:ObjectId,
        ref:'User'
    },
    comment:{type:String,required:true},
    rating:{type:Number,required:true}
},{timestamps:true})


const productSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
        
    },
    stock:{
        type:Number,
        default:2
    },
    rating:{
        type:Number,
    },

    numReviews:{
        type:Number
    },

    review:[reviewSchema]
},{timestamps:true})


const Product=mongoose.model('Product',productSchema)

export default Product