
import express from 'express'

const router=express.Router()
import {signup,signin,getUserDetails,editUser, getAllUsers,getUserById,editUserById,deleteUser} from '../controllers/userController.js'
import {isSignedIn,isAdmin} from '../middlewares/authMiddleware.js'


router.post('/signup',signup)
router.post('/signin',signin)

router.get('/userdetails',isSignedIn,getUserDetails)
router.get('/all',isSignedIn,isAdmin,getAllUsers)
router.get('/:id',isSignedIn,isAdmin,getUserById)

router.put('/edit',isSignedIn,editUser)

router.put('/edit/:id',isSignedIn,isAdmin,editUserById)

router.delete('/:id',isSignedIn,isAdmin,deleteUser)







export default router
