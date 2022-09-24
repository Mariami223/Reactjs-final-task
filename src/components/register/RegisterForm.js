import { Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useForm from "../../app/hooks/useForm";
import { useUserContext } from "../../context/userContext";

const generateRegisterFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 3 ? null : "name should have at least 4 charachter",
    },
    lastName: {
      value: "",
      required: true,
      error: "",
      validateInput: (lastName) =>
        lastName.length > 3
          ? null
          : "last name should have at least 4 charachter",
    },
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

const RegisterForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { register } = useUserContext();
  const { formValues, checkButtonDisable, onInputChange } = useForm({
    defaultFormValues: generateRegisterFormValues(),
  });

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(formValues));
  }, [formValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    const firstName = formValues.firstName.value;
    const lastName = formValues.lastName.value;
    const email = formValues.email.value;
    const password = formValues.password.value;
    register({ firstName, lastName, email, password });
  };

  return (
    <FormControl>
      <TextField
        variant="outlined"
        name="firstName"
        label="firstName"
        value={formValues.firstName.value}
        error={!!formValues.firstName.error}
        helperText={formValues.firstName.error}
        onChange={onInputChange}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="lastName"
        label="lastName"
        value={formValues.lastName.value}
        error={!!formValues.lastName.error}
        helperText={formValues.lastName.error}
        onChange={onInputChange}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="email"
        label="email"
        value={formValues.email.value}
        error={!!formValues.email.error}
        helperText={formValues.email.error}
        onChange={onInputChange}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="password"
        label="password"
        type="password"
        value={formValues.password.value}
        error={!!formValues.password.error}
        helperText={formValues.password.error}
        onChange={onInputChange}
        margin="dense"
      />
      <Button disabled={isButtonDisabled} onClick={onSubmit}>
        Register
      </Button>
    </FormControl>
  );
};

export default RegisterForm;
