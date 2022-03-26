import React from "react";
import { usePostUserMutation, useGetUsersQuery } from "../../utils/api";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Notify } from "notiflix";

const Register = () => {
  const { data } = useGetUsersQuery();
  const navigate = useNavigate();

  const [submitData] = usePostUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName");
    const userNameForm = formData.get("userName");
    const password = formData.get("password");

    const checkUser = data.find(({ userName }) => userName === userNameForm);

    if (!checkUser) {
      submitData({ userName, password });
      setTimeout(() => {
        navigate(`/`);
      }, 500);
    } else {
      Notify.failure("Username already taken, please typ in new one");

      console.log(checkUser.length);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Navbar />
      <h1>Phonebook</h1>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "15ch" },
        }}
        noValidate
        autoComplete="on"
        onSubmit={handleSubmit}>
        <TextField
          name="userName"
          id="standard-basic"
          label="username"
          variant="standard"
        />
        <TextField
          name="password"
          id="standard-basic"
          label="password"
          variant="standard"
          type="password"
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
