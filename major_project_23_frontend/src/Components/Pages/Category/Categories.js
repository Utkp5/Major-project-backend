import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../../Hooks/useCategory";
import Layout from '../../Layouts/Layout/Layout'

function Categories() {

    const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="" key={c._id}>
              <Link to={`/Category/${c.slug}`} className="cat_btn">{c.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


export default Categories;