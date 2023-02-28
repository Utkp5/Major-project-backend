import React from 'react'

function Categoryform({handleSubmit, value, setvalue}) {
  return (
    <div style={{marginLeft:"20px"}}>
      <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
         <input type="text" style={{width:"30vw", height:"8vh", marginBottom:"5px", fontSize:"16px"}} value={value} placeholder="Enter New Category" onChange={(e) => setvalue(e.target.value)}/><br />
         <button style={{padding:"12px 30px", background:"crimson", color:"lavender", border:"none", cursor:"pointer", borderRadius:"3px"}}>Submit</button>
      </form>
    </div>
  )
}

export default Categoryform
