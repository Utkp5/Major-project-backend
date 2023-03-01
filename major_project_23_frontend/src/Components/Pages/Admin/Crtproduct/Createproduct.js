import React, { useEffect, useState } from 'react'
import Adminmenu from '../../../Layouts/Adminmenu/Adminmenu';
import Layout from '../../../Layouts/Layout/Layout'
import "../Admindashboard.css";
import "./Createproduct.css";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
const {Option} =  Select;

function Createproduct() {

  const [categories,setcategories] = useState([]);
  const [name,setname] = useState("")
  const [description,setdescription] = useState("")
  const [price,setprice] = useState("")
  const [quantity,setquantity] = useState("")
  const [shipping,setshipping] = useState("")



  // display category
  const getcategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/category/get-category");
      if (data?.success) {
        setcategories(data?.Category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getcategories();
  },[])


  return (
    <Layout title={'Hidden Brands - Create products'}>

    <h2 className='admin_d_h2'>Admin Dashboard</h2>

      <div className="admin_m_main">

        <div className="admin_m_sub"><Adminmenu /></div>

        <div className="admin_m_sub1 font_user">
          <h2 className='admin_m_h2'>Products</h2>

          <div className='admin_m_sub2'>
            <Select bordered={false} showSearch size="large" placeholder="select a category" onChange={(value) => {setcategories(value)}} >
            {
              categories.map(c => (
                <Option key={c._id} value={c.name}>{c.name}</Option>
              ))
            }
            </Select>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Createproduct
