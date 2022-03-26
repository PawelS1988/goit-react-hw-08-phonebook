import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';

const Navbar = () => {
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="text">
          <Link to={`/`}>Log in</Link>
        </Button>
        <Button variant="text">
          <Link to={`/register`}>Register</Link>
        </Button>
      </Stack>
    </>
  );
};

export default Navbar;
