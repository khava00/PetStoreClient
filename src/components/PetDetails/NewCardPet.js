import React,{useEffect, useState} from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {useDispatch, useSelector} from "react-redux"
import { listProduct } from "../redux/Actions/ProductActions"
import { Link, useParams } from "react-router-dom"
import Loading from "../LoadingError/Loading"
import { addToCart } from "../redux/Actions/CartActions"
import Rating from "react-rating";
import toast from "react-hot-toast"

const SampleNextArrow = (props) => {
    const { onClick } = props
    return (
      <div className='control-btn' onClick={onClick}>
        <button className='next'>
          <i className='fa fa-long-arrow-alt-right'></i>
        </button>
      </div>
    )
  }
  const SamplePrevArrow = (props) => {
    const { onClick } = props
    return (
      <div className='control-btn' onClick={onClick}>
        <button className='prev'>
          <i className='fa fa-long-arrow-alt-left'></i>
        </button>
      </div>
    )
  }
  const NewCardPet = () => {
    const [settings, setSettings] = useState({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    })
  
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state)=> state.productDetails)
    const productsRelated = useSelector((state)=> state.productListRelated)
    const { loading, product } = productDetails;
    // useEffect(()=>{
    //   if (loading === false)
    //     if (product.breed === null) 
    //       dispatch(listProduct("related", 0, product.category.id,0,8))
    //     else
    //       dispatch(listProduct("related", product.breed.id,0,0,8))
          
    // },[id, dispatch, loading, product])

    useEffect(() => {
      if (product.productSuggestions !== undefined) {
        setSettings({
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: product.productSuggestions.length < 4 ? product.productSuggestions.length : 4,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        })
      }
    }, [product])
    const covertURL= (str)=>{
      // Chuy???n h???t sang ch??? th?????ng
      str = str.toLowerCase();     
   
      // x??a d???u
      str = str.replace(/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/g, 'a');
      str = str.replace(/(??|??|???|???|???|??|???|???|???|???|???)/g, 'e');
      str = str.replace(/(??|??|???|???|??)/g, 'i');
      str = str.replace(/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/g, 'o');
      str = str.replace(/(??|??|???|???|??|??|???|???|???|???|???)/g, 'u');
      str = str.replace(/(???|??|???|???|???)/g, 'y');
      str = str.replace(/(??)/g, 'd');
   
      // X??a k?? t??? ?????c bi???t
      str = str.replace(/([^0-9a-z-\s])/g, '');
   
      // X??a kho???ng tr???ng thay b???ng k?? t??? -
      str = str.replace(/(\s+)/g, '-');
   
      // x??a ph???n d??? - ??? ?????u
      str = str.replace(/^-+/g, '');
   
      // x??a ph???n d?? - ??? cu???i
      str = str.replace(/-+$/g, '');
   
      // return
      return str;
    }
    return (
      <> 
       { (loading === undefined || loading === true) && product !== null ? (
            <div className="mb-5 "><Loading/></div>
        ) : (
          <>
            <Slider {...settings}>
              { product.productSuggestions?.map((productItems) => {
                return (
                  <div className='box'>
                    <div className='product mtop'>
                      <div className='img'>
                        <span className='discount'>New</span>
                        <img className="img-related" src={`${process.env.REACT_APP_API_ENDPOINT}${productItems.imagePath} `} alt='' /> 
                      </div>
                      <div className='product-details'>
                        <Link to = {`/product/${productItems.id}`}><h3 className="name-product">{productItems.name}</h3></Link>
                        <div className='rate'>
                          {productItems.rate == null? <span className="rated">Ch??a c?? ????nh gi??</span>:
                            (
                              <>
                                <Rating
                                  className='rating-reviews-detail'
                                  emptySymbol="fa-regular fa-star"
                                  fullSymbol="fa-solid fa-star" 
                                  readonly
                                  initialRating={productItems.rate}
                                />
                              </>
                            )
                          }
                        </div>
                        <div className='price'>
                          <h4>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productItems.price)} </h4>
                          {/* step : 3  
                          if hami le button ma click garryo bahne 
                          */}
                         {productItems.amountInStock>0 ? 
                          (<>
                              <button onClick={()=>dispatch(addToCart(productItems.id,1))}>
                                <i className='fa fa-plus'></i>
                              </button>
                          </>)
                          :
                          (<>
                              <button onClick={()=>toast.error("S???n ph???m ???? h???t h??ng")}>
                                <i className='fa fa-plus'></i>
                              </button>
                          </>)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </>
          )
        }
      </>
    )
  }
  
  export default NewCardPet
  