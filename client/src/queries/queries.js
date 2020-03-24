import { gql } from 'apollo-boost';

const registerMutation = gql`
  mutation($name: String!, $username: String!, $password: String!) {
    addUser(uname: $name, username: $username, upassword: $password) {
      uname
      username
    }
  }
`;

const loginQuery = gql`
  query($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      uname
      bills {
        id
        billname
        amount
        duedate
        category
      }
    }
  }
`;

const getUsersQuery = gql`
  {
    users {
      id
      uname
      username
    }
  }
`;

const userQuery = gql`
  query($userId: Int!) {
    user(userId: $userId) {
      id
      uname
      username
      bills {
        id
        billname
        amount
        duedate
        category
      }
    }
  }
`;

const billQuery = gql`
  query($id: Int!) {
    bill(id: $id) {
      id
      billname
      amount
      category
      duedate
      user
  }
`;

const addBillMutation = gql`
  mutation(
    $billname: String!
    $amount: Int!
    $duedate: Int!
    $category: String
    $user: Int!
  ) {
    addBillMutation(
      billname: $billname
      amount: $amount
      duedate: $duedate
      category: $category
      user: $user
    ) {
      id
    }
  }
`;

const deleteBillMutation = gql`
  mutation($id: Int!) {
    deleteBill(id: $id) {
      id
    }
  }
`;

export {
  loginQuery,
  registerMutation,
  getUsersQuery,
  userQuery,
  billQuery,
  deleteBillMutation,
  addBillMutation
};
