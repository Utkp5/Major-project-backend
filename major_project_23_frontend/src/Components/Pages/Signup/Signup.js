import React from 'react'
import Layout from "../../Layouts/Layout/Layout.js";
import "./Signup.css";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import gif from "../Assets/signup.gif";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Signup() {

  const [firstName,setfirstName] = useState();
  const [lastName,setlastName] = useState();
  const [Email,setEmail] = useState();
  const [password,setpassword] = useState();
  const [phone,setphone] = useState();
  const [address,setaddress] = useState();
  const [answer,setanswer] = useState();

  const Navigate = useNavigate()


  const handleSubmit = async (e) => {


    try {

      const user = {firstName,lastName,Email,password,phone,address,answer};

      const res =  await axios.post('http://localhost:5000/api/Register',user)
      if(res && res.data.success) 
      {
        toast.success(res.data && res.data.message);
        Navigate("/Signin")
      }
      else {
        toast.error(res.data.message);
      }
      
    } catch (error) {
      toast.error("Something went wrong")      
    }

  }


  return (
    <Layout title={'Hidden Brands - Signup'}>
    
          <div class="parent">

          <div>
            <img src={gif} alt="logo" className="signup_gif" />
          </div>

          <div class="login">
            <h2 id="sgn_h2">Create Account</h2>
            <div className="signupform">
              <input className="input_signup" type="text" value={firstName} placeholder="First Name" onChange={(e) => {
                setfirstName(e.target.value)
              }} required/>
              <input className="input_signup" id="input_signup" type="text" value={lastName}  placeholder="Last Name" onChange={(e) => {
                setlastName(e.target.value)
              }} required/>
              <br />
              <input className="input_signup" type="email" value={Email} placeholder="E-mail Address" onChange={(e) => {
                setEmail(e.target.value)
              }} required/>
              <input className="input_signup" id="input_passwd" type="password" value={password} placeholder="Password" onChange={(e) => {
                setpassword(e.target.value)
              }} required/>
              <br />
              <input className="input_signup" type="number" maxLength="10" value={phone} placeholder="Phone Number" onChange={(e) => {
                setphone(e.target.value)
              }} required/>
              <input className="input_signup" id="input_add" type="text" value={address} placeholder="Address" onChange={(e) => {
                setaddress(e.target.value)
              }} required/>
              <input className="input_signup" id="input_ad" type="text" value={answer} placeholder="Your favourite place*" onChange={(e) => {
                setanswer(e.target.value)
              }} required/>
              <div class="remember_form">
                <span><input type="checkbox" /> &nbsp;Remember me</span>
                <span>You are creating an account, and agree to Hidden brand <NavLink className="sgn_navlink">Terms of Service</NavLink> and <NavLink className="sgn_navlink">Privacy Policy</NavLink></span>
                <NavLink to="/Signin" className="signin_nav">Already a member</NavLink>
              </div>
              <button type="submit" className="signup_btn" onClick={() => {
                handleSubmit();
              }}>Sign up</button>
            </div>
          </div>

        </div>
        
    </Layout>

  );
}

export default Signup
