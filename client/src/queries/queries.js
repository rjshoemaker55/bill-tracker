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

const getUsersBillsQuery = gql`
  query($userId: Int!) {
    getUsersBills(userId: $userId) {
      id
      billname
      amount
      duedate
      category
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
  getUsersBillsQuery,
  deleteBillMutation
};
