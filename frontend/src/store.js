import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { getTopProductsReducer, productCreateReducer, productCreateReviewReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { userDeleteReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, usersListReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers'
import { allOrdersReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderPayReducer, orderUserListReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderUserList: orderUserListReducer,
    usersList: usersListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    allOrders: allOrdersReducer,
    orderDeliver: orderDeliverReducer,
    productCreateReview: productCreateReviewReducer,
    getTopProducts: getTopProductsReducer
}) 

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store