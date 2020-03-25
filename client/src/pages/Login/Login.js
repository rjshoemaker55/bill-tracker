import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { loginQuery, addUserMutation } from '../../queries/queries';
import './login.css';

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
    <div id='login-wrapper'>
      <div id='login-header-wrapper'>
        <div id='login-header'>Bill Keeper.</div>
        <div id='login-subheader'>Login or Register:</div>
      </div>
      {!login && (
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Name'
          className='login-field'
          autoComplete='new-password'
        />
      )}
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        type='text'
        placeholder='Username'
        className='login-field'
        autoComplete='new-password'
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
        className='login-field'
        autoComplete='new-password'
      />
      <button
        className='register-login-button'
        onClick={e => {
          login ? loginUser() : registerUser();
        }}
      >
        {login ? 'Login' : 'Register'}
      </button>
      <div className='register-login-switch' onClick={() => setLogin(!login)}>
        {login ? 'Register' : 'Create Account'}
      </div>
    </div>
  );
};

export default Login;
