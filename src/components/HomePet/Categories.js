import React from "react"
import "./Home.css"
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const { categories } = useSelector((state) => state.categoryList);
  const navigate = useNavigate()

  return (
    <>
      <div className='category'>
        {categories?.map((category,index) => {
          return (
            <div className='box f_flex' key={index.id}>

              <span onClick={()=> navigate(`/pages/${category.id}`)}>{category.name}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
