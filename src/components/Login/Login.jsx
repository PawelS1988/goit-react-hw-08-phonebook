import React from 'react';
import { Notify } from 'notiflix';
import { useGetUsersQuery } from '../../utils/api.js';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../app/store.js';
import { setUserId, setUserName } from '../../features/contacts.js';
import Navbar from '../Navbar/Navbar.jsx';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const navigate = useNavigate();
  const { data } = useGetUsersQuery();

  const handleSubmit = e => {
    Loading.remove();
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userNameForm = formData.get('userName');
    const passwordForm = formData.get('password');

    const checkUser = data.find(
      ({ userName, password }) =>
        userName === userNameForm && password === passwordForm
    );

    if (checkUser === undefined) {
      Notify.failure('Incorect username or password!');
    } else {
      Loading.dots();
      checkUser !== undefined
        ? store.dispatch(setUserId(checkUser.id))
        : store.dispatch(setUserId(null));
      setTimeout(() => {
        store.dispatch(setUserName(userNameForm));
        navigate(`/${checkUser.id}/contacts`);
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Navbar />
      <h1>Phonebook</h1>
      <h3>
        Please log in or
        <Link to={`/register`}> Register</Link>
      </h3>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '15ch' },
        }}
        noValidate
        autoComplete="on"
        onSubmit={handleSubmit}
      >
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
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
