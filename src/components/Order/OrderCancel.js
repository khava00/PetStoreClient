import React, { useEffect,useState } from 'react'
import { Collapse, Grid, Text, Avatar,Divider } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderListCancel, getOrderListDelivering } from '../redux/Actions/PaymentAction';
import { OrderList } from './OrderList';
const OrderCancel= () => {
  
  const { loading, orderedList } = useSelector((state) => state.orderListCancel);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListCancel(pageNumber,4));
  }, [pageNumber,dispatch]);

  return (
    <>
      <OrderList loading={loading} orderedList={orderedList} setPageNumber={setPageNumber} pageNumber={pageNumber} />
    </>
  )
}

export default OrderCancel