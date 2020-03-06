import React from 'react';
import { Link } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

const Home = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className='home-wrapper'>
      <div className='navbar'>
        <div className='login-logout'>
          {authToken ? (
            <div
              className='logout'
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
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
    </div>
  );
};

export default Home;
