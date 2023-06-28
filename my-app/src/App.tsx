import React from "react";
import "./App.css";
import Product from "./components/pages/product/Product";

function App() {
  return (
    <div className="App">
      <h2 className="mx-auto w-25 text-center">Product List</h2>
      <Product />
    </div>
  );
}

export default App;
