import React, { useState } from "react";
import Layout from "../../Layouts/Layout/Layout";
import "./Signin.css"
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import img2 from "../Assets/login.avif";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/auth";


function Signin() {

  const [Email,setEmail] = useState();
  const [password,setpassword] = useState();
  const [auth, setAuth] = useAuth();

  const Navigate = useNavigate()
  const location = useLocation();

  const handleSubmitlogin = async (e) => {

    try {
      
      const user = {Email,password}

      const res = await axios.post('https://persian-blue-goose-gear.cyclic.app/api/Login',user)

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        Navigate(location.state || '/');
      }
      else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }


  }


  return (
    <Layout title={'Hidden Brands - Signin'}>

    <div class="parent1">
            <img src={img2} alt="logo" className="signin_gif"/>

        <div class="login1">

            <h2 id="sgnin_h3">Hey Welcome Back 👋</h2><br />
            <p className="sgnin_p">Enter The Information You Entered while Registering!</p>
            <div className="signinform">
            <input className="input_signin" type="email" value={Email} placeholder="E-mail Address" onChange={(e) => {
              setEmail(e.target.value);
            }} required/>
            <br />
            <input className="input_signin" type="password" value={password} placeholder="Password" onChange={(e) => {
              setpassword(e.target.value);
            }} required/>
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
