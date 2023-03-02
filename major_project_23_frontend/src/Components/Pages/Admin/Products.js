import React, { useEffect, useState } from "react";
import Adminmenu from "../../Layouts/Adminmenu/Adminmenu.js";
import Layout from "../../Layouts/Layout/Layout";
import "./Admindashboard.css";
import "../Admin/Crtproduct/Createproduct.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Products() {

    const [products,setproduct] = useState([]);

    const getProducts = async () => {
        try {
            
            const {data} = await axios.get('http://localhost:5000/api/product/Get-product')
            if (data?.success) {
                setproduct(data?.Products);
            }
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
           {products?.map((p) => (
                 <Link key={p._id} to={`/Dashboard/admin/Products/${p.slug}`}>
                 <h3>{p.name}</h3>
                 </Link>
            ))
           }
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Products;
