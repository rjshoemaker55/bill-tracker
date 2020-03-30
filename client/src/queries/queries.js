import { gql } from 'apollo-boost';

// QUERY: Authenticate user and return ID
const loginQuery = gql`
  query($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
    }
  }
`;

// QUERY: Get all users
const getUsersQuery = gql`
  {
    users {
      id
      uname
      username
    }
  }
`;

// QUERY: Get single user by id
const getUserQuery = gql`
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

// QUERY: Get single bill
const getBillQuery = gql`
  query($billId: Int!) {
    bill(billId: $billId) {
      id
      billname
      amount
      category
      duedate
    }
  }
`;

// MUTATION: Add new user
const addUserMutation = gql`
  mutation($name: String!, $username: String!, $password: String!) {
    addUser(uname: $name, username: $username, upassword: $password) {
      id
    }
  }
`;

// MUTATION: Add new bill
const addBillMutation = gql`
  mutation(
    $billname: String!
    $amount: Int!
    $duedate: Int!
    $category: String
    $user: Int!
  ) {
    addBill(
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

// MUTATION: Update bill
const updateBillMutation = gql`
  mutation(
    $id: Int!
    $newBillName: String
    $newCategory: String
    $newAmount: Int
    $newDueDate: Int
  ) {
    updateBill(
      id: $id
      newBillName: $newBillName
      newCategory: $newCategory
      newAmount: $newAmount
      newDueDate: $newDueDate
    ) {
      id
    }
  }
`;

// MUTATION: Delete bill
const deleteBillMutation = gql`
  mutation($id: Int!) {
    deleteBill(id: $id) {
      id
    }
  }
`;

export {
  loginQuery,
  addUserMutation,
  getUsersQuery,
  getUserQuery,
  getBillQuery,
  deleteBillMutation,
  updateBillMutation,
  addBillMutation
};
