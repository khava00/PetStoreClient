import { useEffect, useState } from "react";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from './../components/redux/Actions/CartActions'
import { Link, useNavigate } from 'react-router-dom'
import LoginReview from "../components/PetDetails/LoginReview";
import toast from 'react-hot-toast';

const CartPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const qty = params.get('qty')
  const id = params.get('id')
  const [cartItems, setCartItems] = useState([])
  const [active, setActive] = useState([])
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])


  useEffect(() => {
    setTimeout(() => {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
      if (id && qty)
        navigate('/cart')
    }, 50)
  }, [cartItems])

  const handleIncreaseQuantity = (qty, index) => {
    if (cartItems[index].amountInStock - qty > 0) {
      dispatch(increaseQuantity(index))
    }
    else {
      let newArr = [...active];
      newArr[index] = false;
      setActive(newArr);
      toast.error("Số lượng đã đạt tối đa")
    }
  }

  const handleDecreaseQuantity = (quantity, index) => {

    if (quantity > 0) {
      let newArr = [...active];
      newArr[index] = true;
      setActive(newArr);
      dispatch(decreaseQuantity(index))
      // setCheck(true);
      // console.log(cartItems.qty)
    }
    if (quantity == 1) {
      toast.error("Số lượng đã đạt tối thiểu")
    }
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const handleCheckout = () =>{
      navigate('/checkout')
   }
  
  let Total=0
  let TotalQuantity=0
  return (
    <div className="table-cart">
      <h1 className="title-cart mtop">
        Giỏ Hàng
      </h1>
      {cartItems.length===0 ? 
      (
        <div className="box-alert-cart">
          <div className="alert-cart">
            <strong>Giỏ hàng hiện tại không có sản phẩm </strong>quý khách vui lòng quay về trang chủ để mua sắm.
          </div>
          <div className="link-router-cart">
            <Link 
            style={{
              backgroundColor:"#04AA6D",
              color:"white",
              padding:"20px",
              maxWidth:"20%",
              marginLeft:"40%",
              textAlign:"center",
              marginBottom:"20px",
              borderRadius:"15px",
              justifyContent:"center",
              display:"flex"

            }} 
            to="/">
            Tiếp tục mua sắm
            </Link>    
          </div>
        </div>
      )
      :(
        <>
          <table
          aria-label="Example table with custom cells"
          style={{
            height: "auto",
            maxWidth: "90%",
            marginTop: "40px",
            marginBottom: "20px",
            marginLeft: "70px",
            width: "100%",
            textAlign: "center",
            lineHeight: "3"
        }}
        selectionMode="none"
      >
        <thead>
          <th></th>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Tạm tính</th>
         
        </thead>

        <tbody>
          {cartItems.map((item, index) => (
              Total+=Number(item.price * item.qty),
              TotalQuantity += Number(item.qty),
            <tr>
              <td>
                <MdDeleteForever size="25px" color="#E94560" onClick={() => removeFromCartHandler(item.id)} />
              </td>
              <td><User squared src={`${process.env.REACT_APP_API_ENDPOINT}${item.imagePath} `} css={{ p: 0,paddingTop:20 }} /></td>
              <td>{item.name}</td>
              <td>
                <div className="box-amount-cart f_flex">
                  <button className='de-cart' onClick={() => handleDecreaseQuantity(item.qty, index)}>-</button>
                  <input className='input-cart' type="text" value={item.qty} readOnly />
                  <button className='in-cart' onClick={() => handleIncreaseQuantity(item.qty, index)} disabled={active[index] === false ? true : false}>+</button>
                </div>
              </td>
              <td>
                <Text b size={14} css={{ tt: "capitalize" }}>
                  {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(item.price * item.qty))}
                </Text>
              </td>
            </tr>
          ))}

        </tbody>
        <tfoot>
          <tr style={{fontWeight:"bold"}}>
            <td colSpan={3}>Tổng cộng</td>
            <td>{TotalQuantity}</td>
            <td>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Total)}</td>
          </tr>
        </tfoot>
          </table>
          <div className="box-button-cart">
            {user===null ? <button type="button" className='btn-add-to-cart-disabled' disabled>Vui lòng đăng nhập</button>:
              <button type="button" className='btn-add-to-cart' onClick={()=>handleCheckout()}>Mua hàng</button>
            }
            
            <div className="link-router-cart-value">
              <Link 
              style={{
                backgroundColor:"#04AA6D",
                color:"white",
                padding:"20px",
                maxWidth:"15%",
                marginLeft:"79%",
                textAlign:"center",
                marginBottom:"20px",
                borderRadius:"15px",
                justifyContent:"center",
                display:"flex"

              }} 
              to="/">
              Tiếp tục mua sắm
              </Link>    
            </div>
           
          </div>
         
        </>
      )}
      
    </div>

  );

}

export default CartPage