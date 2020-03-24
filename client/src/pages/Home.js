import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  deleteBillMutation,
  getUserQuery,
  addBillMutation,
  getBillQuery
} from '../queries/queries';

const Home = props => {
  const [user, setUser] = useState({});
  const [bills, setBills] = useState([]);
  const [newBillName, setNewBillName] = useState('');
  const [newBillCategory, setNewBillCategory] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');
  const [newBillDueDate, setNewBillDueDate] = useState('');

  // Destructures userid from login page
  const { id } = props.history.location.state;

  // Brings in user data/bill data from id and sets state to match
  const { loading } = useQuery(getUserQuery, {
    variables: {
      userId: id
    },
    onError: error => console.log(`getUserQuery Error: ${error}`),
    onCompleted: data => {
      setUser(data.user);
      setBills(data.user.bills);
    }
  });

  // Adds a bill, then calls findBill to update state
  const [addBill] = useMutation(addBillMutation, {
    onError: error => console.log(`addBill Error: ${error}`),
    onCompleted: res => {
      const newBill = findBill({
        variables: { billId: res.addBill.id }
      });
    }
  });

  // Gets new bill data form getBillQuery then updates state
  const [findBill] = useLazyQuery(getBillQuery, {
    onError: error => console.log(`getBillQuery Error: ${error}`),
    onCompleted: res => {
      setBills([...bills, res.bill]);
      setNewBillName('');
      setNewBillCategory('');
      setNewBillDueDate('');
      setNewBillAmount('');
    }
  });

  // Deletes bill by id, then updates state
  const [deleteBill] = useMutation(deleteBillMutation, {
    onError: error => console.log(`deleteBill Error: ${error}`),
    onCompleted: res => {
      setBills(bills.filter(bill => bill.id !== res.deleteBill.id));
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
