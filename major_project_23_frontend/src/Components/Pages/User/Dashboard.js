import React from 'react'
import Layout from '../../Layouts/Layout/Layout'
import { NavLink } from 'react-router-dom'
import "./Dashboard.css";

function Dashboard() {
  return (
    <Layout title={'Hidden Brands - Dashboard'}>

    <h2 className='user_d_h2'>Dashboard</h2>

      <div className='user_m_main'>

        <div className='user_m_sub'><Dashboard /></div>
        
        <div className='user_m_sub1'></div>
      </div>

    </Layout>
  )
}

export default Dashboard
