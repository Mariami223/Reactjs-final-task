import { Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useForm from "../../app/hooks/useForm";
import FileBase from "react-file-base64";

import { useProductContext } from "../../context/productContext";

const generateAddProductFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 1 ? null : "name should have at least 2 charachter",
    },
    description: {
      value: selectedProduct?.description || "",
      required: true,
      error: "",
      validateInput: (description) =>
        description.length > 1
          ? null
          : "description should have at least 2 charachter",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      error: "",
      validateInput: (category) =>
        category.length > 1
          ? null
          : "category should have at least 2 charachter",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      error: "",
      validateInput: (brand) =>
        brand.length > 1 ? null : "brand should have at least 2 charachter",
    },
    price: {
      value: selectedProduct?.price || "",
      required: true,
      error: "",
      validateInput: (price) =>
        price.length > 0 ? null : "price should have at least 2 charachter",
    },
  };
};

const ProductForm = () => {
  const {
    formValues: productFormValues,
    setformValues: setProductFormValues,
    onInputChange,
    checkButtonDisable,
    clearForm,
  } = useForm({
    defaultFormValues: generateAddProductFormValues,
  });

  const [image, setImage] = useState("");
  const { saveProduct, selectedProduct } = useProductContext();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(productFormValues));
  }, [productFormValues]);

  useEffect(() => {
    if (selectedProduct) {
      setProductFormValues(generateAddProductFormValues(selectedProduct));
    }
  }, [selectedProduct]);

  const saveProductHandler = () => {
    const name = productFormValues.name.value;
    const description = productFormValues.description.value;
    const category = productFormValues.category.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;
    // const image = productFormValues.image;

    saveProduct({
      name,
      description,
      category,
      brand,
      price,
      image: image || "", //selectedProduct?.image
    });
  };

  return (
    <FormControl>
      <TextField
        name="name"
        value={productFormValues.name.value}
        onChange={onInputChange}
        error={!!productFormValues.name.error}
        helperText={!!productFormValues.name.error}
        label={"name"}
        margin="dense"
      />
      <TextField
        name="description"
        value={productFormValues.description.value}
        onChange={onInputChange}
        error={!!productFormValues.description.error}
        helperText={!!productFormValues.description.error}
        label={"description"}
        margin="dense"
      />
      <TextField
        name="category"
        value={productFormValues.category.value}
        onChange={onInputChange}
        error={!!productFormValues.category.error}
        helperText={!!productFormValues.category.error}
        label={"category"}
        margin="dense"
      />
      <TextField
        name="brand"
        value={productFormValues.brand.value}
        onChange={onInputChange}
        error={!!productFormValues.brand.error}
        helperText={!!productFormValues.brand.error}
        label={"brand"}
        margin="dense"
      />
      <TextField
        name="price"
        type="number"
        value={productFormValues.price.value}
        onChange={onInputChange}
        error={!!productFormValues.price.error}
        helperText={!!productFormValues.price.error}
        label={"price"}
        margin="dense"
      />

      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setImage(base64)}
      />

      <Button disabled={isButtonDisabled} onClick={saveProductHandler}>
        Save
      </Button>
    </FormControl>
  );
};

export default ProductForm;
