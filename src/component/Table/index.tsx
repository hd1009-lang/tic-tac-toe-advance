import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Board, Col } from '../../type';
import { checkIsWinner } from '../../utils';
import Item from './Item';
interface Props {
  dataBoard: Board;
}
enum role {
  x = 'x',
  o = 'o',
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
    localStorage.setItem('currentPlayer', role.x);
    createBoard(dataBoard.row, dataBoard.col);
  }, []);
  const checkedItem = useCallback((row: number, col: number) => {
    const currentPlayer = localStorage.getItem('currentPlayer') || '';
    setBoard((board) => {
      const currentBoard = board;
      currentBoard[row][col].value = currentPlayer;
      checkIsWinner(currentBoard, row, col);
      return currentBoard;
    });

    if (currentPlayer === role.x) {
      localStorage.setItem('currentPlayer', role.o);
    } else {
      localStorage.setItem('currentPlayer', role.x);
    }
  }, []);
  return (
    <div className='table'>
      {board.map((row, indexRow) => {
        return (
          <div key={indexRow} className='col'>
            {row.map((item) => {
              return <Item key={item.col + '-' + item.row} checkedItem={checkedItem} col={item.col} row={item.row} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Table);
