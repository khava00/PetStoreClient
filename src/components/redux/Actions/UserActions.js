import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,REFRESH_TOKEN, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS,USER_DETAIL_FAIL,USER_DETAIL_REQUEST,USER_DETAIL_SUCCESS, USER_UPDATE_AVATAR_REQUEST, USER_UPDATE_AVATAR_SUCCESS, USER_UPDATE_AVATAR_FAIL, USER_UPDATE_INFORMATION_REQUEST, USER_UPDATE_INFORMATION_SUCCESS, USER_UPDATE_INFORMATION_FAIL, USER_CHANGE_PASSWORD_REQUEST, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_FAIL } from "../Constants/UserConstants"
import { axiosClient } from "../../services/api"
import toast from 'react-hot-toast';
//login
export const login = (username,password) => async(dispatch) =>{
    try {
        dispatch({type:USER_LOGIN_REQUEST})
        const res = await axiosClient.post(`/user/login`,{username,password})

        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data.data})
        toast.success("Đăng nhập thành công");
        localStorage.setItem("user",JSON.stringify(res.data.data))
        
    } catch (error) {
        console.log(error)
        toast.error(error.errorMessage);
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response && error.response.data.errorMessage ? error.response.data.errorMessage : error.message
        })
        
    }
}
//user details
export const getUserDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:USER_DETAIL_REQUEST})

        const res = await axiosClient.get(`/user/profiles?userId=${id}`)

        dispatch({type: USER_DETAIL_SUCCESS, payload: res.data.data})
       
    } catch (error) {
        dispatch({
            type:USER_DETAIL_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message
        })
    }
}
//register
export const register = (email, username, password) => async(dispatch) =>{
    try {
        dispatch({type:USER_REGISTER_REQUEST})

        const res = await axiosClient.post(`/user/register`,{username, email, password})

        dispatch({type: USER_REGISTER_SUCCESS, payload: res.data.data})
        toast.success("Đăng ký thành công.");
    } catch (error) {
        
        toast.error(error.response.data.errorMessage);
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.errorMessage ? error.response.data.errorMessage : error.message
        })
        
    }
}

//logout
export const logout = () => (dispatch) => {
   
    window.location.href = "/"; 
    dispatch({type: USER_LOGOUT})
    localStorage.clear();    
    
}

//refresh token
export const refreshToken = (accessToken) => (dispatch) => {
    dispatch({
      type: REFRESH_TOKEN,
      payload: accessToken,
    })
}

// update avatar
export const updateProfileImage = (imageFile) => async(dispatch) =>{
    try {
        dispatch({type:USER_UPDATE_AVATAR_REQUEST})

        const res = await axiosClient.post(`/user/upload-profile-image`,imageFile)
        dispatch({type: USER_UPDATE_AVATAR_SUCCESS, payload: res.data.data})
        toast.success("Thay đổi ảnh thành công.");

        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(getUserDetails(user.id))
        user.avatarImg = res.data.data;
        localStorage.setItem("user",JSON.stringify(user))

    } catch (error) {
        console.log(error)
        toast.error(error.response.data.errorMessage);
        dispatch({
            type:USER_UPDATE_AVATAR_FAIL,
            payload: error.response && error.response.data.errorMessage ? error.response.data.errorMessage : error.message
        })
    }
}

// update user profile
export const updateProfileUser = (userInfo, data) => async(dispatch) =>{
    try {
        dispatch({type:USER_UPDATE_INFORMATION_REQUEST})

        const res = await axiosClient.put(`/user/profiles`, {
            "userId": userInfo.userId,
            "username": userInfo.username,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "phone": data.phone,
            "email": data.email,
        })
        dispatch({type: USER_UPDATE_INFORMATION_SUCCESS, payload: res.data.data})
        toast.success("Chỉnh sửa thông tin thành công.");

        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(getUserDetails(user.id))
        localStorage.setItem("user",JSON.stringify(user))

    } catch (error) {
        toast.error(error.response.data.errorMessage);
        dispatch({
            type:USER_UPDATE_INFORMATION_FAIL,
            payload: error.response && error.response.data.errorMessage ? error.response.data.errorMessage : error.message
        })
    }
}

// change password
export const changePassword = (username, oldPassword, newPassword) => async(dispatch) =>{
    try {
        dispatch({type:USER_CHANGE_PASSWORD_REQUEST})

        const res = await axiosClient.put(`/user/password`, {
            "username": username,
            "oldPassword": oldPassword,
            "newPassword": newPassword,
        })
        dispatch({type: USER_CHANGE_PASSWORD_SUCCESS, payload: res.data.data})
        toast.success("Đổi mật khẩu thành công.");

    } catch (error) {
        toast.error(error.response.data.errorMessage);
        dispatch({
            type:USER_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.errorMessage ? error.response.data.errorMessage : error.message
        })
    }
}