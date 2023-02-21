import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";


function Footer() {
  return (
    <div className="footer">

      <div className="row primary">
        <div className="column about">
          <h3 className="fo_h3">Connect</h3>
          <p><i className="fa fa-map-marker" aria-hidden="true"></i>Burari, Sant Nagar Delhi-84 India</p>
          <div className="social">
            <FaFacebookSquare color="lavender" size={32} className="fo_icon"/>
            <FaTwitterSquare color="lavender" size={32} className="fo_icon"/>
            <FaLinkedin color="lavender" size={32} className="fo_icon"/>
            <FaInstagramSquare color="lavender" size={32} className="fo_icon"/>
          </div>
        </div>

        <div className="column link">
          <h3 className="fo_h3">Links</h3>
          <ul className="fo_ul">
            <li className="fo_li"><NavLink className="fo_navlink" to="/">Home</NavLink></li>
            <li className="fo_li"><NavLink className="fo_navlink" to="/About">About</NavLink></li>
            <li className="fo_li"><NavLink className="fo_navlink" to="/Contact">Contact</NavLink></li>
            <li className="fo_li"><NavLink className="fo_navlink" to="/Category">Category</NavLink></li>
          </ul>
        </div>

        <div className="column subscribe">
          <h3 className="fo_h3">Newsletter</h3>
          <div><input className="fo_input" type="email" placeholder="Your email id here" /><button className="fo_btn">Subscribe</button></div>
        </div>

        <div className="copyright">
        <div className="fo_menu">
            <div className="fo_menu_sub">
            <NavLink className="fo_menu_nav" to="/">Home</NavLink>
            <NavLink className="fo_menu_nav" to="/">F.A.Q</NavLink>
            <NavLink className="fo_menu_nav" to="/">Cookies Policy</NavLink>
            <NavLink className="fo_menu_nav" to="/">Terms Of Service</NavLink>
            <NavLink className="fo_menu_nav" to="/Contact">Support</NavLink>
            </div>
            <p className="fo_p">Copyright &copy; 2023 Pandit Utkarsh</p>
         </div>
        </div>

      </div>

      



    </div>
  );
}

export default Footer;
