import React,{useEffect} from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { listProduct } from "../redux/Actions/ProductActions"
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../redux/Actions/CartActions"
import toast from 'react-hot-toast';
import { addWishListProductPage} from "../redux/Actions/ProductActions";
import Rating from "react-rating";
import { Loading } from "@nextui-org/react"
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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
  const dispatch = useDispatch();
  const productListNew =useSelector((state)=> state.productListNew)
  const {loading} = productListNew
  useEffect(()=>{
    dispatch(listProduct("cat",1,8))
  },[dispatch])
  const handleAddWishList = (id) => {
		dispatch(addWishListProductPage(id))
	}
  const covertURL= (str)=>{
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
 
    // return
    return str;
  }
    return (
      <>
         {(loading === undefined || loading === true) ? (
        <div className="loading-home container"><Loading /></div>
      ) : (
        <>
        <Slider {...settings}>
          {productListNew.productsNew?.map((productItems) => {
            return (
              <div className='box'>
                <div className='product mtop'>
                  <div className='img'>
                    <span className='discount'>New</span>
                      <img className="img-product"  src= { `${process.env.REACT_APP_API_ENDPOINT}${productItems.imagePath} `} alt='' /> 
                      <div className='product-like'>
                        {/* {productItems.favourite===true ?<BsHeartFill onClick={()=>handleAddWishList(productItems.id)}/>: <BsHeart onClick={()=>handleAddWishList(productItems.id)}/>   } */}
                      </div>
                  </div>
                  <div className='product-details'>
                  <Link  to = {`/product/${productItems.id}`}>
                    <h3 className="name-product">{productItems.name}</h3>
                  </Link>
                    <div className='rate'>
                    {productItems.rate == null? <span className="rated">Chưa có đánh giá</span>:
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
                      <h4>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productItems.price)}</h4>
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
                           <button onClick={()=>toast.error("Sản phẩm đã hết hàng")}>
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
      )}
      </>
     
    )
  }
  
  export default NewCardPet
  