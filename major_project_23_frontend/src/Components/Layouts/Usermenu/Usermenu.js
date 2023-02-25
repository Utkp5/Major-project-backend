import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../Pages/User/Dashboard.css";

function Usermenu() {
  return (
    <>
    <NavLink className='user_m_nav' to="/Dashboard/user/Profile"><button className='user_m_btn'>Profile</button></NavLink>
    <NavLink className='user_m_nav' to="/Dashboard/user/Orders"><button className='user_m_btn'>Orders</button></NavLink>
    </>
  )
}

export default Usermenu
