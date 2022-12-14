import toast from "react-hot-toast";
import { axiosClient } from "../../services/api";
import { CART_ADD_ITEM } from "../Constants/CartContants";
import { 
    PRODUCT_LIST_NEW_FAIL, 
    PRODUCT_LIST_NEW_REQUEST, 
    PRODUCT_LIST_NEW_SUCCESS,
    PRODUCT_LIST_HOT_FAIL, 
    PRODUCT_LIST_HOT_REQUEST, 
    PRODUCT_LIST_HOT_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_RELATED_SUCCESS,
    PRODUCT_LIST_RELATED_FAIL,
    PRODUCT_LIST_RELATED_REQUEST,
    PRODUCT_LIST_SUGGESTION_REQUEST,
    PRODUCT_LIST_SUGGESTION_SUCCESS,
    PRODUCT_LIST_SUGGESTION_FAIL,
    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_BREED_REQUEST,
    PRODUCT_BREED_SUCCESS,
    PRODUCT_BREED_FAIL,
    PRODUCT_LIST_NAME_REQUEST,
    PRODUCT_LIST_NAME_SUCCESS,
    PRODUCT_LIST_NAME_FAIL,
    PRODUCT_LIST_PAGE_REQUEST,
    PRODUCT_LIST_PAGE_SUCCESS,
    PRODUCT_LIST_PAGE_FAIL,
    PRODUCT_WISH_LIST_REQUEST,
    PRODUCT_WISH_LIST_SUCCESS,
    PRODUCT_WISH_LIST_FAIL,
    ADD_PRODUCT_WISH_LIST,
    ADD_PRODUCT_WISH_LIST_FAIL,
    ADD_PRODUCT_WISH_LIST_SUCCESS,
    ADD_PRODUCT_WISH_LIST_REQUEST,
    PRODUCT_GET_REVIEW_REQUEST,
    PRODUCT_GET_REVIEW_SUCCESS,
    PRODUCT_GET_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    // ADD_REMARK_REQUEST,
    // ADD_REMARK_SUCCESS,
    // ADD_REMARK_FAIL,
    // REMARK_LIST_FAIL,
    // REMARK_LIST_SUCCESS,
    // REMARK_LIST_REQUEST,

} from "../Constants/ProductConstants"

const array = [
    0,
    1,
    2
]

