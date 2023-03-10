import React from "react";
import Layout from "../../Layouts/Layout/Layout";
import { useCart } from "../../Context/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import "./Cart.css";

function Cart() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Hidden Brands - Your Cart"}>
      <div className="cart_container">
        <div className="cart_row">
            <h1 className="cart_row_h1">{`Hello ${auth?.token && auth?.user?.firstName}`}</h1>
            <h4 className="cart_row_h4">
              {cart?.length? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}`: " Your Cart Is Empty"}
            </h4>
        </div>

          <div>
            {cart?.map((p) => (
              <div className="cart_product">
                <div className="cart_pro_1">
                  <img src={`http://localhost:5000/api/product/Product-photo/${p._id}`} className="cart_img" alt={p.name}/>
                </div>
                <div className="cart_pro_2">
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price : ₹{p.price}</p>
                  <button className="btn_remove" onClick={() => removeCartItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart_total">
            <h2>Cart Summary</h2>
            <hr />
            <h4 className="cart_total_h4" >Total : ₹&nbsp;{totalPrice()}</h4>
            {auth?.user?.address ? (
                <div>
                  <span>Current Address : {auth?.user?.address}</span> <br/>
                  <button className="btn_carts" onClick={() => navigate("/Dashboard/user/Profile")}>Update Address</button>
                </div>
            ) : (
              <div>
                {auth?.token ? (
                  <button className="btn_carts" onClick={() => navigate("/Dashboard/user/Profile")}>Update Address</button>
                ) : (
                  <button className="btn_carts" onClick={() => navigate("/Signin", {state: "/Cart",})}>Plase Login to checkout</button>
                )}
              </div>
            )}
          </div>
      </div>
    </Layout>
  );
}

export default Cart;
