import { gql } from 'apollo-boost';

const registerMutation = gql`
  mutation($name: String!, $username: String!, $password: String!) {
    addUser(name: $name, username: $username, password: $password) {
      token
    }
  }
`;

const loginMutation = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export { registerMutation, loginMutation };
