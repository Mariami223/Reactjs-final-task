import { Button, FormControl, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import useForm from "../../app/hooks/useForm";
import { useUserContext } from "../../context/userContext";

const generateLoginFormValues = () => {
  return {
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@gmail.com") ? null : "email is not valid",
    },
    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 6
          ? null
          : "password should have at least 7 charachter",
    },
  };
};

const LoginForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    formValues: loginFormValues,
    onInputChange,
    checkButtonDisable,
  } = useForm({ defaultFormValues: generateLoginFormValues() });

  const { login } = useUserContext();

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(loginFormValues));
  }, [loginFormValues]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    login({ email, password });
  };

  return (
    <FormControl>
      <TextField
        variant="outlined"
        name="email"
        label="email"
        value={loginFormValues.email.value}
        error={!!loginFormValues.email.error}
        helperText={loginFormValues.email.error}
        onChange={onInputChange}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="password"
        label="password"
        type="password"
        value={loginFormValues.password.value}
        error={!!loginFormValues.password.error}
        helperText={loginFormValues.password.error}
        onChange={onInputChange}
        margin="dense"
      />
      <Button disabled={isButtonDisabled} onClick={onFormSubmit}>
        Login
      </Button>
    </FormControl>
  );
};

export default LoginForm;
