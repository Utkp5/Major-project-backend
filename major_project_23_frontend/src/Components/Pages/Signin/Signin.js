import React, { useState } from "react";
import Layout from "../../Layouts/Layout/Layout";
import "./Signin.css"
import { NavLink } from "react-router-dom";
import img2 from "../Assets/login.avif";



function Signin() {

  const [userEmail,setuserEmail] = useState();
  const [password,setpassword] = useState();

  const handleSubmitlogin = async () => {

  }


  return (
    <Layout title={'Hidden Brands - Signin'}>

    <div class="parent1">
            <img src={img2} alt="logo" className="signin_gif"/>

        <div class="login1">

            <h2 id="sgnin_h3">Hey Welcome Back 👋</h2><br />
            <p className="sgnin_p">Enter The Information You Entered while Registering!</p>
            <div className="signinform">
            <input className="input_signin" type="email" name="userEmail" placeholder="E-mail Address" onChange={(e) => {
              setuserEmail(e.target.value);
            }} />
            <br />
            <input className="input_signin" type="password" name="password" placeholder="Password" onChange={(e) => {
              setpassword(e.target.value);
            }} />
            <div class="remember_form">
              <NavLink to="/Forgotpassword" className="signin_nav">Forgot Password ?</NavLink>            
            </div>
            <button type="submit" className="signin_btn" onClick={() => {
              handleSubmitlogin();
            }}>Log in</button>
            </div>
            
        </div>
    </div>


    </Layout>
  )
}

export default Signin
