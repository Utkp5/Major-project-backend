import React from "react";
import Layout from "../../Layouts/Layout/Layout";
import "./Home.css";

function Home() {
  return (
    <Layout title={"Hidden Brands - Shop now"}>
      <div className="parent">
         <div className="div1"><h4 className="home_h4">Filter products</h4></div>
         <div className="div2">
            <h4 className="home_h4">Products</h4>
            <div className="div_sub2">
               
            </div>
         </div>
      </div>
    </Layout>
  );
}

export default Home;
