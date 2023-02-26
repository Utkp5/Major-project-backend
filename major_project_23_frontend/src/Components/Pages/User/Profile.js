import React from 'react'
import Layout from '../../Layouts/Layout/Layout'
import "./Dashboard.css"
import Usermenu from "../../Layouts/Usermenu/Usermenu"
import { useAuth } from '../../Context/auth'


function Profile() {

  const [auth] = useAuth();

  return (
    <Layout title={'Hidden Brands - Dashboard Profile'}>
    
    <h2 className='user_d_h2'>Dashboard</h2>

    <div className='user_m_main'>

      <div className='user_m_sub'><Usermenu /></div>
      
      <div className='font_user'>
          <h2 className='user_m_sub1'>Profile</h2>
          <div className='user_m_sub2'>
            <p className='user_m_sub_p'>Name : {auth?.user?.firstName}</p>
            <p className='user_m_sub_p'>Email : {auth?.user?.email}</p>
          </div>
      </div>

    </div>

    </Layout>
  )
}

export default Profile
