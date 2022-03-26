import React from 'react';
import { useSelector } from 'react-redux';
import { usePostContactMutation } from './../../utils/api.js';
import { Loading } from 'notiflix';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Notify } from 'notiflix';
import { Typography } from '@mui/material';

const ContactForm = () => {
  Loading.remove();

  const [submitData] = usePostContactMutation();
  const { userId } = useSelector(state => state.contacts);
  const { userName } = useSelector(state => state.contacts);

  const handleSubmit = e => {
    const form = e.target;
    const name = form.name.value;
    const phone = form.number.value;
    e.preventDefault();
    form.reset();

    if (name.length < 3 || phone.length !== 9) {
      Notify.failure('fill correctly requested fields!');
    } else {
      submitData([userId, { name, phone }]);
      Notify.success('New contact added');
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
      <Typography variant="h3">Phonebook</Typography>
      <Typography variant="subtitle2">{userName}</Typography>

      <Box
        component="form"
        sx={{
          marginBottom: '40px',
          marginTop: '30px',
          '& > :not(style)': { m: 1, width: '20ch' },
        }}
        noValidate
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <h4>Add contact:</h4>
        <TextField
          name="name"
          id="standard-basic"
          label="name min 3 char."
          variant="standard"
          required
        />
        <TextField
          name="number"
          id="standard-basic"
          label="Number 9-digit"
          type="text"
          variant="standard"
          required
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
