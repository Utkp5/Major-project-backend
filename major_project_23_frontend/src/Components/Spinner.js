import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import "./Layouts/Loading/Loading.css";

function Spinner() {
  return (
    <div id="Loading_div">
        <ClipLoader color="#ffd600" height={60} width={5} />
    </div>
  )
}

export default Spinner
