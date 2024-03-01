import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = (props) => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/api/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
      });
  };

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/api/removeproduct", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    await fetchInfo();
  };

  const newCollectionsFetchInfo = async () => {
    await fetch("http://localhost:4000/api/newcollections")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.new_collections_products);
      });
  };

  const newCollectionsRemoveProduct = async (id) => {
    await fetch("http://localhost:4000/api/removenewcollection", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    await newCollectionsFetchInfo();
  };
  useEffect(() => {
    if (props.productType === "basic") {
      fetchInfo();
    } else {
      newCollectionsFetchInfo();
    }
  }, [props]);

  return (
    <>
      {props.productType === "basic" ? (
        <div className="list-product">
          <h1>All Products List</h1>
          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {Array.isArray(allProducts) ? (
              allProducts.map((product) => {
                return (
                  <React.Fragment key={product.id}>
                    <div className="listproduct-format-main listproduct-format">
                      <img
                        className="listproduct-product-icon"
                        src={product.image}
                        alt="product"
                      />
                      <p>{product.name}</p>
                      <p>&#8377;{product.old_price}</p>
                      <p>&#8377;{product.new_price}</p>
                      <p>{product.category}</p>
                      <img
                        className="listproduct-remove-icon"
                        src={cross_icon}
                        alt="remove icon"
                        onClick={() => {
                          removeProduct(product.id);
                        }}
                      />
                    </div>
                    <hr />
                  </React.Fragment>
                );
              })
            ) : (
              <>
                <p>No products found.</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="list-product">
          <h1>All New Collection Products List</h1>
          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {Array.isArray(allProducts) ? (
              allProducts.map((product) => {
                return (
                  <React.Fragment key={product.id}>
                    <div className="listproduct-format-main listproduct-format">
                      <img
                        className="listproduct-product-icon"
                        src={product.image}
                        alt="product"
                      />
                      <p>{product.name}</p>
                      <p>&#8377;{product.old_price}</p>
                      <p>&#8377;{product.new_price}</p>
                      <p>{product.category}</p>
                      <img
                        className="listproduct-remove-icon"
                        src={cross_icon}
                        alt="remove icon"
                        onClick={() => {
                          newCollectionsRemoveProduct(product.id);
                        }}
                      />
                    </div>
                    <hr />
                  </React.Fragment>
                );
              })
            ) : (
              <>
                <p>No products found.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ListProduct;
