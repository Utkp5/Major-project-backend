import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">

      <div className="row primary">
        <div className="column about">
          <h3 className="fo_h3">Connect</h3>
          <p><i className="fa fa-map-marker" aria-hidden="true"></i>Burari, Sant Nagar Delhi-84 India</p>
          <div className="social">
            <i className="fa fa-facebook-square fo_i" ></i>
            <i className="fa fa-twitter-square fo_i" ></i>
            <i className="fa fa-linkedin-square fo_i" ></i>
            <i className="fa fa-instagram fo_i" ></i>
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
      </div>

    </div>
  );
}

export default Footer;
