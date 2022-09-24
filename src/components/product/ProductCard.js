import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../app/instance";
import { isUserAdmin } from "../../app/util";
import { useCartContext } from "../../context/cartContext";
import { useProductContext } from "../../context/productContext";
import { useUserContext } from "../../context/userContext";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const [productRating, setProductRating] = useState(product.averageRating);
  const { userData } = useUserContext();
  const { addToCart, removeFromCart, cart } = useCartContext();
  const { setSelectedProduct, setIsProductUpdating, setMainProduct } =
    useProductContext();
  const isAdmin = isUserAdmin();

  const isProductInCart = cart?.find(
    (cartItem) => cartItem.product?._id === product._id
  );
  const navigate = useNavigate();

  useEffect(() => {
    setProductRating(product.averageRating);
  }, [product]);

  const onRatingChange = async (e) => {
    try {
      await instance.post(
        `/products/${product._id}/users/${userData._id}/rate`,
        {
          rating: +e.target.value,
        }
      );
      const { data } = await instance.get(`/products`);
      setMainProduct(data);
    } catch (error) {}
  };

  return (
    <div>
      <Card
        style={{
          width: 400,
          height: 400,
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          margin: "auto",
        }}
        variant="outlined"
      >
        <CardContent>
          <Link
            to={`/products/categories/${product.category}/${product.name}`}
            state={{ id: product._id, category: product.category }}
          >
            <Typography variant="h5">{product.name}</Typography>
            <img src={product.image} width={200} />
          </Link>

          <Typography variant="h6">${product.price}</Typography>
          <Rating
            value={productRating}
            onChange={onRatingChange}
            precision={0.5}
          />
        </CardContent>
        <div className="card__actions">
          {isProductInCart ? (
            <>
              <Button onClick={() => addToCart(product)}>+</Button>
              {isProductInCart.quantity}
              <Button onClick={() => removeFromCart(product._id)}>-</Button>
            </>
          ) : (
            <Button onClick={() => addToCart(product)}>Add to cart</Button>
          )}
          {isAdmin && (
            <Button
              onClick={() => {
                setIsProductUpdating(true);
                setSelectedProduct(product);
                navigate(`/products/${product._id}/edit`);
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
