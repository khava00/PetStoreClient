import React from "react"
import "./Home.css"
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "@nextui-org/react";

const Categories = () => {
  const { categories,loading } = useSelector((state) => state.categoryList);

  const navigate = useNavigate()

  return (
    <>
    {(loading === undefined || loading === true) ? (
        <div className="loading-categories container"><Loading /></div>
      ) : (
        <div className='category'>
            {categories?.map((category,index) => {
              return (
                <div className='box f_flex' key={index.id}>

                  <span className="category-name" onClick={()=> navigate(`/pages/${category.id}`)}>{category.name}</span>
                </div>
              )
            })}
      </div>
      )}
    </>
    
  )
}

export default Categories
