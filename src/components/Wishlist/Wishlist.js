import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { WishListProductPage,addWishListProductPage } from '../redux/Actions/ProductActions';
import { ProductList } from "../ProductListPage/ProductList";
import { Pagination } from "@nextui-org/react";
import "./style.css"
const Wishlist = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state)=>state.wishList)
  const addWishList = useSelector((state)=>state.addWishList)
  const [ pageNumber, setPageNumber ] = useState(1);
  const loading = addWishList;
  console.log(addWishList)
  useEffect(()=>{
      dispatch(WishListProductPage(pageNumber,4))
  },[dispatch,pageNumber,loading])
  return (
    <div className='wrapper'>
       <div class='product-page mtop'>
          {wishList.products?.content===null? (
            <div className='alert-wishlist '>Chưa có <strong>sản phẩm yêu thích</strong> </div>        
        ) :     
        <div className='product-list'>   
          <ProductList productList={wishList.products?.content} />   
        </div>
        }        
        </div>
       <div className='pagination'>
       {wishList.products?.content===null? (
       <></>
       ):<Pagination shadow animated={false} total={wishList.products?.pageInfo?.totalPage} onChange={(e) => setPageNumber(e)} initialPage={1} />}
      </div>
    </div>
  )
}

export default Wishlist