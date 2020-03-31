import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { loginQuery, addUserMutation } from '../../queries/queries';
import './login.css';

const Login = props => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const [loginUser] = useLazyQuery(loginQuery, {
    onError: err => {
      setUsername('');
      setPassword('');
      setErrorMsg(true);
    },
    onCompleted: data => {
      setErrorMsg(false);
      props.history.push({
        pathname: '/home',
        state: data.loginUser
      });
    }
  });

  const [registerUser] = useMutation(addUserMutation, {
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
      {errorMsg && <div id='login-error'>Incorrect username or password.</div>}
      {!login && (
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Name'
          className='login-field'
          autoComplete='new-password'
          required
        />
      )}
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        type='text'
        placeholder='Username'
        className='login-field'
        autoComplete='new-password'
        required
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
        className='login-field'
        autoComplete='new-password'
        required
      />
      <button
        id='register-login-button'
        onClick={e => {
          login
            ? loginUser({
                variables: {
                  username,
                  password
                }
              })
            : registerUser({
                variables: {
                  name: name,
                  username: username,
                  password: password
                }
              });
        }}
      >
        {login ? 'Login' : 'Register'}
      </button>
      <div id='register-login-switch' onClick={() => setLogin(!login)}>
        {login ? 'Register' : 'Login'}
      </div>
    </div>
  );
};

export default Login;
