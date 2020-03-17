const express = require('express');
const graphqlHTTP = require('express-graphql');
const pgSchema = require('./schema/pgSchema.js');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: pgSchema,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
