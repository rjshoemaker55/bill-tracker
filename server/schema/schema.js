const graphql = require('graphql');

const Bill = require('../models/bill');
const User = require('../models/user');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

const BillType = new GraphQLObjectType({
  name: 'Bill',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    value: { type: GraphQLInt },
    dueDate: { type: GraphQLInt },
    category: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString }, // TODO: encrypted password?\
    bills: {
      type: GraphQLList(BillType),
      resolve(parent, args) {
        return Bill.find({ userId: parent.id });
      }
    }
  })
});

// TODO: Add category type

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    bill: {
      type: BillType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Bill.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    bills: {
      type: GraphQLList(BillType),
      resolve(parent, args) {
        return Bill.find();
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBill: {
      type: BillType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLInt) },
        dueDate: { type: new GraphQLNonNull(GraphQLInt) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let bill = new Bill({
          name: args.name,
          value: args.value,
          dueDate: args.dueDate,
          category: args.category,
          userId: args.userId
        });
        return bill.save();
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
        let user = new User({
          name: args.name,
          username: args.username,
          password: args.password
        });
        return user.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
