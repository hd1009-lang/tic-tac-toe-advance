import React, { useEffect, useRef, useState } from 'react';
import { Board, Col } from '../../type';
interface Props {
  dataBoard: Board;
}
const Table = ({ dataBoard }: Props) => {
  const initialBoardRow = useRef<number>(dataBoard.row);
  const initialBoardCol = useRef<number>(dataBoard.col);
  const [board, setBoard] = useState<Col[]>(dataBoard.data);
  const createBoard = (numOfRow: number, numOfCol: number) => {
    const newBoard = [];
    for (let row = 0; row < numOfRow; row++) {
      const newRow = [];
      for (let col = 0; col < numOfCol; col++) {
        newRow.push({ row: row, col: col, value: '' });
      }
      newBoard.push(newRow);
    }
    setBoard(newBoard);
  };
  useEffect(() => {
    createBoard(dataBoard.row, dataBoard.col);
  }, []);
  return (
    <div className='table'>
      {board.map((row, indexRow) => {
        return (
          <div key={indexRow} className='col'>
            {row.map((item) => {
              return (
                <div className='item' key={item.col + '-' + item.row}>
                  {item.value}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Table);
