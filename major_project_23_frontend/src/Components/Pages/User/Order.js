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
        </div>
        {
          orders?.map((order, index) => {
            return(
              <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col"> date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order?.status}</td>
                    <td>{order?.buyer?.name}</td>
                    <td>{moment(order?.createAt).fromNow()}</td>
                    <td>{order?.payment.success ? "Success" : "Failed"}</td>
                    <td>{order?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            )
          })
        }





      </div>
    </Layout>
  )
}

export default Order;
