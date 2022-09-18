import React, { useEffect, useState } from 'react'
import { Collapse, Grid, Text, Avatar,Divider } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderListDelivering } from '../redux/Actions/PaymentAction';
import { OrderList } from './OrderList';
const OrderDelivering= () => {
  
  const { loading, orderedList } = useSelector((state) => state.orderListDelivering);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListDelivering(pageNumber, 4));
  }, [pageNumber, dispatch]);

  return (
    <>
      <OrderList loading={loading} orderedList={orderedList} setPageNumber={setPageNumber} pageNumber={pageNumber}/>
    </>
  )
}

export default OrderDelivering