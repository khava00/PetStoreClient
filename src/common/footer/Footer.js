import React from "react"
import "./style.css"
import MailChimpSimpleForm from "../../components/MailChimp/MailChimpForm"
const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <div className="box-img-logo-footer">
              <img src="/images/logo.png" alt="" />
            </div>
            
            <p>Trong quá trình hoạt động Shop luôn làm đúng những gì đã cam kết , tư vấn đầy đủ cũng như luôn đảm bảo quyền lợi của khách hàng.
            </p>
            <div className='icon d_flex'>
                <div className='img d_flex'>
                    <i class='fa-brands fa-paypal'></i>
                    <span>Paypal</span>
                </div>
              </div>
            
          </div>

          <div className='box'>
            <h2>About Us</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Contact Us</h2>
            <ul>
              <li>280 An Dương Vương, Phường 4, Quận 5, TP. Hồ Chí Minh </li>
              <li>Email: contactkawaii@gmail.com</li>
              <li>Phone: +1 233456789</li>
              <li>Đăng kí để nhận thông tin mới nhất từ shop</li>
              <MailChimpSimpleForm/>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
