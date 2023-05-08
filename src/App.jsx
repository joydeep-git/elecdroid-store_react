import React from "react";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

import "./SCSS/App.scss";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import ErrorPage from "./Pages/ErrorPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <Routers>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<ErrorPage />} />

      </Routes>
      <Footer />
    </Routers>
  );
}

export default App;