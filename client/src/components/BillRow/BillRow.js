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
        break;
      case 'category':
        setNewCategory(e.target.value);
        break;
      case 'amount':
        setNewAmount(Number(e.target.value));
        break;
      case 'duedate':
        setNewDueDate(Number(e.target.value));
        break;
    }
  };

  const handleUpdate = () => {
    if (buttonType == 'table-delete-button') {
      deleteBill();
    } else {
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

  const handleRevert = () => {
    setButtonType('table-delete-button');
    setNewBillName(billname);
    setNewAmount(amount);
    setNewCategory(category);
    setNewDueDate(duedate);
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
            type='number'
            onChange={e => editField(e, 'amount')}
          />
        </div>
      </td>
      <td>
        <input
          className='bill-item centered'
          value={newDueDate}
          type='number'
          onChange={e => editField(e, 'duedate')}
        />
      </td>
      <td className='centered'>
        <button id={buttonType} className='table-button' onClick={handleUpdate}>
          {buttonType == 'table-delete-button' ? 'X' : '✓'}
        </button>
        {buttonType == 'table-update-button' && (
          <button
            id='table-revert-button'
            className='table-button'
            onClick={handleRevert}
          >
            ⟲
          </button>
        )}
      </td>
    </tr>
  );
};

export default BillRow;
