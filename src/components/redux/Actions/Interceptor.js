import TokenService from "../../services/token.service";
import { axiosClient } from "../../services/api";
import { logout, refreshToken } from './UserActions';

const setup = (store) => {
  axiosClient.interceptors.request.use( 
    async (config) => {
      const token = await TokenService.getLocalAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { dispatch } = store;
  axiosClient.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await axiosClient.post('/user/refresh-token', {
              refreshToken: TokenService.getLocalRefreshToken(),
              accessToken: TokenService.getLocalAccessToken()
            });
            const { accessToken } = rs.data;
            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);
            localStorage.setItem("refreshToken", JSON.stringify(accessToken));
            return axiosClient(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        } else if (err.response.status === 500 && !isPublic){
          console.log(err.response.data)
          dispatch(logout());
          }
        }
      return Promise.reject(err);
    }
  );
}
  
 export default setup