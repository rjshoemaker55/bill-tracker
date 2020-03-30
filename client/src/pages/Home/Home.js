import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  deleteBillMutation,
  getUserQuery,
  addBillMutation,
  getBillQuery,
  updateBillMutation
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
  const [updateType, setUpdateType] = useState('');

  let rows = 0;

  // Sorts bills in alphabetical order
  let sortedBills = bills.sort((a, b) => {
    return a.billname.toLowerCase().localeCompare(b.billname.toLowerCase());
  });

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

  // Gets bill data by id
  const [findBill] = useLazyQuery(getBillQuery, {
    onError: error => console.log(`getBill Error: ${error}`),
    onCompleted: res => updateBillState(updateType, res)
  });

  // Adds a bill, then calls findBill to update state
  const [addBill] = useMutation(addBillMutation, {
    onError: error => console.log(`addBill Error: ${error}`),
    onCompleted: res => {
      setUpdateType('add');
      findBill({
        variables: { billId: res.addBill.id }
      });
    }
  });

  // Updates a bill
  const [updateBill] = useMutation(updateBillMutation, {
    onError: err => console.log(`updateBill error: ${err}`),
    onCompleted: res => {
      setUpdateType('update');
      findBill({
        variables: { billId: res.updateBill.id }
      });
    }
  });

  // Deletes bill by id, then updates state
  const [deleteBill] = useMutation(deleteBillMutation, {
    onError: error => console.log(`deleteBill Error: ${error}`),
    onCompleted: res => {
      setUpdateType('delete');
      updateBillState('delete', res);
    }
  });

  // Takes the update type and data, and updates the client state
  const updateBillState = async (updateType, data) => {
    switch (updateType) {
      case 'delete':
        setBills(bills.filter(bill => bill.id !== data.deleteBill.id));
        break;
      case 'add':
        setBills([...bills, data.bill]);
        setNewBillName('');
        setNewBillCategory('');
        setNewBillDueDate('');
        setNewBillAmount('');
        break;
      case 'update':
        let billToUpdate = await bills.findIndex(
          bill => bill.id == data.bill.id
        );
        let newBillArray = [...bills];
        newBillArray[billToUpdate] = data.bill;
        setBills(newBillArray);
        break;
    }
  };

  return loading ? (
    <>
      <Navbar uname='Loading' />
      <h2>Loading...</h2>
    </>
  ) : (
    <>
      <Navbar uname={user.uname} />
      <div id='home-wrapper'>
        <div id='instructions'>Click on bill data to edit.</div>
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
              sortedBills.map(bill => {
                rows++;
                return (
                  <BillRow
                    key={bill.id}
                    id={bill.id}
                    className={!(rows % 2) ? 'green-row' : 'reg-row'}
                    billname={bill.billname}
                    amount={bill.amount}
                    category={bill.category}
                    duedate={bill.duedate}
                    deleteBill={() => {
                      deleteBill({ variables: { id: bill.id } });
                    }}
                    updateBill={updateBill}
                  />
                );
              })}

            <tr id='new-bill-row'>
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
              <td className='centered'>
                <input
                  className='new-bill-field centered'
                  value={newBillAmount}
                  type='number'
                  placeholder='Amount'
                  onChange={e => setNewBillAmount(parseInt(e.target.value))}
                />
              </td>
              <td className='centered'>
                <input
                  className='new-bill-field centered'
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
