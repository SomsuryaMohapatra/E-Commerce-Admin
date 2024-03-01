import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
// import Alert from "@mui/material/Alert";

const AddProduct = (props) => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    old_price: "",
    new_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch("http://localhost:4000/api/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          {
            data.success
              ? alert("Product Added")
              : alert("Failed to add product");
          }
        });
    }
  };
  const addNewCollectionProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch("http://localhost:4000/api/addnewcollections", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          {
            data.success
              ? alert("New Collection Product Added")
              : alert("Failed to add product");
          }
        });
    }
  };

  return (
    <>
      {props.productType === "basic" ? (
        <div className="add-product">
          <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input
              type="text"
              name="name"
              id="productname"
              placeholder="Product Name"
              value={productDetails.name}
              onChange={changeHandler}
            />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                type="number"
                name="old_price"
                id="product_old_price"
                placeholder="Product Old Price"
                value={productDetails.old_price}
                onChange={changeHandler}
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                type="number"
                name="new_price"
                id="product_new_price"
                placeholder="Product New Price"
                value={productDetails.new_price}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select
              name="category"
              id="category"
              className="add-product-selector"
              value={productDetails.category}
              onChange={changeHandler}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="upload image"
                className="addproduct-thumbnail-img"
              />
            </label>
            <input
              // value={productDetails.image}
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
          <button
            className="addproduct-btn"
            onClick={() => {
              addProduct();
            }}
          >
            ADD
          </button>
        </div>
      ) : (
        <div className="add-product">
          <div className="addproduct-itemfield">
            <p>New Collection Product Title</p>
            <input
              type="text"
              name="name"
              id="productname"
              placeholder="New Collection Product Name"
              value={productDetails.name}
              onChange={changeHandler}
            />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                type="number"
                name="old_price"
                id="product_old_price"
                placeholder="Product Old Price"
                value={productDetails.old_price}
                onChange={changeHandler}
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                type="number"
                name="new_price"
                id="product_new_price"
                placeholder="Product New Price"
                value={productDetails.new_price}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>New Collection Product Category</p>
            <select
              name="category"
              id="category"
              className="add-product-selector"
              value={productDetails.category}
              onChange={changeHandler}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="upload image"
                className="addproduct-thumbnail-img"
              />
            </label>
            <input
              // value={productDetails.image}
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
          <button
            className="addproduct-btn"
            onClick={() => {
              addNewCollectionProduct();
            }}
          >
            ADD
          </button>
        </div>
      )}
    </>
  );
};

export default AddProduct;
