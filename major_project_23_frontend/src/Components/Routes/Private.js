import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../Context/auth'

function Private() {

    const [auth,setauth] = useAuth();
    const [ok,setok] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            const res = axios.get("/api/Userauth");
            if (res.data.ok) {
                setok(true)
            }
            else {
                setok(false);
            }
        };
        if (auth?.token) authCheck();
    },[auth?.token])

  return ok ? <Outlet /> : "spinner"
}

export default Private
