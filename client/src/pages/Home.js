import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  deleteBillMutation,
  getUsersBillsQuery,
  getUsersQuery
} from '../queries/queries';

const Home = props => {
  const { username, uname, id } = props.history.location.state.loginUser;

  const [user, setUser] = useState({
    id,
    username,
    uname,
    bills: []
  });

  let { billsLoading, bills } = useQuery(getUsersBillsQuery, {
    variables: { id: id }
  });

  setUser({
    ...user,
    bills
  });

  console.log(user);

  let billToDelete;

  const setBillToDelete = bill => (billToDelete = bill);

  const [deleteBill, { data, loading }] = useMutation(deleteBillMutation, {
    variables: {
      id: billToDelete
    },
    refetchQueries: getUsersBillsQuery
  });

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
          <thead>
            <tr>
              <th>Bill Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {!billsLoading &&
              user.bills.map(bill => (
                <tr key={bill.id}>
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
                  <td>
                    <button
                      onClick={async () => {
                        await setBillToDelete(bill.id);
                        deleteBill({ variables: { id: billToDelete } });
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
