import React from 'react';
import { Link } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

const Home = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const { username, uname, bills } = props.history.location.state.loginUser;

  return (
    <div className='home-wrapper'>
      <div className='navbar'>
        <Link to='/' className='logout-button'>
          Logout
        </Link>
        <div className='logged-in-display'>{uname}</div>
      </div>
      <div className='home-content-wrapper'>
        <table>
          <tr>
            <th>Bill Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Delete</th>
          </tr>
          {bills.map(bill => (
            <tr>
              <td>{bill.billname}</td>
              <td>{bill.category ? `${bill.category}` : 'None'}</td>
              <td>${bill.amount}</td>
              <td>
                {bill.duedate}
                {bill.duedate[0] === 1 || bill.duedate[1] === 1
                  ? 'st'
                  : bill.duedate[0] === 2 || bill.duedate[1] === 2
                  ? 'nd'
                  : bill.duedate[0] === 3 || bill.duedate[1] === 3
                  ? 'rd'
                  : 'th'}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Home;
