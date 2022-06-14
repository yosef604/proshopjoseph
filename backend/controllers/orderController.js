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

        res.status(201).json(order)
    }
})