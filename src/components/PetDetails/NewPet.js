import React from "react"
import NewCardPet from "./NewCardPet"
import "./PetDetails.css"

const NewPet = () => {
  return (
    <>
      <section className='related'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>Sản phẩm tương tự</h1>
          </div>
          <NewCardPet />
        </div>
      </section>
    </>
  )
}

export default NewPet
