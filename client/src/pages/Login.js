import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { loginQuery } from '../queries/queries';

const Login = props => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loginUser] = useLazyQuery(loginQuery, {
    variables: {
      username,
      password
    },
    onCompleted: data => {
      props.history.push({
        pathname: '/home',
        state: data
      });
    }
  });

  return (
    <>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        type='text'
        placeholder='Username'
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type='text'
        placeholder='Password'
      />
      <button
        onClick={e => {
          loginUser();
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
