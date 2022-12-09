import React,{useEffect,useState,useMemo} from 'react'
import "./PetDetails.css"
import {BiCommentCheck} from "react-icons/bi"
import { Card, Grid, Pagination, Text} from "@nextui-org/react";
import Rating from "react-rating";
import { addReviewProduct, getReviewsProduct } from '../redux/Actions/ProductActions';
import {useSelector,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import LoginReview from './LoginReview';
import  Moment from "react-moment"
import 'moment/locale/vi';
import toast from 'react-hot-toast';

const ReMarks = () => {
    const { id } = useParams();
    const dispatch= useDispatch()
    const getReviews = useSelector((state)=>state.getReviewsProduct)
    const [ pageNumber, setPageNumber ] = useState(1);
    const [rate,setRate] = useState(0)
    const [remark,setRemark] =useState("")
    const userLogin = useSelector((state) => state.userLogin);
    const {user} = userLogin
    useEffect(()=>{
        dispatch(getReviewsProduct(id,pageNumber,2))
    },[dispatch,pageNumber,id])
    const handleAddReviewProduct = (e) =>{
        {rate===0?toast.error("Vui lòng để lại đánh giá"):dispatch(addReviewProduct(id,remark,rate))}
    }
   
  return (
    <section className='remarks container'>
        <div className='reviews  f_flex'>
            <BiCommentCheck style={{fontSize:"20px",color:"#e94560"}}/>
            <h1>Đánh giá</h1>
        </div>
        <div className='box-comment'>
            {user === null ? (
               <LoginReview/>
            ):(
                <>
                    <div className='box-rating-comment'>
                        <Rating
                            className='rating-comment'
                            emptySymbol="fa-regular fa-star"
                            fullSymbol="fa-solid fa-star" 
                            onChange={(e) => setRate(e)}
                            initialRating={rate}
                        />
                    </div>
                    <br/>
                    <div className='box-textarea-comment'>
                        <textarea style={{resize:"none"}} className='textarea-comment'value={remark} onChange={(e)=>setRemark(e.target.value)}  />
                    </div>
                    <br/>
                    <button  type="button" className='btn-comment' onClick={(e)=>handleAddReviewProduct(e)} >Bình luận</button>
                </>
            )}
            
        </div>
        <div className='box-reviews'>
            {getReviews.reviews?.content.length===0? <h1>Chưa có bình luận</h1>:
                (<>
                {getReviews.reviews?.content.map((review)=>(
                        <>
                        <Card css={{ p: "$6", mw: "400px" }}>
                            <Card.Header>
                                <img
                                alt="nextui logo"
                                src={
                                    review?.avatarImg?.substring(0).search('https://robohash.org/') === 0
                                    || review?.avatarImg?.substring(0).search('azurewebsites.net/') === 0
                                      ? review.avatarImg
                                      : `${process.env.REACT_APP_API_ENDPOINT}${review.avatarImg}`
                                  }
                                width="34px"
                                height="34px"
                                />
                                <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        {review.username}
                                    </Text>
                                </Grid>
                                <Grid xs={12}>
                                    <Rating
                                        className='rating-reviews'
                                        emptySymbol="fa-regular fa-star"
                                        fullSymbol="fa-solid fa-star"  
                                        initialRating={review.rate}
                                        readonly
                                    />
                                </Grid>
                                </Grid.Container>
                                <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text p css={{ lineHeight: "$xs" }}>
                                        <Moment fromNow locale='vi'>{review.date}</Moment>
                                    </Text>
                                </Grid>
                                </Grid.Container>
                            </Card.Header>
                            <Card.Body css={{ py: "$2" }}>
                                <Text>
                                {review.remark}
                                </Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        </> 

                    ))}
                    {getReviews.reviews?.content.length===0? (
                        <></>
                        ):<Pagination shadow animated={false} total={getReviews.reviews?.pageInfo?.totalPage} onChange={(e) => setPageNumber(e)} initialPage={1} />}    
                        </>)
                    }              

        </div>
    </section>
  )
}

export default ReMarks;