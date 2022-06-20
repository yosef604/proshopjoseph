import axios from 'axios'
import { 
    ORDERS_DETAILS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_SUCCESS,
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DELIVER_FAIL, 
    ORDER_DELIVER_REQUEST, 
    ORDER_DELIVER_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_USER_LIST_FAIL,
    ORDER_USER_LIST_REQUEST,
    ORDER_USER_LIST_SUCCESS
} from "../constants/orderConstants"

export const orderCreateAction = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const orderDetailsAction = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const payOrderAction = (id, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const deliverOrderAction = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const orderUserListAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_USER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        } 
        
        const {data} = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: ORDER_USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const allOrdersAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDERS_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        } 
        
        const {data} = await axios.get(`/api/orders`, config)

        dispatch({
            type: ORDERS_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDERS_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}