import {useEffect, useState} from 'react'
import "./PetDetails.css"
import {  convertURL, listProductDetails } from '../redux/Actions/ProductActions'
import {useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import Loading from '../LoadingError/Loading'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import Accordion from "../Accordion/Accordion";
import { Helmet } from 'react-helmet';
import { FacebookIcon, FacebookShareButton } from 'react-share'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { addWishListProductPage} from "../redux/Actions/ProductActions";
import React from 'react';

const PetDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product } = productDetails;
  const handleAddWishList = (id) => {
		dispatch(addWishListProductPage(id))
	}
  useEffect(()=>{
    dispatch(listProductDetails(id))
  }, [id, dispatch])
  const [qtyNum, setQty] = useState(1)
  const AddToCart = (e) => {
    e.preventDefault();
    navigate(`/cart?id=${id}&qty=${qtyNum}`)
    toast.success("Sản phẩm đã thêm vào giỏ hàng")

  }
  const { categories } = useSelector((state) => state.categoryList);
  
  const shareUrl = `${process.env.REACT_APP_CLIENT_ENDPOINT}/product/${convertURL(product?.name)}-${product.id}`;
    // useEffect(()=>{
    //   if(product!==undefined){
    //     document.querySelector('meta[property="og:url"]').content = shareUrl;
    //     document.querySelector('meta[property="og:title"]').content = product.name;
    //     document.querySelector('meta[property="og:description"]').content = product.description;
    //     document.querySelector('meta[property="og:image"]').content = process.env.REACT_APP_API_ENDPOINT + product.imagePath?.find((value,index)=>index===0); 
    //   }
    // },[product])
  return (
    <div className='box-details container'>
        {/* <Helmet>
          <title>{product.name}</title>
          <meta property="og:type" content="website"/>
          <meta property="og:image" content={`${process.env.REACT_APP_API_ENDPOINT}${product.imagePath?.find((value,index)=>index===0)} `}/>
          <meta property="og:image:width" content="520" />
          <meta property="og:image:height" content="220" />
          <meta property="og:title" content={product.name}/>
          <meta property="og:url" content={shareUrl}/>
          <meta property="og:description" content={product.description}/>
        </Helmet> */}
       
      { (loading === undefined || loading === true) ? (
            <div className="mb-5 "><Loading/></div>
        ) : (
          <>
          <div class="product-category mtop">
          <h3 class="title">Danh mục sản phẩm</h3>
          <ul>
            {categories?.map((category) => (
              <Accordion category={category} />
            ))}
          </ul>
        </div>
            <section className='pdetails container mtop heading f_flex'>
              <div className='box-img-detail'>
                <div className='single-img'  >
                  <img className='big-img' src={`${process.env.REACT_APP_API_ENDPOINT}${product.imagePath?.find((value,index)=>index===0)} `} alt=''/>
                    <div className='small-img-group f_flex '>
                      {product.imagePath?.map((image) => (
                        <div className='small-img-col '>
                          <img className='small-img' src={`${process.env.REACT_APP_API_ENDPOINT}${image} `}   alt=''/>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
                <div className='single-detail'>
                  <h1>{product?.name==null ? '-':product.name}</h1>
                  <h2>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</h2>
                  {product?.age !== null && <h3>Tuổi: <span>  {product.age}</span> tháng tuổi</h3> }
                  {/* {product?.gender !== null && <h3>Giới tính: <span> {product?.gender ===  false? 'Đực' : 'Cái'}</span> </h3> } */}
                  {product.origins.length > 0 && <h3>Xuất xứ: <span>{product?.origins.map(origin => origin.name).join(', ')}</span> </h3>}
                  {product.breed !== null && <h3>Chủng loại: <span>{product.breed.name}</span>  </h3>}
                  {product.description !== null && <h3 className='description-product'>Mô tả: <span>{product.description}</span>  </h3>}
                  
                  <div className='amount'>
                    {product.amountInStock > 0 ? (
                      <>
                        <h3>Số lượng: </h3>
                          <div className='amount-box f_flex'>
                            <button className='de' onClick={()=>setQty(qtyNum-1)} disabled={product.amountInStock-qtyNum<0?false:true}>-</button>
                              <input className='intput'type="text" value={qtyNum} onChange={(e)=>setQty(e.target.value)}/>
                            <button className='in' onClick={()=>setQty(qtyNum+1)}  disabled={product.amountInStock-qtyNum>0?false:true}>+</button>
                          </div>
                          <div className='amount-index f_flex'> 
                            <div className='box-amount-index'>
                              Số lượng còn {product?.amountInStock}
                            </div>
                            <div className='box-share'>
                              <FacebookShareButton url={shareUrl}>
                                <FacebookIcon size={40} round={true}/>
                              </FacebookShareButton>
                              </div>
                              <div className='box-like'>
                                {product.favourite ? <BsHeartFill style={{fontSize:"30px",color:"#e94560"}} onClick={()=>handleAddWishList(product.id)} /> :<BsHeart style={{fontSize:"30px",color:"#e94560"}} onClick={()=>handleAddWishList(product.id)}/> }
                              </div>
                          </div>
                          
                      </>
                      ):(
                        <>   
                          <h3>Số lượng: </h3>
                          <div className='amount-index f_flex'>
                            <div className='box-amount-index'> 
                              Số lượng còn {product?.amountInStock}
                            </div>
                            <div className='box-share'>
                              <div className='fb-share'>
                                <FacebookShareButton url={shareUrl}>
                                  <FacebookIcon size={40} round={true}/>
                                </FacebookShareButton>
                              </div>
                            </div>
                          </div>
                         
                        </>
                    )}
                    
                  </div>
                  <br/>
                  {product.amountInStock > 0 ? 
                  (<>
                    <button onClick={AddToCart} type="button" className='btn-add-to-cart' >Mua hàng</button>
                  </>):
                  (<>
                    <button type="button" className='btn-add-to-cart' disabled>Hết sản phẩm</button>
                  </>)}
                </div>
            </section> 
          </>
        )
      
      }
    </div>
    
  )
}

export default PetDetails