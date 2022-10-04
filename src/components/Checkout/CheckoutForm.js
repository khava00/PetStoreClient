import { useEffect, useState } from "react";
import "./style.css";
import { FaShoppingCart, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { Input, Row, Col, Container, Radio, Checkbox } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, createPayment } from "./../redux/Actions/PaymentAction";
import {
  listProvince,
  getProvinceShipping,
  getDistrictShipping,
  getDistrictBilling,
  getProvinceBilling,
} from "../redux/Actions/AddressAction";
import AutoComplete from "react-autocomplete";

const CheckoutForm = () => {
  const [checked, setChecked] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems"))
  );
  const [reciever,setReciever] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [provinceShippingName, setProvinceShippingName] = useState("");
  const [districtShippingName, setDistrictShippingName] = useState("");
  const [wardShippingName, setWardShippingName] = useState("");
  const [exactShippingAddress, setExactShippingAddress] = useState("");
  const [provinceBillingName, setProvinceBillingName] = useState("");
  const [districtBillingName, setDistrictBillingName] = useState("");
  const [exactBillingAddress, setExactBillingAddress] = useState("");
  const [wardBillingName, setWardBillingName] = useState("");
  const provinces = useSelector((state) => state.provinces);
  const provinceShipping = useSelector((state) => state.provinceShipping);
  const districtShipping = useSelector((state) => state.districtShipping);
  const provinceBilling = useSelector((state) => state.provinceBilling);
  const districtBilling = useSelector((state) => state.districtBilling);
  const { loading, ordered, error } = useSelector((state) => state.checkout);
  let total = 0;
  let orderItemArrays = [];
  const dispatch = useDispatch();

  const placeOrder = () => {
    dispatch(checkout({
      "orderStatusId": 1,
      "PaymentId": paymentMethod === "Paypal" ? 1 : 2,
      "TotalPrice": total,
      "TotalQuantity": totalQuantity,
      "Reciever":reciever,
      "Address":address,
      "Phone":phone
    }, orderItems
    ));
  };

  useEffect(() => {
    dispatch(listProvince());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && ordered?.orderTrackingNumber)
      dispatch(createPayment(total, paymentMethod, ordered?.orderTrackingNumber, true));
  },[loading, ordered]);

  let sum = 0;

  useEffect(() => { 
    cartItems.map(item => {
      sum += Number(item.qty);
      orderItemArrays.push({
        "productId": item.id,
        "quantity": item.qty,
        "price": item.price
      })
    });
    setTotalQuantity(sum);
    setOrderItems(orderItemArrays);
  }, []);
  return (
    <>
      <h1 className="title-checkout mtop">Thanh toán</h1>
      <div className="box-checkout-form">
        <div class="box-main-checkout">
          <div class="container-checkout">
            <form>
              <div className="box-checkout-form">
                
                <h2 className="title">
                  <i class="fa-solid fa-truck"></i> Địa chỉ nhận hàng
                </h2>
                <Container>
                  <Row gap={1} className="checkout-element-row">
                    <Col className="box-checkout-element">
                      <label for="lastName">
                        <i class="fa-solid fa-city"></i> Họ tên
                      </label>
                      <div className="address-autocomplete">
                        <input className="address-autocomplete-input" value={reciever}  onChange={(e)=>setReciever(e.target.value)}/>
                      </div>
                    </Col>
                    <Col className="box-checkout-element">
                      <label for="firstName">
                        <i class="fa-solid fa-city"></i> Số điện thoại
                      </label>
                      <div className="address-autocomplete">
                        <input className="address-autocomplete-input" value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
                      </div>
                    </Col>
                  </Row>
                  <Row gap={1}>
                    <Col className="box-checkout-element">
                      <label for="email">
                        <i class="fa-solid fa-city"></i> Địa chỉ chi tiết
                      </label>
                      <div className="address-autocomplete">
                          <input className="address-autocomplete-input" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                      </div>
                    </Col>
                    
                  </Row>
                </Container>
                <h2 className="title">
                  <i class="fa-solid fa-truck-fast"></i> Phương thức giao hàng
                </h2>
                <Container>
                  <Row
                    gap={1}
                    css={{
                      boxShadow: "0 0 0 1px",
                      borderRadius: "0.375em",
                      padding: "1.125rem",
                    }}
                    className="checkout-element-row"
                  >
                    <Col className="box-checkout-element">
                      <Radio.Group defaultValue="A">
                        <Radio value="A">Giao hàng nhanh (1-3 ngày)</Radio>
                      </Radio.Group>
                    </Col>
                    <Col
                      css={{
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                      className="box-checkout-element"
                    >
                      Miễn phí
                    </Col>
                  </Row>
                </Container>
                
                {checked && (
                  <Container>
                    <Row gap={1} className="checkout-element-row">
                      <Col className="box-checkout-element">
                        <label for="lastName">
                          <i class="fa-solid fa-city"></i> Tỉnh/Thành phố
                        </label>
                        <div className="address-autocomplete">
                          <AutoComplete
                            getItemValue={(item) => item.name}
                            items={provinces.data.filter((province) =>
                              province.name.includes(provinceBillingName)
                            )}
                            renderItem={(item, isHighlighted) => (
                              <div
                                style={{
                                  verticalAlign: "middle",
                                  background: isHighlighted
                                    ? "lightgray"
                                    : "white",
                                }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    minWidth: 200,
                                  }}
                                >
                                  {item.name}
                                </div>
                              </div>
                            )}
                            menuStyle={{
                              border: "solid 1px #000",
                              backgroundColor: "#dfd",
                              zIndex: 1,
                              position: "absolute",
                              top: 60,
                              left: 10,
                              overflow: "auto",
                              maxHeight: 100,
                            }}
                            inputProps={{
                              style: {
                                fontSize: 18,
                                width: "100%",
                                padding: 3,
                              },
                            }}
                            value={provinceBillingName || ""}
                            onChange={(e) =>
                              setProvinceBillingName(e.target.value)
                            }
                            onSelect={(provinceBillingName, item) => {
                              setProvinceBillingName(provinceBillingName);
                              dispatch(getProvinceBilling(item.code));
                            }}
                          />
                        </div>
                      </Col>
                      <Col className="box-checkout-element">
                        <label for="firstName">
                          <i class="fa-solid fa-city"></i> Quận/Huyện
                        </label>
                        <div className="address-autocomplete">
                          <AutoComplete
                            getItemValue={(item) => item.name}
                            items={
                              provinceBilling.data.districts?.length > 0
                                ? provinceBilling.data.districts.filter(
                                    (district) =>
                                      district.name.includes(
                                        districtBillingName
                                      )
                                  )
                                : []
                            }
                            renderItem={(item, isHighlighted) => (
                              <div
                                style={{
                                  verticalAlign: "middle",
                                  background: isHighlighted
                                    ? "lightgray"
                                    : "white",
                                }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    minWidth: 200,
                                  }}
                                >
                                  {item.name}
                                </div>
                              </div>
                            )}
                            menuStyle={{
                              border:
                                provinceBilling.data.districts?.length > 0
                                  ? "solid 1px #000"
                                  : "solid 1px transparent",
                              backgroundColor: "#dfd",
                              zIndex: 1,
                              top: 60,
                              left: 10,
                              overflow: "auto",
                              maxHeight: 100,
                            }}
                            inputProps={{
                              style: {
                                fontSize: 18,
                                width: "100%",
                                padding: 3,
                              },
                            }}
                            value={districtBillingName || ""}
                            onChange={(e) =>
                              setDistrictBillingName(e.target.value)
                            }
                            onSelect={(districtBillingName, item) => {
                              setDistrictBillingName(districtBillingName);
                              dispatch(getDistrictBilling(item.code));
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row gap={1}>
                      <Col className="box-checkout-element">
                        <label for="email">
                          <i class="fa-solid fa-city"></i> Phường/Xã
                        </label>
                        <div className="address-autocomplete">
                          <AutoComplete
                            getItemValue={(item) => item.name}
                            items={
                              districtBilling.data.wards?.length > 0
                                ? districtBilling.data.wards.filter((ward) =>
                                    ward.name.includes(wardBillingName)
                                  )
                                : []
                            }
                            renderItem={(item, isHighlighted) => (
                              <div
                                style={{
                                  verticalAlign: "middle",
                                  background: isHighlighted
                                    ? "lightgray"
                                    : "white",
                                }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    minWidth: 200,
                                  }}
                                >
                                  {item.name}
                                </div>
                              </div>
                            )}
                            menuStyle={{
                              border:
                                districtBilling.data.wards?.length > 0
                                  ? "solid 1px #000"
                                  : "solid 1px transparent",
                              backgroundColor: "#dfd",
                              zIndex: 1,
                              top: 60,
                              left: 10,
                              overflow: "auto",
                              maxHeight: 100,
                            }}
                            inputProps={{
                              style: {
                                fontSize: 18,
                                width: "100%",
                                padding: 3,
                              },
                            }}
                            value={wardBillingName || ""}
                            onChange={(e) => setWardBillingName(e.target.value)}
                            onSelect={(wardBillingName) =>
                              setWardBillingName(wardBillingName)
                            }
                          />
                        </div>
                      </Col>
                      <Col className="box-checkout-element">
                        <label for="email">
                          <i class="fa-solid fa-location-dot"></i> Địa chỉ chi tiết
                        </label>
                        <Input
                          // clearable
                          value={exactBillingAddress}
                          onChange={(e) => setExactBillingAddress(e.target.value)}
                          helperColor="error"
                          // helperText={lastNameToched && helperLastName.text}
                          // onFocus={() => setLastNameToched(true)}
                          type="text"
                          bordered
                          fullWidth
                          color="primary"
                          size="md"
                        />
                      </Col>
                    </Row>
                  </Container>
                )}
                <h2 className="title">
                  <FaMoneyBillWave /> Hình thức thanh toán
                </h2>
                <Container>
                  <Row gap={1} className="checkout-element-row">
                    <Col className="box-checkout-element">
                      <Radio.Group
                        css={{ lineHeight: 3 }}
                        onChange={(value) => setPaymentMethod(value)}
                        defaultValue="COD"
                      >
                        <Radio className="checkbox-item" value="COD">
                          <img
                            class="method-icon"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                            width="32"
                            height="32"
                            alt="icon"
                          />
                          &nbsp; Thanh toán bằng tiền mặt
                        </Radio>
                        <Radio className="checkbox-item" value="Paypal">
                          <FaPaypal style={{ color: "#00457C" }} />
                          &nbsp;&nbsp; Thanh toán bằng Paypal
                        </Radio>
                        <Radio value="Momo">
                          <img
                            class="method-icon"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg"
                            width="32"
                            height="32"
                            alt="icon"
                          />
                          &nbsp;Thanh toán bằng ví MoMo
                        </Radio>
                      </Radio.Group>
                    </Col>
                  </Row>
                </Container>
              </div>
              <input
                className="btn-checkout-form"
                type="button"
                value="Continue to checkout"
                onClick={placeOrder}
              />
            </form>
          </div>
        </div>
        <div className="col-25">
          <div className="container-checkout">
            <h4>
              Cart{" "}
              <span class="header-price">
                <FaShoppingCart /> <b>{totalQuantity}</b>
              </span>
            </h4>
            <br />
            {cartItems.map(
              (item) => (
                total += Number(item.price * item.qty),
                <p>
                  <a href="#">
                    {item.name} x{item.qty}
                  </a>{" "}
                  <span class="price">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(item.price * item.qty))}
                  </span>
                </p>
              )
            )}
            <br />
            <hr />
            <p>
              Total{" "}
              <span className="price">
                <b>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(total))}
                </b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
