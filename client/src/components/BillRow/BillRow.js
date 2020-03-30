import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { updateBillMutation } from '../../queries/queries';

import './BillRow.css';

const BillRow = props => {
  const {
    id,
    className,
    billname,
    amount,
    category,
    duedate,
    deleteBill,
    updateBill
  } = props;

  const [newBillName, setNewBillName] = useState(billname);
  const [newAmount, setNewAmount] = useState(amount);
  const [newCategory, setNewCategory] = useState(category);
  const [newDueDate, setNewDueDate] = useState(duedate);
  const [buttonType, setButtonType] = useState('table-delete-button');

  const editField = (e, field) => {
    e.preventDefault();
    setButtonType('table-update-button');
    switch (field) {
      case 'billname':
        setNewBillName(e.target.value);
        console.log(`newBillname ${newBillName}`);
        break;
      case 'category':
        setNewCategory(e.target.value);
        console.log(`newCategory: ${newCategory}`);
        break;
      case 'amount':
        setNewAmount(Number(e.target.value));
        console.log(`newAmount: ${newAmount}`);
        break;
      case 'duedate':
        setNewDueDate(Number(e.target.value));
        console.log(`newDueDate: ${newDueDate}`);
        break;
    }
  };

  const handleClick = () => {
    if (buttonType == 'table-delete-button') {
      deleteBill();
    } else {
      console.log('handle click in BillRow.js');
      updateBill({
        variables: {
          id,
          newBillName,
          newCategory,
          newAmount,
          newDueDate
        }
      });
      setButtonType('table-delete-button');
    }
  };

  return (
    <tr className={className}>
      <td>
        <input
          className='bill-item'
          value={newBillName}
          onChange={e => editField(e, 'billname')}
        />
      </td>
      <td>
        {category ? (
          <input
            className='bill-item'
            value={newCategory}
            onChange={e => editField(e, 'category')}
          />
        ) : (
          'None'
        )}
      </td>
      <td>
        <div className='dollar'>
          <input
            className='bill-item centered'
            value={newAmount}
            onChange={e => editField(e, 'amount')}
          />
        </div>
      </td>
      <td>
        <input
          className='bill-item centered'
          value={newDueDate}
          onChange={e => editField(e, 'duedate')}
        />
      </td>
      <td className='centered'>
        <button id={buttonType} className='table-button' onClick={handleClick}>
          {buttonType == 'table-delete-button' ? 'X' : '✓'}
        </button>
      </td>
    </tr>
  );
};

export default BillRow;
