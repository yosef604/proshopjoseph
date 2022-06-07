import { CART_ADD_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(i => i.product_id === item.product_id)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product_id === existItem.product_id ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state    
    }
}