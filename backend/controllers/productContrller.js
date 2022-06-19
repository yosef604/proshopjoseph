import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetching all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


// @desc    Fetching a single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Privet/Admin
const deleteProduct= asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({Message: 'Product Removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// @desc    Create product
// @route   POST /api/products
// @access  Privet/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product =  new Product({
        name: 'Sample name',
        price: 0,
        user: req.user.id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


// @desc    Update product
// @route   PUT /api/products/:id
// @access  Privet/Admin
export const updateProduct = asyncHandler(async (req, res) => {

    const {
        name, price, description, image,
        brand, countInStock, category
    } = req.body
    
    const product = await Product.findById(req.params.id)

    if (product) {

            product.name = name,
            product.price = price,
            product.image = image,
            product.brand = brand,
            product.category = category,
            product.countInStock = countInStock,
            product.description = description


        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

    res.status(201).json(product)
})

export {
    getProducts,
    getProductById,
    deleteProduct
}