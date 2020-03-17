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
      username
      uname
      bills {
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

export { loginQuery, registerMutation, getUsersQuery };
