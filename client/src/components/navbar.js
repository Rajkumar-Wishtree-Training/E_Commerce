import React from "react";
import "./navbar.css";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
function Navbar(props) {
  const navigate = useNavigate();
  const onClickHandler = async () =>{
    try {
      props.togleIsSigned()
      props.showAlert('Logedout Success', 'success')
      navigate('/')
    } catch (error) {
      console.log(error)
      props.showAlert('not logded out' , 'warning')
    }
       
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Shopsy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul> */}
            {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
            <div className="sign_up_sign_in">
              {(props.isSigned && !props.isAdmin) && (
                <>
                  <Link className="btn btn-info mx-5" to="/mycart">
                    Cart
                  </Link>
                  <Link className="btn btn-info mx-2" to='/userdetails'>User Details</Link>
                  <button className="btn btn-danger" onClick={onClickHandler}>LogOut</button>
                </>
              )}
              {props.isAdmin && (
                <>
                  <Link className="btn btn-info mx-3" to="/orders">
                    Orders
                  </Link>
                  <Link className="btn btn-info mx-2" to="/users">
                    Users
                  </Link>
                  <Link className="btn btn-info mx-2" to='/products'>Products</Link>
                  <button className="btn btn-danger" onClick={onClickHandler}>LogOut</button>
                </>
              )}

              {props.isSigned || (
                <div className="">
                  <Link to="/signup" className="btn btn-primary mx-2 ml-5">
                    Sign Up
                  </Link>
                  <Link to="/signin" className="btn btn-primary">
                    Sign in
                  </Link>
                 
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
