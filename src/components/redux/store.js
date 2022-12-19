import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { addReviewReducer, addWishListReducer, categoryListReducer, currentNameListReducer, getReviewsReducer, productDetailsReducer, productListHotReducer, productListNewReducer, productListPageReducer, productListReducer, productListRelatedReducer, productListSuggestReducer, remarkListReducer, searchProductListReducer, wishListReducer } from "./Reducers/ProductReducers";
import { userLoginReducer, userRegisterReducer,userDetailsReducer, changePasswordReducer, } from "./Reducers/UserReducers";
import { cartReducer } from "./Reducers/CartReducers";
import {  DistrictBillingReducer, DistrictShippingReducer, ProvinceBillingReducer, ProvinceShippingReducer, ProvincesReducer } from "./Reducers/AddressReducer";
import { checkoutReducer, listOrderAllReducer, listOrderCancelReducer, listOrderDeliveringReducer, listOrderProcessingReducer, listOrderUnpaidReducer, paymentCreateReducer } from "./Reducers/CheckoutReducer";
import { addReviewProduct } from "./Actions/ProductActions";

const reducer = combineReducers({
   productListNew: productListNewReducer,
   productListHot: productListHotReducer,
   productList: productListReducer,
   productDetails: productDetailsReducer,
   productListRelated: productListRelatedReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   changePwd: changePasswordReducer,
   productListSuggest: productListSuggestReducer,
   cart: cartReducer,
   categoryList: categoryListReducer,
   currentNameList: currentNameListReducer,
   productListPage: productListPageReducer,
   wishList: wishListReducer,
   addWishList: addWishListReducer,
  provinces: ProvincesReducer,
  provinceShipping: ProvinceShippingReducer,
  districtShipping: DistrictShippingReducer,
  provinceBilling: ProvinceBillingReducer,
  districtBilling: DistrictBillingReducer,
  checkout: checkoutReducer,
  payment:paymentCreateReducer ,
  orderListAll: listOrderAllReducer,
  orderListUnpaid: listOrderUnpaidReducer,
  orderListProcessing: listOrderProcessingReducer,
  orderListDelivering: listOrderDeliveringReducer,
  orderListCancel:listOrderCancelReducer,
  getReviewsProduct:getReviewsReducer,
  addReviewProduct: addReviewReducer
})

//login
const userFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;
//cart 
const cartItemsFromLocalStorage = typeof window !== 'undefined'&& localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: [];

const initialState = {
  userLogin:{user: userFromLocalStorage},
  cart: {
    cartItems: cartItemsFromLocalStorage,
  }
}
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems));
},1000);

export default store