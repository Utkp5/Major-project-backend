import React, { useState, useEffect } from "react";
import Layout from "../../Layouts/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Home/Home.css";
import "./Productdetails.css";

function Productdetails() {

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);


  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);


  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/product/Single-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };


  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/product/Related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"Hidden Brands - Product details"}>

        <div className="pd_container">

        <div className="pd_div1">
          <img src={`http://localhost:5000/api/product/Product-photo/${product._id}`} className="pd_card_img" alt={product.name}/>
        </div>

        <div className="pd_div2">
          <h1 className="text-center">Product Details</h1>
          <h3>{product.name}</h3>
          <h3>{product.description}</h3>
          <h3>₹&nbsp;{product.price}</h3>
          <h3>{product?.category?.name} Category</h3>
          <button class="pd_btn">Add to cart</button>
        </div>

      </div>

      <hr />

      <h2 className="Ptext_center">Similar Products</h2>
      <div className="pd1_container">
        {relatedProducts.length < 1 && (
          <p className="Ptext_center">No Similar Products found</p>
        )}
        <div {...relatedProducts.length < 1 ? "div_sub2" : "div_none"}>
            {relatedProducts?.map((p) => (
                <div className="card" style={{ width: "18rem" }}>
                  <img src={`http://localhost:5000/api/product/Product-photo/${p._id}`} className="card_img" alt={p.name}/>
                  <div className="card_body">
                    <h4 className="card_title">{p.name}</h4>
                    <p  className="card_des">{p.description}</p>
                    <p  className="card_price">₹&nbsp;{p.price}</p>
                    <button className="card_btn card_bt">Add to cart</button>
                  </div>
                </div>
            ))}
        </div>
      </div>


    </Layout>
  )
}

export default Productdetails
