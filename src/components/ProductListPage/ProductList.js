import { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/Actions/CartActions";
import { addWishListProductPage, WishListProductPage } from "../redux/Actions/ProductActions";
// import Heart from 'react-animated-heart'

import "./style.css"

export const ProductList = ({ productList, name }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const wishList = useSelector((state) => state.wishList)
	const [wishList , setWishList] = useState(JSON.parse(localStorage.getItem("products")).content?.length > 0 ? JSON.parse(localStorage.getItem("products")).content : [])
	const [isClick, setClick] = useState([])


	const handleAddWishList = (id, index) => {
		const existItem = wishList.find((x) => x.id === id)
		if (existItem) {
			let newArr = [...isClick]
			newArr[index] = false
			setClick(newArr)
		}
		else {
			let newArr = [...isClick]
			newArr[index] = true
			setClick(newArr)
		}

		dispatch(addWishListProductPage(id))
	}

	// useEffect(() => {
	// 	let newArr = new Array(productList.products.content?.length).fill(false);
	// 	setClick(newArr)
	// 	productList.products.content?.map((item, index) => {
	// 		const existItem = wishList.find((x) => x.id === item.id)
	// 		if (existItem) {
	// 			const newArr = [...isClick]
	// 			newArr[index] = false
	// 			setClick(newArr)
	// 		}
	// 		else {
	// 			const newArr = [...isClick]
	// 			newArr[index] = true
	// 			setClick(newArr)
	// 		}
	// 	})
	// }, [productList])
	const convertURL= (str)=>{
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
			{Array.isArray(productList)?productList.map((productItems, index) => {
				return (
					<div className="box">
						<div className="product mtop">
							<div className="img">
								<span className="discount">New</span>
								<img
									src={`${process.env.REACT_APP_API_ENDPOINT}${productItems.imagePath} `}
									alt=""
								/>
							</div>
							<div className='product-like'>
								{/* <Heart isClick={isClick[index]} onClick={() => handleAddWishList(productItems.id, index)} /> */}
							</div>
							<div className="product-details">
								<h3 className="name-product" onClick={() => navigate(`/product/${convertURL(productItems.name)}-${productItems.id}`)}>{productItems.name}</h3>
								<div className='rate'>
									{productItems.rate === null ? <span className="rated">Chưa có đánh giá </span> : (<> {[...Array(productItems.rate)].map((star) => {
										return (
											<i className="fa fa-star"></i>
										);
									})}
									</>)}
								</div>
								<div className="price">
									<h4>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productItems.price)} </h4>
									{/* step : 3  
                         if hami le button ma click garryo bahne 
                        */}
									{productItems.amount > 0 ? (
										<>
											<button
												onClick={() => dispatch(addToCart(productItems.id, 1))}
											>
												<i className="fa fa-plus"></i>
											</button>
										</>
									) : (
										<>
											<button
												onClick={() => toast.error("Sản phẩm đã hết hàng")}
											>
												<i className="fa fa-plus"></i>
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				);
			}):null}
		</>
	);
};