export const listProduct = (type, pageNumber, pageSize) => async(dispatch) =>{
    try {
        dispatch({type: (type==="cat")?PRODUCT_LIST_NEW_REQUEST:(type==="dog")?PRODUCT_LIST_HOT_REQUEST:PRODUCT_LIST_REQUEST})

        const res = await axiosClient.get(`/product/${type}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        
        dispatch({type: (type==="cat")?PRODUCT_LIST_NEW_SUCCESS:(type==="dog")?PRODUCT_LIST_HOT_SUCCESS:PRODUCT_LIST_SUCCESS, payload: res.data.data.content })
    } catch (error) {
        console.log(error)
        dispatch({
            type:   PRODUCT_LIST_FAIL,
            payload: error.errorMessage
        })
    }
}

export const convertURL= (str)=>{
    // Chuy???n h???t sang ch??? th?????ng
    str = str?.toLowerCase();     
 
    // x??a d???u
    str = str?.replace(/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/g, 'a');
    str = str?.replace(/(??|??|???|???|???|??|???|???|???|???|???)/g, 'e');
    str = str?.replace(/(??|??|???|???|??)/g, 'i');
    str = str?.replace(/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/g, 'o');
    str = str?.replace(/(??|??|???|???|??|??|???|???|???|???|???)/g, 'u');
    str = str?.replace(/(???|??|???|???|???)/g, 'y');
    str = str?.replace(/(??)/g, 'd');
 
    // X??a k?? t??? ?????c bi???t
    str = str?.replace(/([^0-9a-z-\s])/g, '');
 
    // X??a kho???ng tr???ng thay b???ng k?? t??? -
    str = str?.replace(/(\s+)/g, '-');
 
    // x??a ph???n d??? - ??? ?????u
    str = str?.replace(/^-+/g, '');
 
    // x??a ph???n d?? - ??? cu???i
    str = str?.replace(/-+$/g, '');
 
    // return
    return str;
}

//details product
export const listProductDetails = (id) => async(dispatch) =>{
    console.log(id)
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const res = await axiosClient.get(`/product/${id}`)
      
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: res.data.data})
    } catch (error) {
        console.log(error)
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}
//getReviews
export const getReviewsProduct = (id,pageNumber,pageSize)=> async(dispatch,getState) =>{
    try {
        dispatch({type: PRODUCT_GET_REVIEW_REQUEST})

        const res = await axiosClient.get(`/product/remark?productId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        dispatch({type: PRODUCT_GET_REVIEW_SUCCESS, payload: res.data.data })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_GET_REVIEW_FAIL,
            payload: error.response.message
        })
    }
    
}
//addReview
export const addReviewProduct = (productId,remark,rate)=> async(dispatch,getState) =>{

    try {
        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})
        const res = await axiosClient.post(`/product/remark`,{productId,remark,rate})
        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: res.data.data })
        toast.success("???? b??nh lu???n")
        setTimeout(() => {
            window.location.reload();
        }, 1000)
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.errorMessage
        })
    }
   
}
// search product
export const listProductSuggest = (text, pageNumber, pageSize) => async(dispatch) =>{
    try {
        dispatch({ type: PRODUCT_LIST_SUGGESTION_REQUEST })

        const res = await axiosClient.get(`/product/search/${text}?pageNumber=${pageNumber}&pageSize=${pageSize}`)

        dispatch({ type: PRODUCT_LIST_SUGGESTION_SUCCESS, payload: res.data.data})

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_SUGGESTION_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

// get all category 
export const listCategory = () => async(dispatch) =>{
    try {
        dispatch({ type: PRODUCT_CATEGORY_REQUEST })

        const res = await axiosClient.get(`/common/list/category`)

        dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: res.data.data})

    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

// get all breed 
export const listBreed = (categoryId, setContent) => async(dispatch) =>{
    try {
        dispatch({ type: PRODUCT_BREED_REQUEST })

        const res = await axiosClient.get(`/common/list/breed?categoryId=${categoryId}`);
        
        setContent(res.data.data);

        dispatch({ type: PRODUCT_BREED_SUCCESS, payload: res.data.data})

    } catch (error) {
        dispatch({
            type: PRODUCT_BREED_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

export const listProductPage = (breedId, categoryId, pageNumber, pageSize) => async(dispatch) =>{
    try {
        dispatch({type: PRODUCT_LIST_PAGE_REQUEST})

        const res = await axiosClient.get(`/product/${categoryId}/${breedId}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`)

        dispatch({type: PRODUCT_LIST_PAGE_SUCCESS,  payload: res.data.data })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_PAGE_FAIL,
            payload: error.errorMessage
        })
    }
}

export const getCurrentListName = (name) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_NAME_REQUEST})

        dispatch({type: PRODUCT_LIST_NAME_SUCCESS, payload: name })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_NAME_FAIL,
            payload: error.errorMessage
        })
    }
}
//wishlist
export const WishListProductPage = (pageNumber,pageSize)=> async(dispatch,getState) =>{
    try {
        dispatch({type: PRODUCT_WISH_LIST_REQUEST})

        const res = await axiosClient.get(`/product/wish-list?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        dispatch({type: PRODUCT_WISH_LIST_SUCCESS, payload: res.data.data })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_WISH_LIST_FAIL,
            payload: error.errorMessage
        })
    }
    
}


export const addWishListProductPage = (productId)=> async(dispatch,getState) =>{

    try {
        dispatch({type:ADD_PRODUCT_WISH_LIST_REQUEST})
        const res = await axiosClient.put(`/product/wish-list?productId=${productId}`)
        dispatch({type: ADD_PRODUCT_WISH_LIST_SUCCESS, payload: res.data.data })
        toast.success("Th??m th??nh c??ng")
        setTimeout(() => {
            window.location.reload();
        }, 1000)
        
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_WISH_LIST_FAIL,
            payload: error.errorMessage
        })
    }
   
}

// export const addRemark = (data) => async(dispatch) =>{
//     try {
//         dispatch({type: ADD_REMARK_REQUEST})
//         const res = await axiosClient.post(`/user/remark`, data)
//         dispatch({type: ADD_REMARK_SUCCESS, payload: res.data.data })
//         toast.success("????nh gi?? s???n ph???m th??nh c??ng")
//     } catch (error) {
//         dispatch({
//             type: ADD_REMARK_FAIL,
//             payload: error.errorMessage
//         })
//     }
// }

// export const getRemarkList = (productId) => async(dispatch) => {
//     try {
//         dispatch({type: REMARK_LIST_REQUEST})
//         const res = await axiosClient.get(`/product/remark/list?id=${productId}`)
//         dispatch({type: REMARK_LIST_SUCCESS, payload: res.data.data })
//     } catch (error) {
//         dispatch({
//             type: REMARK_LIST_FAIL,
//             payload: error.errorMessage
//         })
//     }
// }