import React from "react"
import TitleListPet from "./TitleListPet"
import TitleListProduct from "./TitleListProduct"
import "./style.css"
import { useNavigate } from "react-router-dom"



const ListPet = () => {
  const navigate=useNavigate();
  return (
    <>
      <section className='shop background'>
        <div className='container '>

          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Cún cưng nổi bật</h2>
              </div>
              <div className='heading-right row '>
                <button style={{cursor:"pointer"}} className='btn-primary' onClick={() => navigate(`/pages/2`)}>Xem thêm</button>
              </div>
            </div>
            <div className='product-content  grid1'>
              <TitleListPet />
            </div>
            <br/>
          </div>
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Phụ kiện thú cưng</h2>
              </div>
              <div className='heading-right row '>
                <button style={{cursor:"pointer"}} className='btn-primary' onClick={() => navigate(`/pages/3`)}>Xem thêm</button>
              </div>
            </div>
            <div className='product-content  grid1'>
              <TitleListProduct/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ListPet
