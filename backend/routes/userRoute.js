import express from 'express'
import { 
    authUser, 
    getUserProfile, 
    getUsers, 
    registerNewUser, 
    updateUserProfile 
} from '../controllers/userController.js'
import protect, { admin } from '../middleware/authNiddleware.js'

const router = express.Router()

router.route('/').post(registerNewUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router