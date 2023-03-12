import React, { useState, useEffect } from "react";
import Layout from '../../Layouts/Layout/Layout';
import Adminmenu from '../../Layouts/Adminmenu/Adminmenu';
import { useAuth } from "../../Context/auth";
import "./Admindashboard.css";
import "../User/Dashboard.css"
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
const { Option } = Select;


function Orders() {

      const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "On the way", "Deliverd", "Cancel"]);
      const [changeStatus, setCHangeStatus] = useState("");
      const [orders, setOrders] = useState([]);
      const [auth, setAuth] = useAuth();
      const getOrders = async () => {
        try {
          const { data } = await axios.get("http://localhost:5000/api/All-orders");
          setOrders(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        if (auth?.token) getOrders();
      }, [auth?.token]);
    
      const handleChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(`http://localhost:5000/api/Order-status/${orderId}`, {
            status: value,
          });
          getOrders();
        } catch (error) {
          console.log(error);
        }
      };


  return (
    <Layout title={'Hidden Brands - All Orders'}>
    <h2 className="admin_d_h2">Admin Dashboard</h2>

    <div className="admin_m_main">
      <div className="admin_m_sub"><Adminmenu /></div>


      <div className="admin_m_sub1 font_user">
            <h2 className="admin_m_h2">All Orders</h2>
            <div>
            {orders?.map((o, i) => {
                return (
                    <div className="border_shadow">

                    <table className="table">
                      <thead className='order_thead'>
                        <tr className='order_tr'>
                          <th className='order_th' scope="col">No.</th>
                          <th className='order_th' scope="col">Status</th>
                          <th className='order_th' scope="col">Buyer</th>
                          <th className='order_th' scope="col">Date</th>
                          <th className='order_th' scope="col">Payment</th>
                          <th className='order_th' scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='order_tr'>
                          <td className='order_td'>{i + 1}</td>
                          <td className='order_td'>
                            <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                              {status.map((s, i) => (
                                <Option key={i} value={s}>{s}</Option>
                              ))}
                            </Select>
                          </td>
                          <td className='order_td'>{o?.buyer?.firstName}</td>
                          <td className='order_td'>{moment(o?.createAt).fromNow()}</td>
                          <td className='order_td'>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td className='order_td'>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                      {o?.products?.map((p, i) => (
                        <div style={{margin:"20px 20px", padding:"7px 7px"}} key={p._id}>
                          <div className="card_body">
                            <img src={`http://localhost:5000/api/product/Product-photo/${p._id}`} style={{width:"10vw"}} alt={p.name}/>
                            <div >
                            <p>{p.name}</p>
                            <p>Price : {p.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
      </div>


    </div>


    </Layout>
  )
}

export default Orders
