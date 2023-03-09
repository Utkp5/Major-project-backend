import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, Link } from 'react-router-dom'
import { HiMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useAuth } from "../../Context/auth";
import {Badge} from "antd"
import { useCart } from "../../Context/cart";
import useCategory from "../../Hooks/useCategory";

function Navbar() {

  const [menu,setmenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

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
        <div className="dropdown">
            <li><NavLink to="/Categories" id="a">Category</NavLink></li>
            <div className="dropdown-content">
              <li className="cat_li"><Link className="cat_link" to={"/Categories"}>All Categories</Link></li>
              {categories?.map((c) => (
                <li className="cat_li"><Link className="cat_link" to={`/Category/${c.slug}`}>{c.name}</Link></li>
              ))}
            </div>
        </div>
        {
          !auth.user ? (<>
            <li><NavLink to="/Signup" className="signin_button"><button className="navbar_button" >Sign up</button></NavLink></li>
            <li><NavLink to="/Signin" className="signin_button"><button className="navbar_button">Sign in</button></NavLink></li>
            </>) : (
              <div className="dropdown">
                  <button className="dropbtn">{auth?.user?.firstName}<HiOutlineChevronDown className="dropdown_icon"/></button>
                    <div className="dropdown-content" >
                      <NavLink to={`/Dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown_navlink">Profile</NavLink> 
                      <li><NavLink to="/" onClick={handleLogout} className="dropdown_navlink">Logout</NavLink></li>
                    </div>
              </div>

              )
        }
        <li><Badge count={cart?.length} showZero><NavLink to="/Cart" id="a">Cart</NavLink></Badge></li>
      </ul>


      <div className="menu_icon" onClick={() => setmenu(!menu)}>
        {menu ? <HiX size={26} color="white"/> :<HiMenu size={26} color="white"/>}
      </div> 


    </div>
  )
}

export default Navbar

