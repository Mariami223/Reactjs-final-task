import { createContext, useContext, useEffect, useReducer } from "react";
import { instance } from "../app/instance";
import { getUser } from "../app/util";

const cartContext = createContext();

export const useCartContext = () => useContext(cartContext);

const cartReducer = (state, action) => {
  console.log("state", state);
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const productId = newItem?._id;
      const item = state.cart?.find((item) => item.product?._id === productId);
      let newCart;
      if (item) {
        newCart = state.cart.map((cartItem) =>
          cartItem.product._id === productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...state.cart, { product: newItem, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    case "REMOVE_FROM_CART":
      const selectedProductId = action.payload;
      const foundItem = state.cart?.find(
        (item) => item.product?._id === selectedProductId
      );
      let updateCart;
      if (foundItem.quantity === 1) {
        updateCart = state.cart.filter(
          (cartItem) => cartItem.product._id !== selectedProductId
        );
      } else {
        updateCart = state.cart.map((cartItem) =>
          cartItem.product._id === selectedProductId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      localStorage.setItem("cart", JSON.stringify(updateCart));
      return { cart: updateCart };
    case "POPULATE_CART":
      return { cart: action.payload };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // useEffect(() => {
  //   const user = getUser();
  //   if (user) {
  //     const getUserCart = async () => {
  //       const { data } = await instance.get(`/users/${user._id}/cart`);
  //       dispatch({ type: "POPULATE_CART", payload: data.cart });
  //     };
  //     getUserCart();
  //   } else {
  //     const cart = JSON.parse(localStorage.getItem("cart") || []);
  //     dispatch({ type: "POPULATE_CART", payload: cart });
  //   }
  // }, []);

  const saveCart = async (userId) => {
    try {
      await instance.put(`/users/${userId}/cart`, { products: cartState.cart });
      localStorage.removeItem("cart");
    } catch (error) {}
  };

  return (
    <cartContext.Provider
      value={{ addToCart, removeFromCart, cart: cartState.cart, saveCart }}
    >
      {children}
    </cartContext.Provider>
  );
};
