const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const { Client } = require('pg');

const app = express();
const port = 5000;

// mongoose.connect(
//   'mongodb+srv://rj123:rj123@cluster0-gqcsq.mongodb.net/test?retryWrites=true&w=majority',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// mongoose.connection.once('open', () => {
//   console.log('Connected to Mongo database.');
// });

export const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'bill-tracker'
});

client
  .connect()
  .then(() => console.log('Connected to Postgres database.'))
  .catch(err => console.log(`Error: ${err}`));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => console.log(`App listening on port ${port}`));
