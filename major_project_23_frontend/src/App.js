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
const Category = lazy(() => import('./Components/Pages/Category/Category'));
const Pagenotfound = lazy(() => import('./Components/Pages/Pagenotfound'));
const Forgotpass = lazy(() => import('./Components/Pages/Forgtpasswd/Forgotpass'));

function App() {
  return (
    <Suspense fallback={<div><Loading /></div>}>

      <Router>
        <Routes>
          <Route  exact path='/' element={<Home />}/>   
          <Route  exact path='/Dashboard' element={<Private />}>
              <Route  exact path='' element={<Dashboard />}/>   
          </Route>   
          <Route  exact path='/About' element={<About />}/>   
          <Route  exact path='/Contact' element={<Contact />}/>   
          <Route  exact path='/Signup' element={<Signup />}/>   
          <Route  exact path='/Signin' element={<Signin />}/>  
          <Route  exact path='/Cart' element={<Cart />}/>   
          <Route  exact path='/Category' element={<Category />} />   
          <Route exact path='/Forgotpassword' element={<Forgotpass />}/>
          <Route  exact path='*' element={<Pagenotfound />}/>   

        </Routes>
      </Router>

    </Suspense>        
      

         

  );
}

export default App;
