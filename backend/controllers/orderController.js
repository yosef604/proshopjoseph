import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   Post /api/orders
// @access  Privet
export const addOrderItemss = asyncHandler(async (req, res) => {
    const {
        orderItems, 
        shippingAddress,
        paymentMethod, 
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new error('No Order items')
        return
    } else {
        const order = new Order({
            user: req.user,
            orderItems, 
            shippingAddress,
            paymentMethod, 
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const newOrder = await order.save()

        res.status(201).json(newOrder)
    }
})


// @desc    Get an order by id
// @route   GET /api/orders/:id
// @access  Privet
export const getOrderById = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found!')
    }
})