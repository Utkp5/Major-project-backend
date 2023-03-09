import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout/Layout'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../Home/Home.css";
import "./Category.css";

function Category() {

  const params = useParams();
  const navigate = useNavigate();
  const [prods, setProds] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/Product-category/${params.slug}`
      );
      setProds(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'Hidden Brands - Category'}>
    <div className="div2">
    <h4 className="home_h4p">Category - {category?.name}</h4>
    <div className="div_sub2">
    {prods?.map((p) => (
        <div className="card" style={{ width: "18rem" }}>
          <img src={`http://localhost:5000/api/product/Product-photo/${p._id}`} className="card_img" alt={p.name}/>
          <div className="card_body">
            <h4 className="card_title">{p.name}</h4>
            <p  className="card_des">{p.description.substring(0,30)}...</p>
            <p  className="card_price">₹&nbsp;{p.price}</p>
            <button className="card_btn" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
            <button className="card_btn card_bt">Add to cart</button>
          </div>
        </div>
    ))}
    </div>
</div>
    </Layout>
  )
}

export default Category
