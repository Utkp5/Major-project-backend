import React,{useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import "./Layouts/Loading/Loading.css";


function Spinner({path="Signin"}) {

    const [count,setcount] = useState(3);
    const Navigate = useNavigate();
    const location = useLocation();

    
    useEffect(() => {
        const interval = setInterval(() => {
            setcount((prevalue) => --prevalue)
        }, 1000);
        count === 0 && Navigate(`/${path}`, {
            state: location.pathname,
        });
        return () => clearInterval(interval);
    },[count, Navigate, location, path]);

  return (
    <div id="Loading_div">
        <h2 className='t_center'>Redirecting to you in {count} Seconds</h2>
        <ClipLoader color="#ffd600" height={60} width={5} />
    </div>
  )
}

export default Spinner
