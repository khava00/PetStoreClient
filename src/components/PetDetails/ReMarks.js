import React from 'react'
import "./PetDetails.css"
import {BiCommentCheck} from "react-icons/bi"
import { Card, Divider, Grid, Pagination, Text, Textarea} from "@nextui-org/react";
import Rating from "react-rating";
const ReMarks = () => {
  return (
    <section className='remarks container'>
        <div className='reviews  f_flex'>
            <BiCommentCheck style={{fontSize:"20px",color:"#e94560"}}/>
            <h1>Đánh giá</h1>
        </div>
        <div className='box-comment'>
            <div className='box-rating-comment'>
                <Rating
                    className='rating-comment'
                    emptySymbol="fa-regular fa-star"
                    fullSymbol="fa-solid fa-star"
                    
                />
            </div>
            <br/>
            <div className='box-textarea-comment'>
                <textarea className='textarea-comment' >
                    bbd
                </textarea>
            </div>
            <br/>
            <button  type="button" className='btn-comment' >Bình luận</button>
        </div>
        <div className='box-reviews'>

            <Card css={{ p: "$6", mw: "400px" }}>
                <Card.Header>
                    <img
                    alt="nextui logo"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width="34px"
                    height="34px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                        Next UI
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{ color: "$accents8" }}>nextui.org</Text>
                    </Grid>
                    </Grid.Container>
                </Card.Header>
                <Card.Body css={{ py: "$2" }}>
                    <Text>
                    Make beautiful websites regardless of your design experience.
                    </Text>
                </Card.Body>
            </Card>
            <br/>
            <Card css={{ p: "$6", mw: "400px" }}>
                <Card.Header>
                    <img
                    alt="nextui logo"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width="34px"
                    height="34px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                        Next UI
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{ color: "$accents8" }}>nextui.org</Text>
                    </Grid>
                    </Grid.Container>
                </Card.Header>
                <Card.Body css={{ py: "$2" }}>
                    <Text>
                    Make beautiful websites regardless of your design experience.
                    </Text>
                </Card.Body>
            </Card>
            <br/>
            <Pagination total={5} initialPage={1} />;
        </div>


    </section>
  )
}

export default ReMarks;