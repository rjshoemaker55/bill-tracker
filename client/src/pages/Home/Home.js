import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  deleteBillMutation,
  getUserQuery,
  addBillMutation,
  getBillQuery
} from '../../queries/queries';
import Navbar from '../../components/Navbar/Navbar';
import BillRow from '../../components/BillRow/BillRow';
import './home.css';

const Home = props => {
  const [user, setUser] = useState({});
  const [bills, setBills] = useState([]);
  const [newBillName, setNewBillName] = useState('');
  const [newBillCategory, setNewBillCategory] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');
  const [newBillDueDate, setNewBillDueDate] = useState('');

  let rows = 0;

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
    <>
      <Navbar uname='Loading' />
      <h2>Loading...</h2>
    </>
  ) : (
    <>
      <Navbar uname={user.uname} />
      <div id='home-wrapper'>
        <table align='center' id='bill-table'>
          <thead>
            <tr id='table-header-row'>
              <th>Bill Name</th>
              <th>Category</th>
              <th className='centered'>Amount</th>
              <th className='centered'>Due Date</th>
              <th id='table-delete-column'></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              bills.map(bill => {
                rows++;
                return (
                  <BillRow
                    id={bill.id}
                    className={!(rows % 2) ? 'green-row' : 'reg-row'}
                    billname={bill.billname}
                    amount={bill.amount}
                    category={bill.category}
                    duedate={bill.duedate}
                    onClick={() => {
                      deleteBill({ variables: { id: bill.id } });
                    }}
                  />
                );
              })}

            <tr>
              <td>
                <input
                  className='new-bill-field'
                  value={newBillName}
                  placeholder='New Bill'
                  onChange={e => setNewBillName(e.target.value)}
                />
              </td>
              <td>
                <input
                  className='new-bill-field'
                  value={newBillCategory}
                  placeholder='Category'
                  onChange={e => setNewBillCategory(e.target.value)}
                />
              </td>
              <td>
                <input
                  className='new-bill-field'
                  value={newBillAmount}
                  type='number'
                  placeholder='Amount'
                  onChange={e => setNewBillAmount(parseInt(e.target.value))}
                />
              </td>
              <td>
                <input
                  className='new-bill-field'
                  value={newBillDueDate}
                  placeholder='Due Date'
                  type='number'
                  onChange={e => setNewBillDueDate(parseInt(e.target.value))}
                />
              </td>
              <td className='centered'>
                <button
                  id='add-bill-button'
                  className='table-button'
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
    </>
  );
};

export default Home;
