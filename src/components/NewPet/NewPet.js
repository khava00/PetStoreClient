import React from "react"
import NewCardPet from "./NewCardPet"
import "./style.css"

const NewPet = () => {
  return (
    <>
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>Mèo nổi bật</h1>
          </div>
          <NewCardPet />
        </div>
      </section>
    </>
  )
}

export default NewPet
