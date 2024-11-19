import React, { useState } from "react";
import Footer from "./footer";
import Serachbar from "./serachbar";
import { Link } from "react-router-dom";



function Login()
{
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login=async(e)=>{
        // alert('login');
        e.preventDefault();
        if(!email || !password)
        {
            setErrorMessage("please fill all input fields");
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            });
      alert(response);
            if (!response.ok) {
              throw new Error("Invalid email or password");
            }
      
            const data = await response.json();
            alert("Login successful!");
            console.log("User data:", data);
      
            // Save token or user data in localStorage or context
            localStorage.setItem("authToken", data.token);
            // Redirect to the dashboard or homepage
            window.location.href = "/";
          } catch (error) {
            setErrorMessage(error.message);
          }
    }
return(
    <>
    {/* <Serachbar/> */}
    <div class="container-fluid py-5">
  <div class="container py-5 text-center">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <i class="bi bi-person-circle display-1 text-secondary"></i>
        <h1 class="display-4 mb-4">Login</h1>
        <p class="mb-4">Access your account by logging in with your credentials.</p>
        <form>
          <div class="mb-3">
            <input
              type="email"
              class="form-control rounded-pill py-3 px-4"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control rounded-pill py-3 px-4"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            //   required
            />
          </div>
          <button
            type="submit"
            class="btn border-secondary rounded-pill py-3 px-5"
          onClick={login}>
            Login
          </button>
          <p class="mt-4">
            Don't have an account? 
            <Link to={'/register'} class="text-decoration-none">Sign Up</Link>
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
export default Login;