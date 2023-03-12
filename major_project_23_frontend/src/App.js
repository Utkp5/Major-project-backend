import './App.css';
import React,{Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from "./Components/Layouts/Loading/Loading";


const Home    = lazy(() => import('./Components/Pages/Home/Home'));
const About   = lazy(() => import('./Components/Pages/About/About'));
const Contact = lazy(() => import('./Components/Pages/Contact/Contact'));
const Signup = lazy(() => import('./Components/Pages/Signup/Signup'));
const Signin = lazy(() => import('./Components/Pages/Signin/Signin'));
const Cart = lazy(() => import('./Components/Pages/Cart/Cart'));
const Dashboard = lazy(() => import('./Components/Pages/User/Dashboard'));
const Private = lazy(() => import('./Components/Routes/Private'));
const Categoryproduct = lazy(() => import('./Components/Pages/Category/Categoryproduct'));
const Admin = lazy(() => import ('./Components/Routes/Admin'));
const Admindashboard = lazy(() => import ('./Components/Pages/Admin/Admindashboard'));
const Pagenotfound = lazy(() => import('./Components/Pages/Pagenotfound'));
const Forgotpass = lazy(() => import('./Components/Pages/Forgtpasswd/Forgotpass'));
const Createproduct = lazy(() => import('./Components/Pages/Admin/Crtproduct/Createproduct'));
const Createcategory = lazy(() => import('./Components/Pages/Admin/Crtcategory/Createcategory'));
const Order = lazy(() => import('./Components/Pages/User/Order')) ;
const Profile = lazy(() => import ('./Components/Pages/User/Profile')) ;
const Users = lazy(() => import('./Components/Pages/Admin/Users/Users'));
const Products = lazy(() => import('./Components/Pages/Admin/Products'));
const Updateproduct = lazy(() => import('./Components/Pages/Admin/Updateproduct'))
const Productdetails = lazy(() => import('./Components/Pages/Productdetails/Productdetails'))
const Categories = lazy(() => import('./Components/Pages/Category/Categories'))
const Orders = lazy(() => import('./Components/Pages/Admin/Orders'))


function App() {
  return (
    <Suspense fallback={<div><Loading /></div>}>

      <Router>
        <Routes>
          <Route  exact path='/' element={<Home />}/>   
          <Route  exact path='/Dashboard' element={<Private />}>
              <Route  exact path='user' element={<Dashboard />}/>   
              <Route  exact path='user/Orders' element={<Order />}/>   
              <Route  exact path='user/Profile' element={<Profile />}/>   
          </Route>   
          <Route  exact path='/Dashboard' element={<Admin />}>
              <Route  exact path='admin' element={<Admindashboard />}/>   
              <Route  exact path='admin/Create-products' element={<Createproduct />}/>   
              <Route  exact path='admin/Create-category' element={<Createcategory />}/>   
              <Route  exact path='admin/Products' element={<Products />}/>   
              <Route  exact path='admin/Products/:slug' element={<Updateproduct />}/>   
              <Route  exact path='admin/Users' element={<Users />}/>   
              <Route  exact path='admin/Orders' element={<Orders />}/>   
          </Route>   
          <Route  exact path='/About' element={<About />}/>   
          <Route  exact path='/Contact' element={<Contact />}/>   
          <Route  exact path='/Signup' element={<Signup />}/>   
          <Route  exact path='/Signin' element={<Signin />}/>  
          <Route  exact path='/Cart' element={<Cart />}/>   
          <Route  exact path='/Categories' element={<Categories />} />
          <Route  exact path='/Category/:slug' element={<Categoryproduct />} />
          <Route  exact path='/Product/:slug'   element={<Productdetails />} />
          <Route  exact path='/Forgotpassword' element={<Forgotpass />}/>
          <Route  exact path='*' element={<Pagenotfound />}/>   

        </Routes>
      </Router>

    </Suspense>        
      

         

  );
}

export default App;
