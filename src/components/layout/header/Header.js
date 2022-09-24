import "./header.css";
import React from "react";
import { useUserContext } from "../../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Search from "./Searchel";

const Header = () => {
  const { userData, logout } = useUserContext();
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/profile/${userData.firstName}`, {
      state: { id: userData._id },
    });
  };
  return (
    <div>
      <nav>
        <div className="nav__left ">
          <Link to="/">
            <h1>E-Commerce Shop</h1>
          </Link>
        </div>
        <div className="nav__middle">
          <Search />
        </div>
        <div className="nav__right">
          <Link to="/">Home</Link>

          <Link to="/cart">Cart</Link>

          {!userData ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login/">Login</Link>
            </>
          ) : (
            <div className="hide__element ">
              <Button
                variant="text"
                color="secondary"
                onClick={navigateToProfile}
              >
                Profile
              </Button>
              <Button color="warning" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
