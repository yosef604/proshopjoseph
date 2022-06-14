import express from 'express'
import { addOrderItemss, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import protect from '../middleware/authNiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItemss)
router.route('/:id').get(protect, getOrderById)
router.route('/:id.pay').put(protect, updateOrderToPaid)


export default router