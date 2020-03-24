import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { loginQuery, addUserMutation } from '../queries/queries';

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
        state: data.loginUser
      });
    }
  });

  const [registerUser] = useMutation(addUserMutation, {
    variables: {
      name: name,
      username: username,
      password: password
    },
    onCompleted: data => {
      props.history.push({
        pathname: '/home',
        state: data.addUser
      });
    }
  });

  return (
    <>
      {!login && (
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Name'
        />
      )}
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
          login ? loginUser() : registerUser();
        }}
      >
        {login ? 'Login' : 'Register'}
      </button>
      <div id='register-login-link' onClick={() => setLogin(!login)}>
        {login ? 'Register' : 'Create Account'}
      </div>
    </>
  );
};

export default Login;
