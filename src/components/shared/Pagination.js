import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ page, setPage, totalPages }) => {
  return (
    <Pagination
      style={{ marginTop: "34px" }}
      count={totalPages}
      onChange={(e, value) => {
        setPage({ page: +value });
      }}
    />
  );
};

export default PaginationComponent;
