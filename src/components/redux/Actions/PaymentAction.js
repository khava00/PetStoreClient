import { CANCEL_ORDER_FAIL, CANCEL_ORDER_SUCCESS, CHECKOUT_FAIL, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, ORDER_LIST_ALL_FAIL, ORDER_LIST_ALL_REQUEST, ORDER_LIST_ALL_SUCCESS, ORDER_LIST_CANCEL_FAIL, ORDER_LIST_CANCEL_REQUEST, ORDER_LIST_CANCEL_SUCCESS, ORDER_LIST_DELIVERING_FAIL, ORDER_LIST_DELIVERING_REQUEST, ORDER_LIST_DELIVERING_SUCCESS, ORDER_LIST_PROCESSING_FAIL, ORDER_LIST_PROCESSING_REQUEST, ORDER_LIST_PROCESSING_SUCCESS, ORDER_LIST_UNPAID_FAIL, ORDER_LIST_UNPAID_REQUEST, ORDER_LIST_UNPAID_SUCCESS, PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS } from "../Constants/PaymentConstant";
import { axiosClient } from './../../services/api';
import * as cryptojs from 'crypto-js';
import { toast } from 'react-hot-toast';
import { CANCEL_ORDER_REQUEST } from './../Constants/PaymentConstant';

export const createPayment = (amount, paymentMethod, orderTrackingNumber, isPlaceOrder) => async (dispatch) => {
  dispatch({ type: PAYMENT_REQUEST });
  
  try {
    const response = await axiosClient.post(paymentMethod === "Momo" ? `/pay/momo?amount=${amount}&orderTrackingNumber=${orderTrackingNumber}` : `/pay/paypal?amount=${amount * 0.00004263}&orderTrackingNumber=${orderTrackingNumber}`).then(res => {
      console.log(res)
      if (isPlaceOrder) {
        setTimeout(() => {
          window.open(res.data, '_blank').focus();
          dispatch({ type: PAYMENT_SUCCESS, payload: res });
          localStorage.removeItem("cartItems");
          window.location.href = "/";
        }, 5000)
      } else {
        window.open(res.data, '_blank').focus();
        dispatch({ type: PAYMENT_SUCCESS, payload: res });
      }
      
    });
  } catch (error) {
    console.log(error)
    dispatch({ type: PAYMENT_FAIL, payload: error.response });
  }
};

export const checkout = ( order, orderItems) => async (dispatch) => {
  dispatch({ type: CHECKOUT_REQUEST });
  try {
    const response = await axiosClient.post('/checkout/purchase', {
      "order": order,
      "orderItems": orderItems
     });
     dispatch({ type: CHECKOUT_SUCCESS, payload: response.data.data });
     toast.success("Đặt hàng thành công");
  } catch (error) {
    dispatch({ type: CHECKOUT_FAIL, payload: error.response });
  }
}

export const cancelOrder = (orderTrackingNumber) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQUEST });
  try {
    const response = await axiosClient.put(`/order/cancel?orderTrackingNumber=${orderTrackingNumber}`);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: response.data.data });
    toast.success("Hủy đặt hàng thành công");
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAIL, payload: error.response });
  }
}

export const getOrderListAll = (pageNumber, pageSize) => async (dispatch) => {
  dispatch({ type: ORDER_LIST_ALL_REQUEST });
  try {
    const response = await axiosClient.get(`/user/order?orderStatus=0&pageNumber=${pageNumber}&pageSize=${pageSize}`);

    dispatch({ type: ORDER_LIST_ALL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_ALL_FAIL, payload: error.response });
  }
}

export const getOrderListUnpaid = (pageNumber, pageSize) => async (dispatch) => {
  dispatch({ type: ORDER_LIST_UNPAID_REQUEST });
  try {
    const response = await axiosClient.get(`/user/order?orderStatus=1&pageNumber=${pageNumber}&pageSize=${pageSize}`);

    dispatch({ type: ORDER_LIST_UNPAID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_UNPAID_FAIL, payload: error.response });
  }
}

export const getOrderListProcessing = (pageNumber, pageSize) => async (dispatch) => {
  dispatch({ type: ORDER_LIST_PROCESSING_REQUEST });
  try {
    const response = await axiosClient.get(`/user/order?orderStatus=2&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    
    dispatch({ type: ORDER_LIST_PROCESSING_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_PROCESSING_FAIL, payload: error.response });
  }
}

export const getOrderListDelivering = (pageNumber, pageSize) => async (dispatch) => {
  dispatch({ type: ORDER_LIST_DELIVERING_REQUEST });
  try {
    const response = await axiosClient.get(`/user/order?orderStatus=3&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    
    dispatch({ type: ORDER_LIST_DELIVERING_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_DELIVERING_FAIL, payload: error.response });
  }
}

export const getOrderListCancel = (pageNumber, pageSize) => async (dispatch) => {
  dispatch({ type: ORDER_LIST_CANCEL_REQUEST });
  try {
    const response = await axiosClient.get(`/user/order?orderStatus=5&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    
    dispatch({ type: ORDER_LIST_CANCEL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_CANCEL_FAIL, payload: error.response });
  }
}