import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { useLazyQuery } from '@apollo/react-hooks';

import {
  loginQuery,
  // registerMutation,
  getUsersQuery
} from '../queries/queries';

const Login = props => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loginUser, { loading, data }] = useLazyQuery(loginQuery, {
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
          loginUser({
            variables: { username, password }
          });
        }}
      >
        Login
      </button>
    </>
  );

  // <div>
  //   <h4 className='login-header'>{login ? 'Login' : 'Register'}</h4>
  //   {!login && (
  //     <input
  //       value={name}
  //       onChange={e => setName(e.target.value)}
  //       type='text'
  //       placeholder='Name'
  //     />
  //   )}
  //   <input
  //     value={username}
  //     onChange={e => setUsername(e.target.value)}
  //     type='text'
  //     placeholder='Username'
  //   />
  //   <input
  //     value={password}
  //     onChange={e => setPassword(e.target.value)}
  //     type='password'
  //     placeholder='Password'
  //   />
  //   <button className='confirm-button'>
  //     {login ? 'Login' : 'Register'}
  //   </button>
  //   <div className='switch-button' onClick={() => setLogin(!login)}>
  //     {login ? 'I need to create an account.' : 'I already have an account.'}
  //   </div>
  // </div>
};

export default Login;
