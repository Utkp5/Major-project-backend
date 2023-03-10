import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Adminmenu.css";

function Adminmenu() {
  return (
      <>
           <NavLink className='admin_m_nav' to="/Dashboard/admin/Create-Products"><button className='admin_m_btn'>Create Products</button></NavLink>
           <NavLink className='admin_m_nav' to="/Dashboard/admin/Create-Category"><button className='admin_m_btn'>Create Category</button></NavLink>
           <NavLink className='admin_m_nav' to="/Dashboard/admin/Products"><button className='admin_m_btn'>Products</button></NavLink>
           <NavLink className='admin_m_nav' to="/Dashboard/admin/Orders"><button className='admin_m_btn'>Orders</button></NavLink>
           <NavLink className='admin_m_nav' to="/Dashboard/admin/Users"><button className='admin_m_btn'>Users</button></NavLink>
      </>
  )
}

export default Adminmenu
