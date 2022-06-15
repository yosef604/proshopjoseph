import express from 'express'
import { 
    authUser, 
    deleteUser, 
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
router.route('/:id').delete(protect, admin, deleteUser)

export default router