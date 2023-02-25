import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../Context/auth'
import Spinner from '../Spinner';


function Admin() {

    const [auth,setauth] = useAuth();
    const [ok,setok] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:5000/api/admin-auth');
            if (res.data.ok) {
                setok(true)
            }
            else {
                setok(false);
            }
        };
        if (auth?.token) authCheck();
    },[auth?.token]);

  return ok ? <Outlet /> : <Spinner path=''/>;


}

export default Admin
