import React,{useState} from "react";
import Layout from "../../Layouts/Layout/Layout";
import "../Signin/Signin.css";
import { useNavigate } from "react-router-dom";
import img2 from "../Assets/login.avif";
import axios from "axios";
import { toast } from "react-hot-toast";


function Forgotpass() {

  const [Email,setEmail] = useState();
  const [answer,setanswer] = useState();
  const [newPassword,setnewPassword] = useState();

  const Navigate = useNavigate()

  const handleForgtpass = async (e) => {

    try {
      
      const user = {Email,newPassword,answer}

      const res = await axios.post('http://localhost:5000/api/Forgotpassword',user)

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        Navigate('/');
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
    <Layout title={"Hidden Brands - Forgot password"}>

      <div class="parent1">

        <img src={img2} alt="logo" className="signin_gif" />

        <div class="login1">
          <h2 id="sgnin_h3">Hey Welcome Back 👋</h2>
          <br />
          <p className="sgnin_p">Enter The Information You Entered while Registering!</p>
          <div className="signinform">
            <input className="input_signin" type="email" name="userEmail" placeholder="E-mail Address" onChange={(e) => {
                setEmail(e.target.value);
              }} required/>
            <br />
            <input className="input_signin" type="text" name="answer" placeholder="Your favourite place" onChange={(e) => {
                setanswer(e.target.value);
              }} required/>
            <br />
            <input className="input_signin" type="password" name="newPassword" placeholder="New Password" onChange={(e) => {
                setnewPassword(e.target.value);
              }}required/>
            <button type="submit" className="signin_btn" onClick={() => {
                handleForgtpass();
              }}>
              Reset password
            </button>
          </div>
        </div>
      </div>


    </Layout>
  );
}

export default Forgotpass;
