import axios from "axios"
import { CART_ADD_ITEM } from "../constants/cartConstants"

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product_id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty

        }
    })

    localStorage.setItem('CartItems', JSON.stringify(
        getState().cart.cartItems
    ))
}