import React, { useState } from 'react';

import { AUTH_TOKEN } from '../constants';

const Login = () => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const _confirm = async () => {};

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  return (
    <div>
      <h4 className='login-header'>{login ? 'Login' : 'Register'}</h4>
      {!login && (
        <input
          value={name}
          onChange={e => setName(e)}
          type='text'
          placeholder='Name'
        />
      )}
      <input
        value={username}
        onChange={e => setUsername(e)}
        type='text'
        placeholder='Username'
      />
      <input
        value={password}
        onChange={e => setPassword(e)}
        type='password'
        placeholder='Password'
      />
      <button className='confirm-button'>{login ? 'Login' : 'Register'}</button>
      <div className='switch-button' onClick={() => setLogin(!login)}>
        {login ? 'I need to create an account.' : 'I already have an account.'}
      </div>
    </div>
  );
};

export default Login;
