import React from "react";
import Adminmenu from "../../../Layouts/Adminmenu/Adminmenu";
import Layout from "../../../Layouts/Layout/Layout";
import "../Admindashboard.css";

function Users() {
  return (
    <Layout title={'Hidden Brands - all Users'}>

    <h2 className='admin_d_h2'>Admin Dashboard</h2>

      <div className="admin_m_main">
        <div className="admin_m_sub"><Adminmenu /></div>

        <div className="admin_m_sub1 font_user">
          <h2 className='admin_m_h2'>All users</h2>

          <div className='admin_m_sub2'>

          </div>
        </div>
      </div>
      
    </Layout>
  );
}

export default Users;
