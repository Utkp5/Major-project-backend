import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Components/Context/auth';
import 'antd/dist/reset.css';
import { CartProvider } from './Components/Context/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
       <CartProvider>
            <App />
       </CartProvider>
    </AuthProvider>
);

