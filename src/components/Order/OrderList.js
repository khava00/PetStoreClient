import { Avatar, Button, Collapse, Divider, Grid, Modal, Pagination, Text, useModal } from "@nextui-org/react"
import { useState } from "react";
import { FaCcPaypal } from 'react-icons/fa';
import { MdExpandLess } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cancelOrder, createPayment } from "../redux/Actions/PaymentAction";


export const OrderList = ({loading, orderedList, pageNumber, setPageNumber}) => {

    const { setVisible, bindings } = useModal();
    const [orderTrackingNumber, setOrderTrackingNumber] = useState('');
    const dispatch = useDispatch();
    const payOrder = (totalPrice, paymentMethod, orderTrackingNumber) => {
        dispatch(createPayment(totalPrice, paymentMethod, orderTrackingNumber, false));
    }
    const confirmCancel = (orderTrackingNumber) => {
      dispatch(cancelOrder(orderTrackingNumber));
      setVisible(false);
    }

    const showModalConfirm = (orderTrackingNumber) => {
      setOrderTrackingNumber(orderTrackingNumber);
      setVisible(true);
    }

    return (
        <>
        {!loading && orderedList?.data?.content !== null ? (
          <Grid.Container gap={3}>
            <Grid>
              <Collapse.Group splitted>
                {!loading &&
                  orderedList?.data?.content.map((item, index) => 
                    <Collapse
                      title={
                        <span className="box-title-order">
                          <span className="id-order">#{item.orderTrackingNumber}</span>
                          <span className="status-order">{item.orderStatus.name.toUpperCase()}</span>
                        </span>
                      }
                      arrowIcon={<div className="icon-collapse"><MdExpandLess /></div>}
                      subtitle={`${item.totalQuantity} sản phẩm`}
                      contentLeft={
                        <Avatar
                          size="lg"
                          src="https://thumbs.dreamstime.com/z/order-red-stamp-text-white-44561786.jpg"
                          color="secondary"
                          squared
                        />
                      }
                    >
                      {item.orderItems.map(orderItem => 
                        <>
                          <Divider css={{ marginBottom: "2%" }} />
                          <div className="box-item-order f_flex">
                            <Avatar
                              size="lg"
                              src={`${process.env.REACT_APP_API_ENDPOINT}${orderItem.imageUrl}`}
                              color="secondary"
                              squared
                            />
                            <div className="item-main-content">
                              <div className="item-content f_flex">
                                <div className="item-name">{orderItem.name}</div>
                                <div className="item-price">
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(orderItem.price)}
                                </div>
                              </div>
                              <div className="item-amount">x{orderItem.quantity}</div>
                            </div>
                          </div>
                        </>
                      )}
                      <Divider css={{ marginTop: "2%", marginBottom: "2%" }} />
                      <div className="footer-order">
                        <table>
                          <tr>
                            <td><b>Hình thức thanh toán: &nbsp;</b></td>
                            <td style={{ textAlign: "left" }}>
                              {
                                item.paymentId === 1 ? 
                                (<><FaCcPaypal style={{ color: "#00457C", fontSize: 30 }} /></>)
                                : 
                                (<>
                                  <img
                                    class="method-icon"
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg"
                                    width="32"
                                    height="32"
                                    alt="icon"
                                  />
                                </>)
                              }
                            </td>
                          </tr>
                          <tr>
                            <td><b>Tổng số tiền: &nbsp;</b></td>
                            <td> 
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.totalPrice)}
                            </td>
                          </tr>
                        </table>
                        <div className="box-button">
                          {item.orderStatus.id === 1 && <button onClick={() => payOrder(item.totalPrice, item.paymentId === 1 ? "Paypal" : "Momo", item.orderTrackingNumber)} class="btn-pay-order">Thanh toán</button>}
                          {item.orderStatus.id < 3 && <button class="btn-cancel-order" onClick={() => showModalConfirm(item.orderTrackingNumber)}>Hủy đơn</button>}
                        </div>
                        
                      </div>
                    </Collapse>
                  )
                }
                <Modal
                  width="300px"
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  { ...bindings }
                >
                  <Modal.Header>
                    <Text id="modal-title" size={18}>
                      Xác nhận hủy
                    </Text>
                  </Modal.Header>
                  <Modal.Body>
                    <Text id="modal-description">
                      Bạn có chắc chắn muốn hủy đơn hàng này không?
                    </Text>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button auto onClick={() => confirmCancel(orderTrackingNumber)}>
                      Đồng ý
                    </Button>
                    <Button auto flat color="error" onClick={() => setVisible(false)}>
                      Đóng
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Collapse.Group>
            </Grid>
            <div className='pagination'>
              {orderedList?.data?.content===null? (
                <></>
              ) : <Pagination shadow animated={false} total={orderedList?.data?.pageInfo?.totalPage} onChange={(e) => setPageNumber(e)} initialPage={pageNumber + 1}/>}
            </div>
          </Grid.Container>
        ) : (
        <div className="box-alert-cart">
          <div className="alert-cart">
            <strong>Hiện tại tài khoản quý khách chưa có đơn hàng nào.</strong>
          </div>
        </div>
        )}  
        </>
      )
}