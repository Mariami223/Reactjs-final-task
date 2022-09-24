import React from "react";
import { useProductContext } from "../../context/productContext";
import ProductCard from "./ProductCard";

const Home = () => {
  const { mainProductData } = useProductContext();

  return (
    <div className="card">
      {mainProductData.products?.length > 0 &&
        mainProductData.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Home;
