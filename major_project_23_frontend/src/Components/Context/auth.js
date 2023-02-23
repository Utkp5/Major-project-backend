import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user : null,
        token : "",
    });
    return (
        <AuthContext.Provider value = {[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};


//custom hook
const useAuth = () => useContext(AuthContext);

export{useAuth, AuthProvider}
