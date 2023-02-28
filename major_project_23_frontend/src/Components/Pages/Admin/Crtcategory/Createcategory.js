import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Adminmenu from "../../../Layouts/Adminmenu/Adminmenu";
import Layout from "../../../Layouts/Layout/Layout";
import "../Admindashboard.css";

function Createcategory() {
  const [categories, setcategories] = useState([]);

  const getcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/category/get-category"
      );
      if (data.success) {
        setcategories(data.Category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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

          <div className="admin_m_sub2">
            <div>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td><button>Edit</button></td>
                    </tr>
                  </>
                ))}
              </tbody>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Createcategory;
