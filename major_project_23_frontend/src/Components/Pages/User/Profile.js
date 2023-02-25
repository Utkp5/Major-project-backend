import React from 'react'
import Layout from '../../Layouts/Layout/Layout'
import "./Dashboard.css"
import Usermenu from "../../Layouts/Usermenu/Usermenu"


function Profile() {
  return (
    <Layout title={'Hidden Brands - Dashboard Profile'}>
    
    <h2 className='user_d_h2'>Dashboard</h2>

    <div className='user_m_main'>

      <div className='user_m_sub'><Usermenu /></div>
      
      <div className='user_m_sub1'>Profile</div>
    </div>

    </Layout>
  )
}

export default Profile
