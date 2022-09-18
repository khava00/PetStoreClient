import React, { useEffect, useState } from 'react'
import { Collapse, Grid, Text, Avatar,Divider } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, getOrderListUnpaid } from '../redux/Actions/PaymentAction';
import { MdExpandLess } from 'react-icons/md';
import { FaCcPaypal } from 'react-icons/fa';
import { OrderList } from './OrderList';

const OrderUnpaid = () => {
    
  const { loading, orderedList } = useSelector((state) => state.orderListUnpaid);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListUnpaid(pageNumber, 4));
  }, [pageNumber, dispatch]);

  return (
    <>
      <OrderList loading={loading} orderedList={orderedList} setPageNumber={setPageNumber} pageNumber={pageNumber} />
    </>
  )
}

export default OrderUnpaid