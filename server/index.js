const express = require('express');
const app = express();
const port = process.env.PORT || 3100;
const bodyParser = require('body-parser');
const cors = require('cors');
const react = require('react-redux');

// CORS
app.use(cors());
app.use(bodyParser.json());

let data = {
  users: [
    {
      id: 1,
      name: 'Fake User 1',
      loggedIn: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Fake User 2',
      loggedIn: false,
      createdAt: new Date(),
    },
  ],
  contacts: [
    { id: 1, userId: 1, name: 'John Doe' },
    { id: 2, userId: 1, name: 'Jane Doe' },
    { id: 3, userId: 2, name: 'Who Dat' },
  ],
};

app.get('/', (req, res) => {
  res.send(`Hello World! ${port}`);
});

// All Contacts
app.get('/contacts', (req, res) => {
  const storeContacts = react.useSelector(state => console.log(state));
  const contacts = data.contacts;
  res.json(storeContacts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
