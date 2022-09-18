import React from 'react'
import { Collapse, Grid, Text, Avatar,Divider } from "@nextui-org/react";
const OrderDelivered = () => {
    
  return (
    <Grid.Container gap={3}>
    <Grid>
      <Collapse.Group splitted>
        <Collapse
          title={
             <span className='box-title-order'>
              <span className='id-order'>4ASFF43FF</span>
              <span className='status-order'> CHƯA XÁC NHẬN</span>
             </span>
              
          }
          subtitle="4 sản phẩm"
          contentLeft={
            <Avatar
              size="lg"
              src="https://thumbs.dreamstime.com/z/order-red-stamp-text-white-44561786.jpg"
              color="secondary"
              squared
            />
          }
        >
          <Divider css={{marginBottom:'2%'}}/>
          <div className='box-item-order f_flex'>
           <Avatar
              size="lg"
              src="https://thumbs.dreamstime.com/z/order-red-stamp-text-white-44561786.jpg"
              color="secondary"
              squared
            />
            <div className='item-main-content'>
            <div className='item-content f_flex'>
              <div className='item-name'>
               Chó Husky Chuẩn Phap
              </div>
              <div className='item-price'>
              {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000000)}
              </div>   
            </div>         
            <div className='item-amount'>
                2
              </div>   
            </div>
            
           </div>
           <Divider css={{marginBottom:'2%',marginTop:'2%'}}/>
           <div className='box-item-order f_flex'>
           <Avatar
              size="lg"
              src="https://thumbs.dreamstime.com/z/order-red-stamp-text-white-44561786.jpg"
              color="secondary"
              squared
            />
            <div className='item-main-content'>
            <div className='item-content f_flex'>
              <div className='item-name'>
               Chó Husky Chuẩn Phap
              </div>
              <div className='item-price'>
              {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000000)}
              </div>   
            </div>         
            <div className='item-amount'>
                2
              </div>   
            </div>
            
           </div>
           <Divider css={{marginTop:'2%'}} />
            <div className='footer-order' >
            Tổng tiền:&nbsp;{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000000)}
            </div>
        </Collapse>
        <Collapse
          title={
            <span className='box-title-order'>
              <span className='id-order'>4ASFF43FF</span>
              <span className='status-order'> CHƯA XÁC NHẬN</span>
           </span>
          }
          subtitle="4 sản phẩm"
          contentLeft={
            <Avatar
              size="lg"
              src="https://thumbs.dreamstime.com/z/order-red-stamp-text-white-44561786.jpg"
              color="secondary"
              squared
            />
          }
        >
          <Divider css={{marginBottom:'2%'}} />
         
           <div className='box-item-order f_flex'>
           <Avatar
              size="lg"
              src="https://thumbs.dreamstime.com/z/order-red-stamp-text-white-44561786.jpg"
              color="secondary"
              squared
            />
            <div className='item-main-content'>
            <div className='item-content f_flex'>
              <div className='item-name'>
               Chó Husky Chuẩn Phap
              </div>
              <div className='item-price'>
              {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000000)}
              </div>   
            </div>         
            <div className='item-amount'>
                2
              </div>   
            </div>
            
           </div>
           <Divider css={{marginBottom:'2%',marginTop:'2%'}}/>
           <div className='box-item-order f_flex'>
           <Avatar
              size="lg"
              src="https://thumbs.dreamstime.com/z/order-red-stamp-text-white-44561786.jpg"
              color="secondary"
              squared
            />
            <div className='item-main-content'>
            <div className='item-content f_flex'>
              <div className='item-name'>
               Chó Husky Chuẩn Phap
              </div>
              <div className='item-price'>
              {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000000)}
              </div>   
            </div>         
            <div className='item-amount'>
                2
              </div>   
            </div>
            
           </div>
           <Divider  css={{marginTop:'2%'}} />
            <div className='footer-order' >
            Tổng tiền:&nbsp;{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000000)}
            </div>
            
        </Collapse>
      </Collapse.Group>
    </Grid>
  </Grid.Container>
    
  )
}

export default OrderDelivered