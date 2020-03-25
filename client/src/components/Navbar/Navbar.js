import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = props => {
  return (
    <div id='navbar-wrapper'>
      <div id='navbar-left-display' className='navbar-item'>
        <div id='logged-in-display'>{props.uname}</div>
      </div>
      <div id='navbar-center-display' className='navbar-item'>
        <div id='navbar-title'>Bill Keeper.</div>
      </div>
      <div id='navbar-right-display' className='navbar-item'>
        <div id='logout-button'>
          <Link to='/' id='logout-text'>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
