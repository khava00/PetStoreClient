import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WishListProductPage, addWishListProductPage } from '../redux/Actions/ProductActions';
import { Loading } from '@nextui-org/react';
import { ProductList } from "../ProductListPage/ProductList";
import { Pagination } from "@nextui-org/react";
import "./style.css"
const Wishlist = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList)
  const addWishList = useSelector((state) => state.addWishList)
  const [pageNumber, setPageNumber] = useState(1);
  const loadingAdd = addWishList;
  const { loading } = wishList
  console.log(addWishList)
  useEffect(() => {
    dispatch(WishListProductPage(pageNumber, 4))
  }, [dispatch, pageNumber, loadingAdd])
  return (
    <div className='wrapper'>
      {(loading === undefined || loading === true) ? (
        <div className="loading-wish-list container"><Loading /></div>
      ) : (
        <>
          <div class='product-page mtop'>
            {wishList.products?.content === null ? (
              <div className='alert-wishlist '>Chưa có <strong>sản phẩm yêu thích</strong> </div>
            ) :
              <div className='product-list'>
                <ProductList productList={wishList.products?.content} />
              </div>
            }
          </div>
          <div className='pagination'>
            {wishList.products?.content === null ? (
              <></>
            ) : <Pagination shadow animated={false} total={wishList.products?.pageInfo?.totalPage} onChange={(e) => setPageNumber(e)} initialPage={1} />}
          </div>
        </>)}

    </div>
  )
}

export default Wishlist