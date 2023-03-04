import React, { useEffect, useState } from "react";
// import { useAuth } from "../../Context/auth";
import Layout from "../../Layouts/Layout/Layout";
import "./Home.css";
import { Checkbox } from "antd";
import axios from "axios";
// import { toast } from "react-hot-toast";

function Home() {

  // const [auth,setauth] = useAuth();
  const [prods,setprods] = useState([]);
  const [categories,setcategories] = useState([])

  //display category
  const getallcategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/category/get-category");
      if (data.success) {
        setcategories(data.Category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallcategories();
    // eslint-disable-next-line
  },[])

  //display products
  const getProducts = async () => {
    try {
        
        const {data} = await axios.get('http://localhost:5000/api/product/Get-product')
        setprods(data.getproducts);
    } catch (error) {
        console.log(error);
    }
}

  useEffect(() => {
    getProducts();
  },[])


  const handleFilter = async() => {
    
  }


  return (
    <Layout title={"Hidden Brands - Shop now"}>
      <div className="parent">

         <div className="div1">
            <h4 className="home_h4">Filter products</h4>
            ok
            <div>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
            ))}
            </div>
         </div>

         <div className="div2">
            <h4 className="home_h4">Products</h4>

            <div className="div_sub2">
            {prods?.map((p) => (
                <div className="card" style={{ width: "18rem" }}>
                  <img src={`http://localhost:5000/api/product/Product-photo/${p._id}`} className="card_img" alt={p.name}/>
                  <div className="card_body">
                    <h4 className="card_title">{p.name}</h4>
                    <p  className="card_des">{p.description}</p>
                    <button className="card_btn">More details</button>
                    <button className="card_btn card_bt">Add to cart</button>
                  </div>
                </div>
            ))}
            </div>
         </div>

      </div>
    </Layout>
  );
}

export default Home;
