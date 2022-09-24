import { display } from "@mui/system";
import React, { useEffect, useState } from "react";
import { instance } from "../../../app/instance";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useProductContext } from "../../../context/productContext";
import useAxios from "../../../app/hooks/useAxios";
import "./search.css";
import axios from "axios";

const Search = () => {
  const [value, setValue] = useState("");
  // const [filtereResults, setFiltereResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const filterByName = async () => {
        const { data } = await instance.get(`/products/search?name=${value}`);
      };
      if (value) {
        filterByName();
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  const searchItems = (e) => {
    setValue(e);

    //   if (value !== "") {
    //     const filteredData = data.filter((item) => {
    //       return Object.values(item)
    //         .join("")
    //         .toLowerCase()
    //         .includes(value.toLowerCase());
    //     });
    //     setFiltereResults(filteredData);
    //   } else {
    //     setFiltereResults("");
    //   }
  };

  return (
    <div className=" nav__middle">
      <div className="input__wrapper search">
        <input
          type="text"
          placeholder="search..."
          value={value}
          onChange={(e) => searchItems(e.target.value)}
        />
        <SearchIcon className="cursor__pointer"></SearchIcon>
      </div>
      {/* {value.length != 0 && (
        <div className="dataResult">
          {filtereResults.map((item) => {
            return (
              <a className="dataItem" key={item.id} target="_blank">
                <p>{item.name} </p>
              </a>
            );
          })}
        </div>
      )} */}
    </div>
  );
};

export default Search;
