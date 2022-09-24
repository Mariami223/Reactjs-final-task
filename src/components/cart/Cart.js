import { Button } from "@mui/material";
import React from "react";
import { getUser } from "../../app/util";
import { useCartContext } from "../../context/cartContext";

const Cart = () => {
  const { cart, saveCart } = useCartContext();
  const user = getUser();
  return (
    <div style={{ marginTop: "50px" }}>
      {cart.length > 0
        ? cart?.map((cartItem) => {
            return (
              <div key={cartItem.product._id}>
                <h1>{cartItem.product.name}</h1>
                <h3 style={{ color: "red" }}>${cartItem.product.price}</h3>
                <img src={cartItem.product.image} width="150" />
                <p>{cartItem.quantity}</p>
              </div>
            );
          })
        : "No Items In Cart"}

      {user && (
        <Button onClick={() => saveCart(user._id)} disabled={!cart.length}>
          save cart
        </Button>
      )}
    </div>
  );
};

export default Cart;
