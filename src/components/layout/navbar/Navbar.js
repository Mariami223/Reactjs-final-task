import { Divider, ListItem, Stack } from "@mui/material";
import { flexbox } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../context/productContext";
import "./navbar.css";

const Navbar = () => {
  const { mainProductData } = useProductContext();
  return (
    <div className="categories">
      {mainProductData.categories?.length > 0 &&
        mainProductData.categories.map((category) => {
          return (
            <Link
              key={category._id}
              to={`/products/categories/${category.name}?page=1`}
            >
              <div className="categories__el"> {category.name}</div>
            </Link>
          );
        })}
    </div>
  );
};

export default Navbar;
