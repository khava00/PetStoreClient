import { CHECKOUT_FAIL, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, ORDER_LIST_ALL_FAIL, ORDER_LIST_ALL_REQUEST, ORDER_LIST_ALL_SUCCESS, ORDER_LIST_CANCEL_FAIL, ORDER_LIST_CANCEL_REQUEST, ORDER_LIST_CANCEL_SUCCESS, ORDER_LIST_DELIVERING_FAIL, ORDER_LIST_DELIVERING_REQUEST, ORDER_LIST_DELIVERING_SUCCESS, ORDER_LIST_PROCESSING_FAIL, ORDER_LIST_PROCESSING_REQUEST, ORDER_LIST_PROCESSING_SUCCESS, ORDER_LIST_UNPAID_FAIL, ORDER_LIST_UNPAID_REQUEST, ORDER_LIST_UNPAID_SUCCESS } from "../Constants/PaymentConstant";


export const checkoutReducer = (state = {},action) =>{
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return {...state, loading: true, ordered: {}}
        case CHECKOUT_SUCCESS:
            return {...state, loading: false, ordered: action.payload, error: ""}
        case CHECKOUT_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const listOrderAllReducer = (state = {},action) =>{
    switch (action.type) {
        case ORDER_LIST_ALL_REQUEST:
            return {...state, loading: true, orderedList: {}}
        case ORDER_LIST_ALL_SUCCESS:
            return {...state, loading: false, orderedList: action.payload, error: ""}
        case ORDER_LIST_ALL_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const listOrderUnpaidReducer = (state = {},action) =>{
    switch (action.type) {
        case ORDER_LIST_UNPAID_REQUEST:
            return {...state, loading: true, orderedList: {}}
        case ORDER_LIST_UNPAID_SUCCESS:
            return {...state, loading: false, orderedList: action.payload, error: ""}
        case ORDER_LIST_UNPAID_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const listOrderProcessingReducer = (state = {},action) =>{
    switch (action.type) {
        case ORDER_LIST_PROCESSING_REQUEST:
            return {...state, loading: true, orderedList: {}}
        case ORDER_LIST_PROCESSING_SUCCESS:
            return {...state, loading: false, orderedList: action.payload, error: ""}
        case ORDER_LIST_PROCESSING_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const listOrderDeliveringReducer = (state = {},action) =>{
    switch (action.type) {
        case ORDER_LIST_DELIVERING_REQUEST:
            return {...state, loading: true, orderedList: {}}
        case ORDER_LIST_DELIVERING_SUCCESS:
            return {...state, loading: false, orderedList: action.payload, error: ""}
        case ORDER_LIST_DELIVERING_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const listOrderCancelReducer = (state = {},action) =>{
    switch (action.type) {
        case ORDER_LIST_CANCEL_REQUEST:
            return {...state, loading: true, orderedList: {}}
        case ORDER_LIST_CANCEL_SUCCESS:
            return {...state, loading: false, orderedList: action.payload, error: ""}
        case ORDER_LIST_CANCEL_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}