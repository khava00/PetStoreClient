import { useEffect, useMemo, useState } from "react";

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
import { toast } from "react-hot-toast";

const CheckoutForm = () => {
  const [checked, setChecked] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems"))
  );
  const [receiver,setReceiver] = useState("")
  const [receiverTouched,setReceiverTouched] = useState(false)
  const [phone,setPhone] = useState("")
  const [phoneTouched,setPhoneTouched] = useState(false)
  const [address,setAddress] = useState("")
  const [addressTouched,setAddressTouched] = useState(false)
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
  const validateReceiver = (value) => {
    return value.match(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \s\W|_]+$/i);
  };
  const validatePhone = (value) => {
    return value?.match(/^[0-9]{10,15}$/i);
  };
  const validateAddress = (value) => {
    return value.match(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \s\W|_]{10,250}$/i);
  };

  const helperReceiver = useMemo(()=>{
    if ((!receiver && !receiverTouched)) {
      return {
        text: "",
      };
    }
    if(receiver==="" &&receiverTouched)
      return {
        text: "Họ tên không được để trống",
      };
    const isValid = validateReceiver(receiver);
    return {
      text: !isValid ?"Tên không hợp lệ":""
    };
  },[receiver,receiverTouched])
  const helperPhone = useMemo(() => {
    if ((!phone && !phoneTouched)) {
      return {
        text: "",
      };
    }
    if (phone === "" && phoneTouched)
      return {
        text: "Số điện thoại không được để trống",
      };
    else {
      const isValid = validatePhone(phone);
      return {
        text: !isValid ?"Số điện thoại không hợp lệ": "",
      };
    }
  }, [phone, phoneTouched]);

  const helperAddress= useMemo(() => {
    if ((!address && !addressTouched)) {
      return {
        text: "",
      };
    }
    if (address=== "" && addressTouched)
      return {
        text: "Địa chỉ không được để trống",
      };
    else {
      const isValid = validateAddress(address);
      return {
        text: !isValid && "Địa chỉ ít nhất 10 ký tự trở lên",
      };
    }
  }, [address,addressTouched]);

  const placeOrder = () => {

    setAddressTouched(true);
    setPhoneTouched(true);
    setReceiverTouched(true);
    
    
    if (helperAddress.text ==false && helperPhone.text ==false && helperReceiver.text ==false && receiverTouched && phoneTouched && addressTouched){ 
      console.log(helperAddress.text)   
      dispatch(checkout({
        "orderStatusId": 1,
        "PaymentId": paymentMethod === "Paypal" ? 1 : 2,
        "TotalPrice": total,
        "TotalQuantity": totalQuantity,
        "Receiver":receiver,
        "Address":address,
        "Phone":phone
      }, orderItems
      ));
    }
    else{ 
      console.log(helperAddress.text)
      toast.error("Vui lòng điền thông tin chính xác")
    } 
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
                        <Input 
                          size="xl" 
                          className="address-autocomplete-input" 
                          helperColor="error" 
                          helperText={receiverTouched&&helperReceiver.text} 
                          value={receiver}  
                          onChange={(e)=>setReceiver(e.target.value)} 
                          onFocus={() => setReceiverTouched(true)} 
                          type="text"
                        />
                      </div>
                    </Col>
                    <Col className="box-checkout-element">
                      <label for="firstName">
                        <i class="fa-solid fa-city"></i> Số điện thoại
                      </label>
                      <div className="address-autocomplete">
                        <Input 
                          size="xl"
                          className="address-autocomplete-input" 
                          helperColor="error"
                          helperText={phoneTouched&&helperPhone.text}
                          onFocus ={()=>setPhoneTouched(true)}
                          value={phone}  
                          onChange={(e)=>setPhone(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <br/>
                  <Row gap={1}>
                    <Col className="box-checkout-element">
                      <label for="email">
                        <i class="fa-solid fa-city"></i> Địa chỉ chi tiết
                      </label>
                      <div className="address-autocomplete">
                          <Input 
                            size="xl"
                            className="address-autocomplete-input" 
                            helperColor="error"
                            helperText={addressTouched&& helperAddress.text}
                            onFocus = {()=>setAddressTouched(true)}
                            value={address} 
                            onChange={(e)=>setAddress(e.target.value)}
                          />
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
                <h2 className="title">
                  <FaMoneyBillWave /> Hình thức thanh toán
                </h2>
                <Container>
                  <Row gap={1} className="checkout-element-row">
                    <Col className="box-checkout-element">
                      <Radio.Group
                        css={{ lineHeight: 3 }}
                        onChange={(value) => setPaymentMethod(value)}
                        defaultValue="Paypal"
                      >
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
