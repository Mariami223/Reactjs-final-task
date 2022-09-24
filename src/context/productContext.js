import { createContext, useContext, useState } from "react";
import useAxios from "../app/hooks/useAxios";
import { instance } from "../app/instance";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  const {
    isLoading,
    data: mainProductData,
    setData: setMainProduct,
  } = useAxios("/products");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isProductUpdating, setIsProductUpdating] = useState(false);

  const saveProduct = async (product) => {
    // console.log("selected product line 23", selectedProduct._id);
    const path = isProductUpdating
      ? `/products/${selectedProduct._id}`
      : "/products";
    let method = isProductUpdating ? "put" : "post";
    try {
      // setIsLoading(false)
      const resp = await instance[method](path, { ...product });
    } catch (error) {
      // setError(error.message)
    } finally {
      // setIsLoading(false)
      setSelectedProduct(null);
      setIsProductUpdating(false);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        mainProductData,
        saveProduct,
        setIsProductUpdating,
        setSelectedProduct,
        selectedProduct,
        setMainProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
