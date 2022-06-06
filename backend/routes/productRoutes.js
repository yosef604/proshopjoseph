import express from 'express'
import asyncHandler from 'express-async-handler'
import { async } from 'rxjs'
import Product from '../models/productModel.js' 

const router = express.Router()

// @desc    Fetching all products
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    

    res.json(products)
}))

// @desc    Fetching a single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    console.log(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))   

export default router