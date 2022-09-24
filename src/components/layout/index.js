import React, { Children } from "react";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";

const index = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
    </div>
  );
};

export default index;
