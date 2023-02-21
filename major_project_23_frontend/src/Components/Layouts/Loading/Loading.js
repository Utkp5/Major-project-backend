import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./Loading.css"


function Loading() {
  return (
    <div id="Loading_div">
    <PropagateLoader color="#02c9f4" height={60} width={5} />
    </div>
  )
}

export default Loading