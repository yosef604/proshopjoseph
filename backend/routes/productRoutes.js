import express from 'express'
import { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    updateProduct,
    createProduct,
    newReview
} from '../controllers/productContrller.js'
import protect, { admin } from '../middleware/authNiddleware.js'


const router = express.Router()


router.route('/').get(getProducts).
post(protect, admin, createProduct)

router.route('/:id').get(getProductById).
delete(protect, admin, deleteProduct).
put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, newReview)

export default router