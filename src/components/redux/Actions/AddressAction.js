import axios from "axios"
import {PROVINCES_SUCCESS,PROVINCES_REQUEST,PROVINCES_FAIL,DISTRICT_SHIPPING_FAIL,DISTRICT_SHIPPING_REQUEST,DISTRICT_SHIPPING_SUCCESS, PROVINCE_SHIPPING_REQUEST, PROVINCE_SHIPPING_SUCCESS, PROVINCE_SHIPPING_FAIL, PROVINCE_BILLING_REQUEST, PROVINCE_BILLING_SUCCESS, PROVINCE_BILLING_FAIL, DISTRICT_BILLING_REQUEST, DISTRICT_BILLING_SUCCESS, DISTRICT_BILLING_FAIL } from "../Constants/AddressContants";

export const listProvince = () => async(dispatch) =>{
    try {
        dispatch({type: PROVINCES_REQUEST})

        const {data} = await axios.get("https://provinces.open-api.vn/api/p/")

        dispatch({type: PROVINCES_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type:PROVINCES_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

export const getProvinceShipping = (code) => async(dispatch) =>{
    try {
        dispatch({type: PROVINCE_SHIPPING_REQUEST})

        const {data} = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)

        dispatch({type:PROVINCE_SHIPPING_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type:PROVINCE_SHIPPING_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

export const getDistrictShipping = (code) => async(dispatch) =>{
    try {
        dispatch({type: DISTRICT_SHIPPING_REQUEST})

        const {data} = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)

        dispatch({type:DISTRICT_SHIPPING_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type:DISTRICT_SHIPPING_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}
export const getProvinceBilling = (code) => async(dispatch) =>{
    try {
        dispatch({type: PROVINCE_BILLING_REQUEST})

        const {data} = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)

        dispatch({type:PROVINCE_BILLING_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type:PROVINCE_BILLING_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

export const getDistrictBilling = (code) => async(dispatch) =>{
    try {
        dispatch({type: DISTRICT_BILLING_REQUEST})

        const {data} = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)

        dispatch({type:DISTRICT_BILLING_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type:DISTRICT_BILLING_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}