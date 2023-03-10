import React, { useEffect, useState } from 'react'
import Layout from '../../Layouts/Layout/Layout'
import "./Dashboard.css"
import Usermenu from "../../Layouts/Usermenu/Usermenu"
import { useAuth } from '../../Context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Profile() {

  const [auth,setauth] = useAuth();

  const [firstName,setfirstName] = useState("");
  const [Email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const [phone,setphone] = useState("");
  const [address,setaddress] = useState("");
  
  
  useEffect(() => {
    const {firstName,Email,phone,address} = auth?.user;
    setfirstName(firstName);
    setEmail(Email);
    setphone(phone);
    setaddress(address);

  },[auth?.user])


  const handleSubmit = async (e) => {

    try {

      const user = {firstName,Email,password,phone,address};

      const res =  await axios.post('http://localhost:5000/api/Register',user)
      // if(res && res.data.success) 
      // {
      //   toast.success(res.data && res.data.message);
      //   Navigate("/Signin")
      // }
      // else {
      //   toast.error(res.data.message);
      // }
      
    } catch (error) {
      toast.error("Something went wrong")      
    }

  }




  return (
    <Layout title={'Hidden Brands - Dashboard Profile'}>
    
    <h2 className='user_d_h2'>Dashboard</h2>

    <div className='user_m_main'>

      <div className='user_m_sub'><Usermenu /></div>
      
      <div className='font_user'>
          <h2 className='user_m_sub1'>Profile</h2>
          <div className="profile_form">
              <input className="profile_input" type="text" name="firstName" placeholder="First Name" onChange={(e) => {
                setfirstName(e.target.value)
              }} />
              <input className="profile_input" type="email" name="Email" placeholder="E-mail Address" onChange={(e) => {
                setEmail(e.target.value)
              }} />
              <input className="profile_input" id="input_passwd" type="password" name="password" placeholder="Password" onChange={(e) => {
                setpassword(e.target.value)
              }} />
              <input className="profile_input" type="number" maxLength="10" name="phone" placeholder="Phone Number" onChange={(e) => {
                setphone(e.target.value)
              }} />
              <input className="profile_input" id="input_add" type="text" name="address" placeholder="Address" onChange={(e) => {
                setaddress(e.target.value)
              }} />
              <button type="submit" className="profile_btn" onClick={() => {handleSubmit()}}>Update profile</button>
            </div>
      </div>

    </div>

    </Layout>
  )
}

export default Profile
