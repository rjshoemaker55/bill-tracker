const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

const app = express();
const port = 5000;

mongoose.connect(
  'mongodb+srv://rj123:rj123@cluster0-gqcsq.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
  console.log('Connected to Mongo database.');
});

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, () => console.log(`App listening on port ${port}`));
