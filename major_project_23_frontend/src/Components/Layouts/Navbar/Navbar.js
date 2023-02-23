import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from 'react-router-dom'
import { HiMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { useAuth } from "../../Context/auth";

function Navbar() {

  const [menu,setmenu] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,user:null,token:''
    });
    localStorage.removeItem('auth');
  }
    
   




  return (
    <div className='navbar'>

      <div className='b_name'>HIDDEN BRAND</div>

      

      <ul className={menu ? 'navbar_mobile_css' : 'navbar_ul'}>
        <li> <NavLink to="/" id="a" >Home</NavLink> </li>
        <li> <NavLink to="/About" id="a" >About</NavLink> </li>
        <li><NavLink to="/Contact" id="a" >Contact</NavLink></li>
        <li><NavLink to="/Category" id="a" >Category</NavLink></li>
        {
          !auth.user ? (<>
            <li><NavLink to="/Signup" className="signin_button"><button className="navbar_button" >Sign up</button></NavLink></li>
            <li><NavLink to="/Signin" className="signin_button"><button className="navbar_button">Sign in</button></NavLink></li>
            </>) : (<>
              <li><NavLink to="/" onClick={handleLogout} className="signin_button"><button className="navbar_button">Logout</button></NavLink></li>
              </>)
        }
        <li><NavLink to="/Cart" id="a">Cart(0)</NavLink></li>
      </ul>

      <div className="menu_icon" onClick={() => setmenu(!menu)}>
        {menu ? <HiX size={26} color="white"/> :<HiMenu size={26} color="white"/>}
      </div> 


    </div>
  )
}

export default Navbar
