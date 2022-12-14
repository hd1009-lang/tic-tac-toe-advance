import React, { useState } from 'react';

interface Props {
  checkedItem: (row: number, col: number) => void;
  col: number;
  row: number;
}

const Item = ({ checkedItem, col, row }: Props) => {
  console.log('Loop Item', row, col);
  const [value, setValue] = useState<string>('');
  const handleChecked = () => {
    if (value) {
      return;
    } else {
      const currentPlayer = localStorage.getItem('currentPlayer') || 'x';
      setValue(currentPlayer);
      checkedItem(row, col);
    }
  };
  return (
    <div className='item flex-center' onClick={() => handleChecked()}>
      {value}
    </div>
  );
};

export default React.memo(Item);
