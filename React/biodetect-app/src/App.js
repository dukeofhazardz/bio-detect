import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import Detect from "./Components/Detect";
import About from "./Components/About";
import Footer from "./Components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Home />
      <Detect />
      <About />
      <Footer />
    </div>
  );
}


export default App;
