import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout/Layout";
import "./Home.css";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Prices } from "../../Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/cart";

function Home() {
 
  const navigate = useNavigate();
  const [prods,setprods] = useState([]);
  const [categories,setcategories] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setradio] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart,setCart] = useCart();




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
    getTotal();
    // eslint-disable-next-line
  },[])



  //display products
  const getProducts = async () => {
    try {
        const {data} = await axios.get(`http://localhost:5000/api/product/Get-product/`);
        setprods(data.getproducts);
    } catch (error) {
        console.log(error);
    }
}

  
useEffect(() => {
  if (!checked.length || !radio.length) getProducts();
  // eslint-disable-next-line
}, [checked.length, radio.length]);


//filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchecked(all);
  }

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/product/Product-filter", {
        checked,
        radio,
      });
      setprods(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line
  }, [checked, radio]);


  //get total 
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  
  


  return (
    <Layout title={"Hidden Brands - Shop now"}>
    <div className="parent">

         <div className="div1">
            <h4 className="home_h4">Filter by products</h4>
            <div className="filter filterC">
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
            <button className="filter_btn">Clear filter</button>
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
                    <button className="card_btn" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                    <button className="card_btn card_bt" onClick={() => setCart([...cart,p])}>Add to cart</button>
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

//   <div className="load_div">
//   {prods && prods.length < total && (
//    <button
//      className="load_btn"
//      onClick={(e) => {
//        e.preventDefault();
//        setPage(page + 1);
//      }}
//    >
//      {loading ? "Loading ..." : "Loadmore"}
//    </button>
//  )}
//   </div>



    // useEffect(() => {
    //   if (page === 1) return;
    //   loadMore();
    //   // eslint-disable-next-line
    // }, [page]);
  
    // //load more
    // const loadMore = async () => {
    //   try {
    //     setLoading(true);
    //     const { data } = await axios.get(`http://localhost:5000/api/product/Product-list/${page}`);
    //     setLoading(false);
    //     setprods([...prods, ...data?.products]);
    //   } catch (error) {
    //     console.log(error);
    //     setLoading(false);
    //   }
    // };