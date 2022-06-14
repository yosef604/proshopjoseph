import express from 'express'
import { addOrderItemss } from '../controllers/orderController.js'
import protect from '../middleware/authNiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItemss)


export default router