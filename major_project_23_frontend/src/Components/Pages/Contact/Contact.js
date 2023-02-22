import React from 'react'
import "./Contact.css";
import Layout from '../../Layouts/Layout/Layout'
import cont_img from "../Assets/support.avif";
import { FiArrowUpRight } from "react-icons/fi";


function Contact() {

  let iconStyles = { color: "white"};


  return (
    <Layout>

      <div id="cont_div">
        <img src="" alt="" className="cont_banner" />
      </div>

        <div id="cont_div_main">
          <div className="cont_div_sub">
            <p className="cont_p">Love to hear from you 📚,<br />Get in touch 👋</p>
            <form action="https://formspree.io/f/mqkozzop" method="POST">
            <input className="cont_inpt"  name="Name" type="text" placeholder="Name"/>
            <br/>
            <input className="cont_inpt"  name="Email" type="email" placeholder="E-mail Address"/>
            <br />
            <input className="cont_inpt"  name="Phonenumber"  type="number" placeholder="Phone Number"/>
            <br />
            <textarea name="Message" id="" cols="50" rows="8" className="cont_inpt" placeholder="Message"></textarea>
            <button type="submit" className="cont_btn">Just Send <FiArrowUpRight size={26} style={iconStyles}/></button>
            </form>
          </div>
        <div>
            <img src={cont_img} alt="" className="cont_img"/>
        </div>
        </div>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55967.15395002581!2d77.1613460691301!3d28.75099568801322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01d4f896099f%3A0xd856071fa2f0c441!2sBurari%2C%20Delhi%2C%20110084!5e0!3m2!1sen!2sin!4v1671101125301!5m2!1sen!2sin"       width="100%" height="350" style={{border : 0}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

    </Layout>
  )
}

export default Contact
