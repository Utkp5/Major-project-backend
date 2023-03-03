import React, { useEffect, useState } from "react";
import Adminmenu from "../../Layouts/Adminmenu/Adminmenu.js";
import Layout from "../../Layouts/Layout/Layout";
import "./Admindashboard.css";
import "../Admin/Crtproduct/Createproduct.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Products() {

    const [prods,setprods] = useState([]);

    const getProducts = async () => {
        try {
            
            const {data} = await axios.get('http://localhost:5000/api/product/Get-product')
            console.log(data);
            setprods(data.getproducts);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getProducts();
    },[])

  return (
    <Layout title={'Hidden Brands - All products'}>

      <h2 className="admin_d_h2">Admin Dashboard</h2>

      <div className="admin_m_main">
        <div className="admin_m_sub"><Adminmenu /></div>

        <div className="admin_m_sub1 font_user">
          <h2 className="admin_m_h2">All Products</h2>
          <div className="allproducts">
          {prods?.map((p) => (
            <Link key={p._id} to={`/Dashboard/admin/Products/${p.slug}`} className="product_link">
              <div className="card" style={{ width: "18rem" }}>
                <img src={`http://localhost:5000/api/product/product-photo/${p._id}`} className="card_img" alt={p.name}/>
                <div className="card_body">
                  <h5 className="card_title">{p.name}</h5>
                  <p  className="card_des">{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Products;
