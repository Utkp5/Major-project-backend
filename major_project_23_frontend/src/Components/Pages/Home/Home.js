import React, { useEffect, useState } from "react";
// import { useAuth } from "../../Context/auth";
import Layout from "../../Layouts/Layout/Layout";
import "./Home.css";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Prices } from "../../Prices";
// import { toast } from "react-hot-toast";

function Home() {

  // const [auth,setauth] = useAuth();
  const [prods,setprods] = useState([]);
  const [categories,setcategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setradio] = useState([]);


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

  


//filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  }


  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);


  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/product/Product-filter", {
        checked,
        radio,
      });
      setprods(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"Hidden Brands - Shop now"}>
      <div className="parent">

         <div className="div1">
            <h4 className="home_h4">Filter by products</h4>
            <div className="filter">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className="checkb">{c.name}</Checkbox>
            ))}
            </div>
            <h4 className="home_h4">Filter by price</h4>
            <div className="filter">
            <Radio.Group onChange={(e) => setradio(e.target.value)} className="radio">
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
         </div>

         <div className="div2">
            <h4 className="home_h4p">Products</h4>

            <div className="div_sub2">
            {prods?.map((p) => (
                <div className="card" style={{ width: "18rem" }}>
                  <img src={`http://localhost:5000/api/product/Product-photo/${p._id}`} className="card_img" alt={p.name}/>
                  <div className="card_body">
                    <h4 className="card_title">{p.name}</h4>
                    <p  className="card_des">{p.description.substring(0,30)}...</p>
                    <p  className="card_price">₹&nbsp;{p.price}</p>
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
