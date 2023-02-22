import React from 'react'
import Layout from '../Layouts/Layout/Layout'
import { NavLink } from 'react-router-dom'

function Pagenotfound() {
  return (
    <Layout title={'Page not Found'}>
      
    <div style={{display:"flex", alignItems:"center", flexDirection:"column",  height:"90vh", justifyContent:"center"}}>
        <h1 style={{fontSize:"100px"}}>404</h1>
        <h2 style={{fontSize:"30px", color:"darkcyan", marginBottom:"20px"}}>Oops! Page not found</h2>
       <NavLink to="/"><button style={{background:"darkorange", padding:"8px 20px", color:"lavender", border:"none", borderRadius:"5px", cursor:"pointer", fontSize:"x-large"}}>Go back</button></NavLink>
    </div>
    </Layout>
  )
}

export default Pagenotfound
