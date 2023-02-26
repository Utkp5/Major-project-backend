import React from 'react'
import Layout from '../../Layouts/Layout/Layout'
import "./Dashboard.css"
import Usermenu from "../../Layouts/Usermenu/Usermenu"

function Order() {
  return (
    <Layout title={'Hidden Brands - Dashboard Orders'}>
    
    <h2 className='user_d_h2'>Dashboard</h2>

      <div className='user_m_main'>

        <div className='user_m_sub'><Usermenu /></div>
        
        <div className='font_user'>
            <h2 className='user_m_sub1'>Orders</h2>
        </div>

      </div>


    </Layout>
  )
}

export default Order
