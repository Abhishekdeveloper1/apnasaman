import React from "react";
// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Navbar from "./navbar";
import Serachbar from "./serachbar";
import Featurs from "./featurs";
import Featursend from "./featureend";
import Banner from "../../banner";
import Bestseller from "./bestseller";
import Testimonial from "./testimonial";
import Footer from "./footer";
import MainContent from "./mainContent";
import Productlist from "./productlist";
import Cart from "./cart";
import Notfound from "./notfound";
import Login from "./login";
import Signup from "./signup";
function Index(){
return(
  <div>  
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<MainContent/>}></Route>
      <Route path="/Productlist/:id" element={<Productlist/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/*" element={<Notfound/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Signup/>}></Route>





    </Routes>
    </BrowserRouter>
  {/* <MainContent/> */}

  </div>

)
}

export default Index;