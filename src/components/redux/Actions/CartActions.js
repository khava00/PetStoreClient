import { axiosClient } from "../../services/api";
import { CART_ADD_ITEM, CART_REMOVE_ITEM,DECREASE_QUANTITY,GET_NUMBER_CART, INCREASE_QUANTITY } from "../Constants/CartContants";
import toast from 'react-hot-toast';
export const addToCart = (id, qty) => async(dispatch, getState) => {
    const res = await axiosClient.get(`/product/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                id: res.data.data.id,
                name: res.data.data.name,
                price: res.data.data.price,
                imagePath:res.data.data.imagePath[0] ,
                amountInStock: res.data.data.amountInStock,
                qty,
            },
        });   
        
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const increaseQuantity=(index) => (dispatch) => {
    dispatch({
        type: INCREASE_QUANTITY,
        payload: index
    });
}
export const decreaseQuantity=(index) => (dispatch) => {
    dispatch({
        type: DECREASE_QUANTITY,
        payload: index
    });
}

export const removeFromCart = (id) => (dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    toast.success("Sản phẩm đã được xóa")
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const GetNumberCart = () =>{
    return{
        type:GET_NUMBER_CART
    }
}