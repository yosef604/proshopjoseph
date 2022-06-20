import express from 'express'
import { 
    addOrderItemss, 
    getAllOrders, 
    getMyOrders, 
    getOrderById, 
    updateOrderToDeliverd, 
    updateOrderToPaid 
} from '../controllers/orderController.js'
import protect, { admin } from '../middleware/authNiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItemss).
get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin, updateOrderToDeliverd)


export default router