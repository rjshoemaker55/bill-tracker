const express = require('express');
const graphqlHTTP = require('express-graphql');
const pgSchema = require('./schema/pgSchema.js');
const cors = require('cors');
const path = require('path');

const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: pgSchema,
    graphiql: true
  })
);

app.use(express.static('../public'));

app.set('trust proxy', 1);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
