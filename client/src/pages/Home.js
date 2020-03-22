import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { deleteBillMutation, userQuery } from '../queries/queries';

const Home = props => {
  const [user, setUser] = useState({});
  const [bills, setBills] = useState([]);

  const { id } = props.history.location.state.loginUser;

  const { loading } = useQuery(userQuery, {
    variables: {
      userId: id
    },
    onCompleted: data => {
      setUser(data.user);
      setBills(data.user.bills);
    }
  });

  // const user = !loading && data.user;
  // const bills = !loading && data.user.bills;

  const [deleteBill] = useMutation(deleteBillMutation, {
    onCompleted: deletedBill => {
      console.log(deletedBill.deleteBill.id);
      setBills(bills.filter(bill => bill.id !== deletedBill.deleteBill.id));
    }
  });

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className='home-wrapper'>
      <div className='navbar'>
        <Link to='/' className='logout-button'>
          Logout
        </Link>
        <div className='logged-in-display'>{user.uname}</div>
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
            {!loading &&
              bills.map(bill => (
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
                      onClick={() => {
                        console.log(
                          'Delete button clicked for bill with id ' + bill.id
                        );
                        deleteBill({ variables: { id: bill.id } });
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
