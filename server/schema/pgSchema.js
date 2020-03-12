const graphql = require('graphql');
const { Client } = require('pg');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

// Initialize Postgres database
const client = new Client({
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

// Declaring GraphQL types
const BillType = new GraphQLObjectType({
  name: 'Bill',
  fields: () => ({
    id: { type: GraphQLInt },
    billname: { type: GraphQLString },
    amount: { type: GraphQLInt },
    duedate: { type: GraphQLInt },
    category: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  id: { type: GraphQLInt },
  uname: { type: GraphQLString },
  username: { type: GraphQLString },
  upassword: { type: GraphQLString },
  bills: {
    type: GraphQLList(BillType),
    resolve(parent, args) {
      return client
        .query(`SELECT * FROM bills WHERE user_id = ${parent.id}`)
        .then(res => res.rows);
    }
  }
});

// Declaring GraphQL root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    bills: {
      type: GraphQLList(BillType),
      resolve(parent, args) {
        return client.query(`SELECT * FROM bills;`).then(res => res.rows);
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {}
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBill: {
      type: BillType,
      args: {
        billname: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        duedate: { type: new GraphQLNonNull(GraphQLInt) },
        category: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const { billname, amount, duedate, category } = args;

        const results = await client.query(
          `
          INSERT INTO bills (billname, amount, duedate, category)
          VALUES ('${billname}', '${amount}', '${duedate}', '${category}')
          RETURNING id, billname, amount, duedate, category;
        `
        );

        return results.rows[0];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
