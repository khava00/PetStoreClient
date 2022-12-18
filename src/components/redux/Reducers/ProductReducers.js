import { 
    PRODUCT_LIST_NEW_SUCCESS,
    PRODUCT_LIST_NEW_REQUEST, 
    PRODUCT_LIST_NEW_FAIL,
    PRODUCT_LIST_HOT_REQUEST,
    PRODUCT_LIST_HOT_SUCCESS,
    PRODUCT_LIST_HOT_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_RELATED_FAIL,
    PRODUCT_LIST_RELATED_REQUEST,
    PRODUCT_LIST_RELATED_SUCCESS,
    PRODUCT_LIST_SUGGESTION_REQUEST,
    PRODUCT_LIST_SUGGESTION_SUCCESS,
    PRODUCT_LIST_SUGGESTION_FAIL,
    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,
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
    SEARCH_PRODUCT_LIST_REQUEST,
    SEARCH_PRODUCT_LIST_SUCCESS,
    SEARCH_PRODUCT_LIST_FAIL,
    PRODUCT_GET_REVIEW_REQUEST,
    PRODUCT_GET_REVIEW_SUCCESS,
    PRODUCT_GET_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL
} from "../Constants/ProductConstants"

//productlist
export const productListNewReducer = (state = {productsNew:[]},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_NEW_REQUEST:
            return {...state, loading: true, productsNew: []}
        case PRODUCT_LIST_NEW_SUCCESS:
            return {...state, loading: false, productsNew: action.payload}
        case PRODUCT_LIST_NEW_FAIL:
            return {...state, loading: false, productsNew: action.payload}
        default:
            return state;
    }
}

export const productListHotReducer = (state = { productsHot:[]},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_HOT_REQUEST:
            return {...state, loading: true, productsHot: []}
        case PRODUCT_LIST_HOT_SUCCESS:
            return {...state, loading: false, productsHot: action.payload}
        case PRODUCT_LIST_HOT_FAIL:
            return {...state, loading: false, productsHot: action.payload}
        default:
            return state;
    }
}

export const productListReducer = (state = {products:[]},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {...state, loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {...state, loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {...state, loading: false, products: action.payload}
        default:
            return state;
    }
}

export const productListPageReducer = (state = {products:[]},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_PAGE_REQUEST:
            return {...state, loading: true, products: []}
        case PRODUCT_LIST_PAGE_SUCCESS:
            return {...state, loading: false, products: action.payload}
        case PRODUCT_LIST_PAGE_FAIL:
            return {...state, loading: false, products: action.payload}
        default:
            return state;
    }
}

export const productListRelatedReducer = (state = {productsRelated:[]},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_RELATED_REQUEST:
            return {...state, loading: true, productsRelated: []}
        case PRODUCT_LIST_RELATED_SUCCESS:
            return {...state, loading: false, productsRelated: action.payload}
        case PRODUCT_LIST_RELATED_FAIL:
            return {...state, loading: false, productsRelated: action.payload}
        default:
            return state;
    }
}


//details product
export const productDetailsReducer = (state = {product:{}},action) =>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {...state, loading: true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, product: action.payload}
        default:
            return state;
    }
}

// details product
export const productListSuggestReducer = (state = {},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_SUGGESTION_REQUEST:
            return {...state, loadingListSuggest: true}
        case PRODUCT_LIST_SUGGESTION_SUCCESS:
            const item = action.payload.content?.length
            return {loadingListSuggest: false, products: action.payload}
        case PRODUCT_LIST_SUGGESTION_FAIL:
            return {loadingListSuggest: false, error: action.payload}
        default:
            return state;
    }
}
//get reviews
export const getReviewsReducer = (state = {},action) =>{
    switch (action.type) {
        case PRODUCT_GET_REVIEW_REQUEST:
            return {...state, loading: true}
        case PRODUCT_GET_REVIEW_SUCCESS:
            return {loading: false, reviews: action.payload}
        case PRODUCT_GET_REVIEW_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}
//add review product
export const addReviewReducer = (state = {review:[]},action) =>{
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return{...state,loading:true,review:[]}
        case PRODUCT_CREATE_REVIEW_SUCCESS:       
            return  {...state, loading: false, review: action.payload} 
            case PRODUCT_CREATE_REVIEW_FAIL:
                return {...state, loading: false, review: action.payload}    
        default:
            return state;
    }
}

// list category
export const categoryListReducer = (state = {},action) =>{
    switch (action.type) {
        case PRODUCT_CATEGORY_REQUEST:
            return {...state, loading: true}
        case PRODUCT_CATEGORY_SUCCESS:
            return {loading: false, categories: action.payload}
        case PRODUCT_CATEGORY_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

// list category
export const currentNameListReducer = (state = {},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_NAME_REQUEST:
            return {...state, loading: true}
        case PRODUCT_LIST_NAME_SUCCESS:
            return {loading: false, name: action.payload}
        case PRODUCT_LIST_NAME_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}
//wish list
export const wishListReducer = (state = {products:[]},action) =>{
    switch (action.type) {
        case PRODUCT_WISH_LIST_REQUEST:
            return {...state, loading: true, products: []}
        case PRODUCT_WISH_LIST_SUCCESS:
            return {...state, loading: false, products: action.payload}
        case PRODUCT_WISH_LIST_FAIL:
            return {...state, loading: false, products: action.payload}
        default:
            return state;
    }
}

export const addWishListReducer = (state = {products:[]},action) =>{
    switch (action.type) {
        case ADD_PRODUCT_WISH_LIST_REQUEST:
            return{...state,loading:true,products:[]}
        case ADD_PRODUCT_WISH_LIST_SUCCESS: 
                  
            return  {...state, loading: false, products: action.payload} 
            case ADD_PRODUCT_WISH_LIST_FAIL:
                return {...state, loading: false, products: action.payload}    
        default:
            return state;
    }
}

