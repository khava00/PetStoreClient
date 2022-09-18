import toast from "react-hot-toast";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, INCREASE_QUANTITY,DECREASE_QUANTITY,GET_NUMBER_CART } from "../Constants/CartContants";

export const cartReducer = (state = {cartItems:[]}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);
            if (existItem) {
                if (existItem.qty < existItem.amount) {
                    item.qty=Number(item.qty)+Number(existItem.qty)
                    toast.success("Sản phẩm đã thêm vào giỏ hàng")
                } else {
                    toast.error("Số lượng đã đạt tối đa")
                    item.qty=Number(existItem.qty)
                }
                return {
                    ...state,
                    loading: false,
                    cartItems: state.cartItems.map((x) => x.id === existItem.id ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    cartItems: [...state.cartItems, item],
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.id !== action.payload)
            };
        case INCREASE_QUANTITY:
                state.cartItems[action.payload].qty++;
            return{
                ...state
            }
        case DECREASE_QUANTITY:
            let qty = state.cartItems[action.payload]?.qty;
            if (qty > 1) {
                state.numberCart--;
                state.cartItems[action.payload].qty--;
            }
            return {
                ...state,
            };
            case GET_NUMBER_CART:
                return {
                    ...state,
                };
        default:
            return state;
    }
}