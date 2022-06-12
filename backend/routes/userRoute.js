import express from 'express'
import { authUser, getUserProfile, registerNewUser, updateUserProfile } from '../controllers/userController.js'
import protect from '../middleware/authNiddleware.js'

const router = express.Router()

router.route('/').post(registerNewUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router