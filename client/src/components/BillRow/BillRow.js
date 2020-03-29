import React, { useState } from 'react';

import './BillRow.css';

const BillRow = props => {
  const { id, className, billname, amount, category, duedate, onClick } = props;
  const [newAmount, setNewAmount] = useState(amount);
  const [buttonType, setButtonType] = useState('table-delete-button');

  const editField = e => {
    e.preventDefault();
    setNewAmount(e.target.value);
    setButtonType('table-update-button');
    console.log(buttonType);
  };

  console.log(buttonType);
  return (
    <tr key={id} className={className}>
      <td>{billname}</td>
      <td>{category ? `${category}` : 'None'}</td>
      <td className='centered'>
        <input value={newAmount} onChange={e => editField(e)} />
      </td>
      <td className='centered'>
        {duedate}
        {duedate[0] === 1 || duedate[1] === 1
          ? 'st'
          : duedate[0] === 2 || duedate[1] === 2
          ? 'nd'
          : duedate[0] == 3 || duedate[1] == 3
          ? 'rd'
          : 'th'}
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
