import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderListAll } from "../redux/Actions/PaymentAction";
import { OrderList } from "./OrderList";
const OrderAll = () => {
  const { loading, orderedList } = useSelector((state) => state.orderListAll);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListAll(pageNumber, 4));
  }, [pageNumber, dispatch]);

  return (
    <>
      <OrderList loading={loading} orderedList={orderedList} setPageNumber={setPageNumber} pageNumber={pageNumber}/>
    </>
  )
};

export default OrderAll;
