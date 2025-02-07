import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./nav.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../users/loginSlice";
import { clearCart } from "./cartSlice";
import { useGetProductByCategoryNameQuery } from "../../services/productApi";
function Navbar() {
  var { isLoggedIn, username, role } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [filterCart, setFilterCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  var navigate = useNavigate();
  var dispatch = useDispatch();
  useEffect(() => {
    setFilterCart(cartItems.filter((item) => item.usernamer === username || item.role === role));
    console.log("Filtered Cart Items for the user:", filterCart);
  }, [cartItems, username]);
  function Logout() {
    // dispatch(clearCart());
    dispatch(logout());
    navigate("/");
  }
  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
    setSearchTerm("");
  }

  function handleCategory(category){
    if(category){
      // const { isLoading,data } = useGetProductByCategoryNameQuery(category);
      navigate(`/catp/${category}`);
    }
  }
  return (
    <div className="rounded-2">
      <div className="navbg">
        <nav className="navbar navbar-expand-lg p-3 rounded">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">Construction Mart</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active text-white" aria-current="page" to="/dashboard" > Dashboard </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="#">About us</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link text-white" to="#"> Saved </Link>
                </li> */}
                {/* <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li> */}
              </ul>
              <div className="d-flex align-items-center">
                <form className="d-flex me-3" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-light ms-2" type="submit">Search</button>
                </form>
                <Link to="/cart" className="me-3">
                  <button className="btn btn-outline-primary position-relative text-white">
                    <i className="bi bi-cart"></i> Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {filterCart.length}
                    </span>
                  </button>
                </Link>
                <div>
                  {
                    isLoggedIn ? (
                      <button className="btn btn-danger text-white" onClick={Logout} >Logout</button>
                    ) : (
                      <Link to="/login" className="btn btn-success text-white">Login</Link>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-0">
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="#" onClick={()=> handleCategory("Cement")}>Cement</Link>
                <Link className="nav-link" to="#" onClick={()=> handleCategory("Steel")}>Steel</Link>
                <Link className="nav-link" to="#" onClick={()=> handleCategory("Tube")}>Pipes</Link>
                <Link className="nav-link" to="#" onClick={()=> handleCategory("Bricks")}>Bricks</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
