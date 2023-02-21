import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div className='navbar'>

      <div className='b_name'></div>

      <ul>
        <li><NavLink to="/">Home</NavLink></li>
      </ul>

      <ul className={menu ? 'navbar_mobile_css' : 'navbar_ul'}>
        <li> <NavLink to="/">Home</NavLink> </li>
        <li> <NavLink to="/About">About</NavLink> </li>
        <li><NavLink to="/Contact" id="a" >Contact</NavLink></li>
        {!localStorage.getItem("token")? // ye command signup button ko hide krne ke liye hai.
        <li><NavLink to="/Signup" className="signin_button"><button className="navbar_button" >Sign up</button></NavLink></li>
        :null
        }
        <li><NavLink to={inoutDirection} className="signin_button"><button className="navbar_button" onClick={() => {
        Handlechange();
        }}>{inout}</button></NavLink></li>
      </ul>

      <div className="menu_icon" onClick={() => setmenu(!menu)}>
        {menu ? <HiX size={26} color="white"/> :<HiMenu size={26} color="white"/>}
      </div> 

      
    </div>
  )
}

export default Navbar
