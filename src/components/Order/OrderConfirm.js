import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrderListProcessing } from '../redux/Actions/PaymentAction';
import { OrderList } from './OrderList';
const OrderConfirm = () => {
    
  const { loading, orderedList } = useSelector((state) => state.orderListProcessing);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListProcessing(pageNumber, 4));
  }, [pageNumber, dispatch]);

  return (
    <>
      <OrderList loading={loading} orderedList={orderedList} setPageNumber={setPageNumber} pageNumber={pageNumber} />
    </>
  )
}

export default OrderConfirm