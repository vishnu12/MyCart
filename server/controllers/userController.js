import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


export const signup=asyncHandler(async(req,res)=>{
    const {name,email,password} =req.body

    const userExists= await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user= new User({
        name,
        email,
        password
    })

    const savedUser=await user.save()
    if(savedUser){
        savedUser.password=undefined
        res.status(201).json(savedUser)
    }else{
        res.status(400)
        throw new Error('Invalid user')
    }
})


export const signin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const existingUser=await User.findOne({email})
    if(existingUser && await(existingUser.matchPassword(password))){
      
        const token=await jwt.sign({id:existingUser._id},process.env.SECRET,{expiresIn:'1d'})
        res.json({
            _id:existingUser._id,
            name:existingUser.name,
            email:existingUser.email,
            isAdmin:existingUser.isAdmin,
            token
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


export const getUserDetails=asyncHandler(async(req,res)=>{

     const user=await User.findById(req.user._id)
     res.status(200)
     .json(user)
})


export const editUser=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.user._id)
    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        if(req.body.password){
            user.password=req.body.password
        }

     const updatedUser= await user.save()
     res.status(200)
     .json({
         message:'User updated successfully'
     })
    }else{
        res.status(404)
        throw new Error('Could not update user')
    }

})

export const getAllUsers=asyncHandler(async(req,res)=>{

    const users=await User.find({})
    if(users){
        res.status(200).json(users)
    }else{
        res.status(404)
        throw new Error('Could not get details')
    }
})

export const getUserById=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.params.id)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

export const editUserById=asyncHandler(async(req,res)=>{
     
    const user=await User.findById(req.params.id)
    if(user){
     user.name=req.body.name
     user.email=req.body.email
     user.isAdmin=req.body.isAdmin

     const updtaedUser=await user.save()
     if(updtaedUser){
         updtaedUser.password=undefined
         res.status(201).json({message:'User updated successfully',updtaedUser})
     }else{
         res.status(400)
         throw new Error('Could not update user')
     }
    }else{
        res.status(404)
        throw new Error('No user found')
    }
   
})


export const deleteUser=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'User removed'})
    }else{
      res.status(404)
      throw new Error('No user found')
    }
})