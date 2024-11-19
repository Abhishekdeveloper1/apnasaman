import React from "react";
import { useState,useEffect } from "react";
import { json } from "react-router-dom";
import Navbar from "./navbar";
import Serachbar from "./serachbar";
import Featurs from "./featurs";
import Footer from "./footer";


function Cart() {
    const [totalCartProducts, setCartProducts] = useState([]);

    useEffect(() => {
      // Retrieve cart data from localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartProducts(existingCart);
    }, []);

    const removeFromCart = (productId) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = existingCart.filter((cartItem) => cartItem.id !== productId);
        setCartProducts(updatedCart); // Update state to trigger re-render
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Product removed from cart!");
      };
      const addtoCart=(productId)=>{
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = existingCart.findIndex((cartItem) => cartItem.id === productId);
        if (productIndex !== -1) {
            // alert(existingCart[productIndex].price);
            // If the product exists, increment its quantity
            existingCart[productIndex].quantity += 1;
          } 
          localStorage.setItem("cart", JSON.stringify(existingCart));
          setCartProducts(existingCart);
        console.log(productIndex);

      }
      const removetoCart=(productId)=>{
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = existingCart.findIndex((cartItem) => cartItem.id === productId);
        if (productIndex !== -1) {
            if (existingCart[productIndex].quantity > 1) {
              existingCart[productIndex].quantity -= 1;
            } 
      }
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCartProducts(existingCart);
    //   alert("Product quantity updated!");

    }
    return (
        <>
              <Navbar cartCount={totalCartProducts.length} />
              <Serachbar />
      {/* <Featurs /> */}

          <div className="container-fluid py-5">
            <div className="container py-5">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Products</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dynamically render cart products */}
                    {totalCartProducts.length > 0 ? (
                      totalCartProducts.map((product, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img
                                src={product.image1 || "/assets/img/default-product.png"}
                                className="img-fluid me-5 rounded-circle"
                                style={{ width: "80px", height: "80px" }}
                                alt={product.name || "Product"}
                              />
                            </div>
                          </th>
                          <td>
                            <p className="mb-0 mt-4">{product.name}</p>
                          </td>
                          <td>
                            <p className="mb-0 mt-4">₹{product.price}</p>
                          </td>
                          <td>
                            <div
                              className="input-group quantity mt-4"
                              style={{ width: "100px" }}
                            >
                              <div className="input-group-btn">
                                <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => removetoCart(product.id)}>
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control form-control-sm text-center border-0"
                                value={product.quantity}
                                readOnly
                              />
                              <div className="input-group-btn">
                                <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => addtoCart(product.id)}>
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="mb-0 mt-4">
                              ₹{(product.price * product.quantity).toFixed(2)}
                            </p>
                          </td>
                          <td>
                            <button className="btn btn-md rounded-circle bg-light border mt-4"  onClick={() => removeFromCart(product.id)}>
                                
                              <i className="fa fa-times text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Your cart is empty.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
    
              {/* Cart Total Section */}
              <div className="row g-4 justify-content-end">
                <div className="col-8"></div>
                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                  <div className="bg-light rounded">
                    <div className="p-4">
                      <h1 className="display-6 mb-4">
                        Cart <span className="fw-normal">Total</span>
                      </h1>
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="mb-0 me-4">Subtotal:</h5>
                        <p className="mb-0">
                          ₹
                          {totalCartProducts
                            .reduce(
                              (acc, product) =>
                                acc + product.price * product.quantity,
                              0
                            )
                            .toFixed(2)}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-0 me-4">Shipping:</h5>
                        <p className="mb-0">Flat rate: ₹3.00</p>
                      </div>
                      <p className="mb-0 text-end">Platfrom Fee.</p>
                    </div>
                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                      <h5 className="mb-0 ps-4 me-4">Total:</h5>
                      <p className="mb-0 pe-4">
                        ₹
                        {(
                          totalCartProducts.reduce(
                            (acc, product) =>
                              acc + product.price * product.quantity,
                            0
                          ) + 3
                        ).toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                      type="button"
                    >
                      Proceed Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      );
}

export default Cart;
