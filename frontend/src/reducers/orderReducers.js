import { 
    ORDERS_DETAILS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
    ORDER_USER_LIST_FAIL,
    ORDER_USER_LIST_REQUEST,
    ORDER_USER_LIST_RESET,
    ORDER_USER_LIST_SUCCESS
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }    
    
        default:
            return state
    }
}


export const orderDetailsReducer = (state = 
    {
        orderItems: [], shippingAddress: {}, loading: true
    }, action) => {
        
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
             }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }    
    
        default:
            return state
    }
}


export const orderPayReducer = (state = {}, action) => {
        
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {loading: true}

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }    
        case ORDER_PAY_RESET:
            return {} 
    
        default:
            return state
    }
}


export const orderUserListReducer = (state = {orders: []}, action) => {
        
    switch (action.type) {
        case ORDER_USER_LIST_REQUEST:
            return {loading: true}

        case ORDER_USER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }    
        case ORDER_USER_LIST_RESET:
            return {orders: []}
        default:
            return state
    }
}

export const allOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDERS_DETAILS_REQUEST:
            return {loading: true, orders: []}
        case ORDERS_DETAILS_SUCCESS:
            return {loading: false, orders: action.payload}    
        case ORDERS_DETAILS_FAIL:    
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}