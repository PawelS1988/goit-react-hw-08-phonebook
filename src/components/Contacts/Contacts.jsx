import React from 'react';
import { useSelector } from 'react-redux';
import {
  useGetUserContactsQuery,
  useDeleteContactMutation,
} from '../../utils/api.js';
import { Loading } from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const showContacts = (data, filter) => {
  const normalizedFilter = filter.toLowerCase().trim();

  return data.filter(
    contact =>
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.phone.includes(normalizedFilter)
  );
};

export const Contacts = () => {
  const { userId } = useSelector(state => state.contacts);

  const { data, isError, isLoading } = useGetUserContactsQuery(userId);
  const [deleteContact] = useDeleteContactMutation();

  const deleteUserContact = id => {
    Loading.dots();
    deleteContact([userId, id]);
    setTimeout(() => {
      Loading.remove();
      Notify.success('Done');
    }, 1000);
  };
  const filter = useSelector(state => state.contacts.filter);

  return (
    <>
      {isError ? (
        <>Error...</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {showContacts(data, filter).map(({ id, name, phone, userId }) => (
              <ListItem
                key={id}
                disableGutters
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      deleteUserContact(id);
                      console.log(`z listy ${userId}, ${id}`);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`- ${name}: ${phone} `} />
              </ListItem>
            ))}
          </List>
        </>
      ) : null}
    </>
  );
};
