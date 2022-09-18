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

export const listProduct = (type, breedId, categoryId, pageNumber, pageSize) => async(dispatch) =>{
    try {
        dispatch({type: (breedId !== 0 || (breedId === 0 && !array.includes(categoryId)))
                        ? PRODUCT_LIST_RELATED_REQUEST
                        : categoryId === 1 
                        ? PRODUCT_LIST_NEW_REQUEST 
                        : categoryId === 2 
                        ? PRODUCT_LIST_HOT_REQUEST 
                        : PRODUCT_LIST_REQUEST})

        const res = await axiosClient.get(`/product/list?type=${type}&breed-id=${breedId}&category-id=${categoryId}&page-number=${pageNumber}&page-size=${pageSize}`)
        // console.log(res.data.data.content)
        dispatch({type:  (breedId !== 0 || (breedId === 0 && !array.includes(categoryId)))
                        ? PRODUCT_LIST_RELATED_SUCCESS
                        : categoryId === 1 
                        ? PRODUCT_LIST_NEW_SUCCESS 
                        : categoryId === 2 
                        ? PRODUCT_LIST_HOT_SUCCESS 
                        : PRODUCT_LIST_SUCCESS, payload: res.data.data.content })
    } catch (error) {
        dispatch({
            type:  (breedId !== 0 || (breedId === 0 && !array.includes(categoryId)))
                    ? PRODUCT_LIST_RELATED_FAIL
                    : categoryId === 1 
                    ? PRODUCT_LIST_NEW_FAIL 
                    : categoryId === 2 
                    ? PRODUCT_LIST_HOT_FAIL 
                    : PRODUCT_LIST_FAIL,
            payload: error.errorMessage
        })
    }
}

export const convertURL= (str)=>{
    // Chuyển hết sang chữ thường
    str = str?.toLowerCase();     
 
    // xóa dấu
    str = str?.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str?.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str?.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str?.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str?.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str?.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str?.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str?.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str?.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str?.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str?.replace(/-+$/g, '');
 
    // return
    return str;
}

//details product
export const listProductDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const res = await axiosClient.get(`/product/detail?id=${id}`)
      
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: res.data.data})
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

// search product
export const listProductSuggest = (text, pageNumber, pageSize) => async(dispatch) =>{
    try {
        dispatch({ type: PRODUCT_LIST_SUGGESTION_REQUEST })

        const res = await axiosClient.get(`/product/search-text?text=${text}&page-number=${pageNumber}&page-size=${pageSize}`)

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

        const res = await axiosClient.get(`/common/list/breed?category-id=${categoryId}`);

        setContent(res.data.data);

        dispatch({ type: PRODUCT_BREED_SUCCESS, payload: res.data.data})

    } catch (error) {
        dispatch({
            type: PRODUCT_BREED_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}

export const listProductPage = (type, breedId, categoryId, pageNumber, pageSize) => async(dispatch) =>{
    try {
        dispatch({type: PRODUCT_LIST_PAGE_REQUEST})

        const res = await axiosClient.get(`/product/list?type=${type}&breed-id=${breedId}&category-id=${categoryId}&page-number=${pageNumber}&page-size=${pageSize}`)
        
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

        const res = await axiosClient.get(`/user/wish-list?page-number=${pageNumber}&page-size=${pageSize}`)
        dispatch({type: PRODUCT_WISH_LIST_SUCCESS, payload: res.data.data })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_WISH_LIST_FAIL,
            payload: error.errorMessage
        })
    }
    localStorage.setItem("products", JSON.stringify(getState().wishList.products));
    
}

export const addWishListProductPage = (productId)=> async(dispatch,getState) =>{

    try {
        dispatch({type:ADD_PRODUCT_WISH_LIST_REQUEST})
        const res = await axiosClient.post(`/user/wish-list?product-id=${productId}`)
        dispatch({type: ADD_PRODUCT_WISH_LIST_SUCCESS, payload: res.data.data })
        toast.success("")
        localStorage.setItem("products", JSON.stringify(getState().wishList.products));
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
//         toast.success("Đánh giá sản phẩm thành công")
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