import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetching all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const products = await Product.find({...keyword})
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


// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Privet
export const newReview = asyncHandler(async (req, res) => {

    const { rating, comment} = req.body
    
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user.id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product Already Reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user.id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce(
            (acc, item) => item.rating + acc, 0
        ) / product.reviews.length

        await product.save()
        res.status(201).json({message: 'Review added'})
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