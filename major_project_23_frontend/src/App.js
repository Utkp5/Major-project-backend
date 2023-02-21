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
const Profile = lazy(() => import('./Components/Pages/Profile/Profile'));
const Pagenotfound = lazy(() => import('./Components/Pages/Pagenotfound'));

function App() {
  return (
    <Suspense fallback={<div><Loading /></div>}>

      <Router>
        <Routes>
          <Route  exact path='/' element={<Home />}/>   
          <Route  exact path='/About' element={<About />}/>   
          <Route  exact path='/Contact' element={<Contact />}/>   
          <Route  exact path='/Signup' element={<Signup />}/>   
          <Route  exact path='/Signin' element={<Signin />}/>   
          <Route  exact path='/Profile' element={<Profile />}/>   
          <Route  exact path='/Pagenotfound' element={<Pagenotfound />}/>   
        </Routes>
      </Router>

    </Suspense>        
      

         

  );
}

export default App;
