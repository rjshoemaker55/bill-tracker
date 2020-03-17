import React from 'react';
import { Link } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

const Home = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  console.log(props.history.location.state.loginUser);

  return (
    <div className='home-wrapper'>
      <div className='navbar'>
        <div className='login-logout'>
          {authToken ? (
            <div
              className='logout'
              onClick={() => {
                props.history.push('/login');
              }}
            >
              Logout
            </div>
          ) : (
            <Link to='/login' className='login'>
              Login
            </Link>
          )}
        </div>
      </div>
      <div className='home-content-wrapper'>
        <ul></ul>
      </div>
    </div>
  );
};

export default Home;
