import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import Serachbar from "./serachbar";
import Featurs from "./featurs";
import Testimonial from "./testimonial";
import Footer from "./footer";
import Cart from "./cart";

function Productlist() {
  const { id } = useParams(); // Get the category/product ID from the route
  const [productDatas, setProductData] = useState([]); // Store API response (default to an empty array)
  const [loading, setLoading] = useState(true); // Show loading state
  const [error, setError] = useState(null); // Capture error messages
  const [cart, setCart] = useState([]);

  // Fetch products based on ID
  const fetchProductData = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/productsList/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      setProductData(data); // Set fetched data
    } catch (error) {
      console.error("Error fetching product data:", error);
      setError(error.message); // Set error state
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // UseEffect to fetch data when the component mounts or `id` changes
  useEffect(() => {
    if (id) {
      fetchProductData(id);
    }
  }, [id]);

  const addToCart=(product)=>{
    const productData={id:product.id,name:product.name,price:product.price,image1:product.image1,quantity:1};

    // alert(productData);
    // console.log(product);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = existingCart.some((cartItem) => cartItem.id === product.id);
    if (productExists) {
      alert(`${product.name} is already in the cart!`);
      return; // Exit the function without adding the product
    }
  
    // alert(existingCart);
    const updatedCart = [...existingCart, productData];
    setCart(updatedCart); // Update state to trigger re-render
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // alert(updatedCart.length);
    alert(`${product.name} added to cart!`);


  }
  // Render loading, error, or product list
  return (
    <>
      <Navbar cartCount={cart.length} />
      <Serachbar />
      <Featurs />

      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Our Organic Products</h1>
              </div>
            </div>

            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {/* Conditional Rendering */}
                      {loading ? (
                        <div className="text-center">
                          <p>Loading products...</p>
                        </div>
                      ) : error ? (
                        <div className="text-center text-danger">
                          <p>Error: {error}</p>
                        </div>
                      ) : productDatas.length === 0 ? (
                        <div className="text-center">
                          <p>No products found.</p>
                        </div>
                      ) : (
                        productDatas.map((productData, index) => (
                          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                            <div className="rounded position-relative fruite-item">
                              {/* Image Section */}
                              <div className="fruite-img">
                                <img
                                  src={productData.image1 || "/assets/img/fruite-item-5.jpg"}
                                  className="img-fluid w-100 rounded-top"
                                  alt={productData.name || "Product Image"}
                                />
                              </div>

                              {/* Category Badge */}
                              {/* <div
                                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, left: 10 }}
                              >
                                {productData.category || "Category"}
                              </div> */}

                              {/* Product Details */}
                              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4>{productData.name || "Product Name"}</h4>
                                <p>
                                  {productData.description ||
                                    "No description available for this product."}
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                  <p className="text-dark fs-5 fw-bold mb-0">
                                    {productData.price ? `$${productData.price} / kg` : "$4.99 / kg"}
                                  </p>
                                  {/* <a
                                    href="#"
                                    className="btn border border-secondary rounded-pill px-3 text-primary"
                                  >
                                    <i className="fa fa-shopping-bag me-2 text-primary" />
                                    Add to cart
                                  </a> */}
                                   <a
                                    href="#"
                                    className="btn border border-secondary rounded-pill px-3 text-primary"
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevent page reload
                                      addToCart(productData); // Call the function to store product data
                                    }}
                                  >
                                    <i className="fa fa-shopping-bag me-2 text-primary" />
                                    Add to cart
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testimonial />
      <Footer />
    </>
  );
}

export default Productlist;
