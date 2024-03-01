import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct productType="basic"/>} />
        <Route path="/listproduct" element={<ListProduct productType="basic"/>} />
        <Route path="/addnewcollections" element={<AddProduct productType="new_collection"/>} />
        <Route path="/newcollections" element={<ListProduct productType="new_collection"/>} />
      </Routes>
    </div>
  );
};

export default Admin;
