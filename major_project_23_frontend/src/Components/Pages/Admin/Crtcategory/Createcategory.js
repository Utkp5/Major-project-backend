import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Adminmenu from "../../../Layouts/Adminmenu/Adminmenu";
import Categoryform from "../../../Forms/Categoryform";
import Layout from "../../../Layouts/Layout/Layout";
import "../Admindashboard.css";
import "./Createcategory.css";
import {Modal} from "antd"
import axios from "axios";

function Createcategory() {

  const [categories, setcategories] = useState([]);
  const [name,setname] = useState("")
  const [visible,setvisible] = useState(false);
  const [selected,setselected] = useState(null);
  const [updatedName,setupdatedName] = useState("");


  //create category 
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const {data} = await axios.post('http://localhost:5000/api/category/Create-category',{name})
      if (data?.success) {
        toast.success(`${name} category is created`);
        getcategories();
      }
      else {
        toast.error(data.message);  
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

// display category
  const getcategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/category/get-category");
      if (data.success) {
        setcategories(data.Category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  //update category
  const handleUpdate = async(e) => {
    try {
      e.preventDefault();
      const {data} = await axios.put(`http://localhost:5000/api/category/Update-category/${selected._id}`, {name:updatedName})
      if (data.success) {
        toast.success(`${name} is Updated successfully`) 
        setselected(null);
        setupdatedName("");
        setvisible(false);
        getcategories();
      }
      else {
        toast.error(data.message);  
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  //delete category
  const handleDelete = async(pId) => {
    try {
      const {data} = await axios.delete(`http://localhost:5000/api/category/Delete-category/${pId}`)
      if (data.success) {
        toast.success(`Category is Deleted successfully`) 
        getcategories();
      }
      else {
        toast.error(data.message);  
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }


  useEffect(() => {
    getcategories();
  }, []);



  return (
    <Layout title={"Hidden Brands - Create Category"}>
      <h2 className="admin_d_h2">Admin Dashboard</h2>

      <div className="admin_m_main">
        <div className="admin_m_sub">
          <Adminmenu />
        </div>

        <div className="admin_m_sub1 font_user">
          <h2 className="admin_m_h2">Manage Categories</h2>

            <Categoryform handleSubmit={handleSubmit} value={name} setvalue={setname}/>

          <div className="admin_m_sub2">
            <div id="admin_table">
              <thead>
                <tr>
                  <th className="admin_th">Name</th>
                  <th className="admin_th">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id} className="admin_td">{c.name}</td>
                      <td className="admin_td">
                      <button className="admin_btn" onClick={() => {setvisible(true); setupdatedName(c.name); setselected(c)}}>Edit</button>
                      <button className="admin_btn admin_btn_d" onClick={() => handleDelete(c._id) }>Delete</button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </div>
          </div>
          <Modal onCancel={() => setvisible(false) } visible={visible} footer={null}>
           <Categoryform value={updatedName} setvalue={setupdatedName} handleSubmit={handleUpdate} />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default Createcategory;
