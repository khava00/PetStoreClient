import { useEffect } from 'react'
import Navbar from './Navbar';
import Search from './Search';
import "./Header.css"
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '../../components/redux/Actions/UserActions';
import { listCategory } from '../../components/redux/Actions/ProductActions';
import { listProvince } from '../../components/redux/Actions/AddressAction';
const Header = () => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const dispatch = useDispatch(); 
  const location = useLocation();

  useEffect(() => {
    dispatch(listCategory());
    dispatch(listProvince())
  }, [])

  useEffect(()=> {
      // const user = JSON.parse(localStorage.getItem("user"));
      if (JSON.parse(localStorage.getItem("refreshToken")) !== undefined && localStorage.getItem("refreshToken") !== undefined ) {
        const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
        const decodedJwt = parseJwt(refreshToken);
        if (decodedJwt?.exp * 1000 <= Date.now()) {
          dispatch(logout());
        }
      }
  },[dispatch, location])

  return (
      <>
           <Search/>
           <Navbar/>
      </>
  )
}

export default Header;
