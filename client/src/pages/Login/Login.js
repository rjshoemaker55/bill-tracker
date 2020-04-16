import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { loginQuery, addUserMutation } from '../../queries/queries';
import './login.css';

const Login = (props) => {
  const [login, setLogin] = useState(true);
  const [registerPage, setRegisterPage] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [loginUser] = useLazyQuery(loginQuery, {
    onError: (err) => {
      resetFields();
      setErrorMsg('Incorrect username or password!');
    },
    onCompleted: (data) => {
      setErrorMsg(false);
      props.history.push({
        pathname: '/home',
        state: data.loginUser,
      });
    },
  });

  // const [registerUser] = useMutation(addUserMutation, {
  //   onCompleted: data => {
  //     props.history.push({
  //       pathname: '/home',
  //       state: data.addUser
  //     });
  //   }
  // });

  const handleSubmitClick = () => {
    if (login) {
      return loginUser({
        variables: {
          username,
          password,
        },
      });
    } else if (!registerPage) {
      return setRegisterPage(1);
    } else if (name == '' || username == 0 || password == 0 || income == 0) {
      setErrorMsg('Missing one or more fields!');
      resetFields();
    } else {
      return registerUser({
        variables: {
          name: name,
          username: username,
          password: password,
        },
      });
    }
  };

  const resetFields = () => {
    setName('');
    setUsername('');
    setPassword('');
    setIncome('');
    setRegisterPage(0);
  };

  const registerUser = () => {
    setRegisterPage(1);
  };

  return (
    <div id='login-wrapper'>
      <div id='login-header-wrapper'>
        <div id='login-header'>Bill Keeper.</div>
        <div id='login-subheader'>Login or Register:</div>
      </div>
      {errorMsg && <div id='login-error'>{errorMsg}</div>}
      {!login && !registerPage ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Name'
          className='login-field'
          autoComplete='new-password'
          required
        />
      ) : (
        !login &&
        registerPage && (
          <input
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            type='number'
            placeholder='Monthly income'
            className='login-field'
            autoComplete='new-password'
          />
        )
      )}
      {!registerPage && (
        <>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Username'
            className='login-field'
            autoComplete='new-password'
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            className='login-field'
            autoComplete='new-password'
            required
          />
        </>
      )}

      <button
        id='register-login-button'
        onClick={(e) => {
          handleSubmitClick();
        }}
      >
        {login ? 'Login' : !registerPage ? '→' : 'Register'}
      </button>

      <div
        id='register-login-switch'
        onClick={() => {
          setLogin(!login);
          resetFields();
        }}
      >
        {login ? 'Register' : 'Login'}
      </div>
    </div>
  );
};

export default Login;
