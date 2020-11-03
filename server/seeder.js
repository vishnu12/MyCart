import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {storeProducts} from './data/products.js'
import Product from './models/productModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData=async()=>{
    try {
        await Product.deleteMany()
        await Product.insertMany(storeProducts)
        console.log('Data inserted');
        process.exit()
    } catch (error) {
        console.log(`${error}`);
        process.exit(1)
    }
}

const destroyData=async()=>{
    try {
        await Product.deleteMany()
        console.log('Data destroyed');
        process.exit()
    } catch (error) {
        console.log(`${error}`);
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}else{
    importData()
}
