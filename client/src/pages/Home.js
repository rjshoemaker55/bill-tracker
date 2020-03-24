import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  deleteBillMutation,
  userQuery,
  addBillMutation,
  billQuery
} from '../queries/queries';

const Home = props => {
  const [user, setUser] = useState({});
  const [bills, setBills] = useState([]);
  const [newBillName, setNewBillName] = useState('');
  const [newBillCategory, setNewBillCategory] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');
  const [newBillDueDate, setNewBillDueDate] = useState('');

  const { id } = props.history.location.state;

  const { loading } = useQuery(userQuery, {
    variables: {
      userId: id
    },
    onError: error => console.log(`userQuery Error: ${error}`),
    onCompleted: data => {
      setUser(data.user);
      setBills(data.user.bills);
    }
  });

  const [addBill] = useMutation(addBillMutation, {
    onError: error => console.log(`addBill Error: ${error}`),
    onCompleted: res => {
      const newBill = findBill({
        variables: { billId: res.addBillMutation.id }
      });
    }
  });

  const [findBill] = useLazyQuery(billQuery, {
    onError: error => console.log(`billQuery Error: ${error}`),
    onCompleted: newBill => {
      setBills([...bills, newBill.bill]);
      setNewBillName('');
      setNewBillCategory('');
      setNewBillDueDate('');
      setNewBillAmount('');
    }
  });

  const [deleteBill] = useMutation(deleteBillMutation, {
    onError: error => console.log(`deleteBill Error: ${error}`),
    onCompleted: deletedBill => {
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
                        deleteBill({ variables: { id: bill.id } });
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}

            <tr>
              <td>
                <input
                  className='newBillName'
                  value={newBillName}
                  placeholder='New Bill'
                  onChange={e => setNewBillName(e.target.value)}
                />
              </td>
              <td>
                <input
                  className='newBillCategory'
                  value={newBillCategory}
                  placeholder='Category'
                  onChange={e => setNewBillCategory(e.target.value)}
                />
              </td>
              <td>
                <input
                  className='newBillAmount'
                  value={newBillAmount}
                  type='number'
                  placeholder='Amount'
                  onChange={e => setNewBillAmount(parseInt(e.target.value))}
                />
              </td>
              <td>
                <input
                  className='newBillDueDate'
                  value={newBillDueDate}
                  placeholder='Due Date'
                  type='number'
                  onChange={e => setNewBillDueDate(parseInt(e.target.value))}
                />
              </td>
              <td>
                <button
                  className='add-bill-button'
                  onClick={() => {
                    addBill({
                      variables: {
                        billname: newBillName,
                        amount: newBillAmount,
                        category: newBillCategory,
                        duedate: newBillDueDate,
                        user: id
                      }
                    });
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
