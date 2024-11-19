import React from "react";
import Footer from "./footer";
import Serachbar from "./serachbar";
import { Link } from "react-router-dom";

function Signup()
{
return(
    <>
    {/* <Serachbar/> */}
    <div class="container-fluid py-5">
  <div class="container py-5 text-center">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <i class="bi bi-person-plus display-1 text-secondary"></i>
        <h1 class="display-4 mb-4">Sign Up</h1>
        <p class="mb-4">Create your account by filling in the details below.</p>
        <form>
          <div class="mb-3">
            <input
              type="text"
              class="form-control rounded-pill py-3 px-4"
              id="name"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control rounded-pill py-3 px-4"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control rounded-pill py-3 px-4"
              id="password"
              placeholder="Create your password"
              required
            />
          </div>
          <button
            type="submit"
            class="btn border-secondary rounded-pill py-3 px-5"
          >
            Sign Up
          </button>
          <p class="mt-4">
            Already have an account? 
            <Link to={'/login'} class="text-decoration-none">Login</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>

        <Footer/>
    </>
);
}
export default Signup;