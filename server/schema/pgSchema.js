const graphql = require('graphql');
const { Client } = require('pg');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObject
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
    category: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return client
          .query(`SELECT * FROM users WHERE id = ${parent.user_id}`)
          .then(res => res.rows[0])
          .catch(err => console.log(err));
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    uname: { type: GraphQLString },
    username: { type: GraphQLString },
    upassword: { type: GraphQLString },
    bills: {
      type: GraphQLList(BillType),
      resolve(parent, args) {
        return client
          .query(`SELECT * FROM bills WHERE user_id = ${parent.id}`)
          .then(res => res.rows)
          .catch(err => console.log(err));
      }
    }
  })
});

// Declaring GraphQL root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    bills: {
      type: GraphQLList(BillType),
      resolve(parent, args) {
        return client
          .query(`SELECT * FROM bills;`)
          .then(res => res.rows)
          .catch(err => console.log(err));
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return client
          .query(`SELECT * FROM users;`)
          .then(res => res.rows)
          .catch(err => console.log(err));
      }
    },
    loginUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { username, password } = args;
        return client
          .query(`SELECT * FROM users WHERE username = '${username}'`)
          .then(res => {
            if (res.rows[0].upassword !== password) {
              return 'Incorrect username or password.';
            } else {
              return res.rows[0];
            }
          });
      }
    }
  }
});

// Declaring GraphQL mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBill: {
      type: BillType,
      args: {
        billname: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        duedate: { type: new GraphQLNonNull(GraphQLInt) },
        category: { type: GraphQLString },
        user: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const { billname, amount, duedate, category, user } = args;

        return client
          .query(
            `
              INSERT INTO bills (billname, amount, duedate, category, user_id)
              VALUES ('${billname}', '${amount}', '${duedate}', '${category}', '${user}')
              RETURNING id, billname, amount, duedate, category, user_id;
            `
          )
          .then(res => res.rows[0])
          .catch(err => console.log(err));
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { uname, username, upassword } = args;

        return client
          .query(
            `
              INSERT INTO users (uname, username, upassword)
              VALUES ('${name}', '${username}', '${password}')
              RETURNING id, uname, username
            `
          )
          .then(res => res.rows[0])
          .catch(err => console.log(err));
      }
    },
    deleteBill: {
      type: BillType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return client
          .query(
            `
              DELETE FROM bills WHERE id = ${args.id}
              RETURNING id;
            `
          )
          .then(res => res.rows[0]);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
