import {PROVINCES_SUCCESS,PROVINCES_REQUEST,PROVINCES_FAIL,DISTRICT_SHIPPING_FAIL,DISTRICT_SHIPPING_REQUEST,DISTRICT_SHIPPING_SUCCESS, PROVINCE_SHIPPING_REQUEST, PROVINCE_SHIPPING_SUCCESS, PROVINCE_SHIPPING_FAIL, PROVINCE_BILLING_REQUEST, PROVINCE_BILLING_SUCCESS, PROVINCE_BILLING_FAIL, DISTRICT_BILLING_REQUEST, DISTRICT_BILLING_SUCCESS, DISTRICT_BILLING_FAIL } from "../Constants/AddressContants";

export const ProvincesReducer = (state = {data:[]},action) =>{
    switch (action.type) {
        case PROVINCES_REQUEST:
            return {...state, loading: true, data: []}
        case PROVINCES_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case PROVINCES_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state;
    }
}
export const ProvinceShippingReducer = (state = {data:{}},action) =>{
    switch (action.type) {
        case PROVINCE_SHIPPING_REQUEST:
            return {...state, loading: true, data: {}}
        case PROVINCE_SHIPPING_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case PROVINCE_SHIPPING_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state;
    }
}
export const DistrictShippingReducer = (state = {data:{}},action) =>{
    switch (action.type) {
        case DISTRICT_SHIPPING_REQUEST:
            return {...state, loading: true, data: {}}
        case DISTRICT_SHIPPING_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case DISTRICT_SHIPPING_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state;
    }
}

export const ProvinceBillingReducer = (state = {data:{}},action) =>{
    switch (action.type) {
        case PROVINCE_BILLING_REQUEST:
            return {...state, loading: true, data: {}}
        case PROVINCE_BILLING_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case PROVINCE_BILLING_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state;
    }
}
export const DistrictBillingReducer = (state = {data:{}},action) =>{
    switch (action.type) {
        case DISTRICT_BILLING_REQUEST:
            return {...state, loading: true, data: {}}
        case DISTRICT_BILLING_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case DISTRICT_BILLING_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state;
    }
}