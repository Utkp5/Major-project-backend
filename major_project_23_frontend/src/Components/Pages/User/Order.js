import React,{useState, useEffect} from 'react'
import Layout from '../../Layouts/Layout/Layout'
import "./Dashboard.css"
import Usermenu from "../../Layouts/Usermenu/Usermenu"
import { useAuth } from '../../Context/auth'
import moment from 'moment'
import axios from 'axios'

function Order() {

    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();


    const getOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/Orders");
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);


  return (
    <Layout title={'Hidden Brands - Dashboard Orders'}>
    
    <h2 className='user_d_h2'>Dashboard</h2>

      <div className='user_m_main'>

        <div className='user_m_sub'><Usermenu /></div>
        
        <div className='font_user'>
            <h2 className='user_m_sub1'>Orders</h2>
        {
          orders?.map((order, index) => {
            return(
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
                    <td className='order_td'>{index + 1}</td>
                    <td className='order_td'>{order?.status}</td>
                    <td className='order_td'>{order?.buyer?._id}</td>
                    <td className='order_td'>{moment(order?.createAt).fromNow()}</td>
                    <td className='order_td'>{order?.payment?.success ? "Success" : "Failed"}</td>
                    <td className='order_td'>{order?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            )
          })
        }
        </div>


      </div>
    </Layout>
  )
}

export default Order;
