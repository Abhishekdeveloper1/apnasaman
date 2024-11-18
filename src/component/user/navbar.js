import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";


function Navbar({cartCount})
{
  // alert(cartCount);
  const [categories, setCategories] = useState([]);
  const [totalCatrtCount,setCartcount]=useState(0);

  const [error, setError] = useState(null);
  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getCategoriesWithSubcategories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data); // assuming your API returns an array of subcategories
    } catch (error) {
      setError(error.message);
    }
  };
console.log(categories);

    useEffect(()=>{
        const existingCart=JSON.parse(localStorage.getItem('cart'))||[];
        setCartcount(existingCart.length);
    },[cartCount])
    // alert(totalCatrtCount);
    return(

    <>
console.log(subCategories);
  {/* <div
     id="spinner"
    className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
  >
    <div className="spinner-grow text-primary" role="status" />
  </div> */}
  {/* Spinner End */}
  {/* Navbar start */}
  <div className="container-fluid fixed-top">
    <div className="container topbar bg-primary d-none d-lg-block">
      <div className="d-flex justify-content-between">
        <div className="top-info ps-2">
          <small className="me-3">
            <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
            <a href="#" className="text-white">
              123 Street, New York
            </a>
          </small>
          <small className="me-3">
            <i className="fas fa-envelope me-2 text-secondary" />
            <a href="#" className="text-white">
              Email@Example.com
            </a>
          </small>
        </div>
        <div className="top-link pe-2">
          <a href="#" className="text-white">
            <small className="text-white mx-2">Privacy Policy</small>/
          </a>
          <a href="#" className="text-white">
            <small className="text-white mx-2">Terms of Use</small>/
          </a>
          <a href="#" className="text-white">
            <small className="text-white ms-2">Sales and Refunds</small>
          </a>
        </div>
      </div>
    </div>
    <div className="container px-0">
      <nav className="navbar navbar-light bg-white navbar-expand-xl">
        <a href="index.html" className="navbar-brand">
          <h1 className="text-primary display-6">Fruitables</h1>
        </a>
        <button
          className="navbar-toggler py-2 px-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars text-primary" />
        </button>
        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
          <div className="navbar-nav mx-auto">
            {/* <a href="index.html" className="nav-item nav-link active">
              Home
            </a> */}
            <Link to={'/'} className="nav-item nav-link active">
              Home
            </Link>
            <a href="shop.html" className="nav-item nav-link">
              Shop
            </a>
            <a href="shop-detail.html" className="nav-item nav-link">
              Shop Detail
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Items
              </a>
              <div className="dropdown-menu m-0 bg-secondary rounded-0">
  {/* Iterate over the categories */}
  {categories.map((category) => (
    <div key={category.categoryId}>
      {/* Display the category */}
      <a href="#" className="dropdown-item">
        {category.productname}
      </a>

      {/* Check if there are subcategories and iterate over them */}
      {category.subcategories && (
        <div className="submenu">
          <ul className="subcategory-list">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory.subcategoryID}>
                {/* <a href="#" className="dropdown-item subcategory-item">
                  {subcategory.subcategoryname}
                </a> */}
                <Link to={`/Productlist/${subcategory.subcategoryID}`} className="dropdown-item subcategory-item">
                  {subcategory.subcategoryname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ))}
</div>
   
            </div>
            <a href="contact.html" className="nav-item nav-link">
              Contact
            </a>
          </div>
          <div className="d-flex m-3 me-0">
            <button
              className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
            >
              <i className="fas fa-search text-primary" />
            </button>
            <a href="#" className="position-relative me-4 my-auto">
              <i className="fa fa-shopping-bag fa-2x" />
              <span
                className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                style={{ top: "-5px", left: 15, height: 20, minWidth: 20 }}
              >
                {totalCatrtCount||0}
              </span>
            </a>
            <a href="#" className="my-auto">
              <i className="fas fa-user fa-2x" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
  {/* Navbar End */}
    </>
    )
}

export default Navbar;