import React, { useState } from 'react';

import './BillRow.css';

const BillRow = props => {
  const { id, className, billname, amount, category, duedate, onClick } = props;

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
        setNewAmount(e.target.value);
        break;
      case 'duedate':
        setNewDueDate(e.target.value);
        break;
    }
    setNewAmount(e.target.value);
  };

  return (
    <tr key={id} className={className}>
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
        <input
          className='bill-item centered'
          value={newAmount}
          onChange={e => editField(e, 'amount')}
        />
      </td>
      <td>
        <input
          className='bill-item centered'
          value={newDueDate}
          onChange={e => editField(e, 'duedate')}
        />
      </td>
      <td className='centered'>
        <button id={buttonType} className='table-button' onClick={onClick}>
          {buttonType == 'table-delete-button' ? 'X' : '✓'}
        </button>
      </td>
    </tr>
  );
};

export default BillRow;
