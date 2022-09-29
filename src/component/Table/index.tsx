import React, { useEffect, useState } from 'react';
import { Board, Col, role } from '../../type';
import { checkIsWinner } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
interface Props {
  dataBoard: Board;
  getWinner: (currentRole: string) => void;
}

const Table = ({ dataBoard, getWinner }: Props) => {
  console.log('Loop TABLE');
  const [board, setBoard] = useState<Col[]>(dataBoard.data);
  const createBoard = (numOfRow: number, numOfCol: number) => {
    const newBoard = [];
    for (let row = 0; row < numOfRow; row++) {
      const idRow = uuidv4();
      const newRow = [];
      for (let col = 0; col < numOfCol; col++) {
        const idCol = uuidv4();
        newRow.push({ id: idRow, idCol, value: '' });
      }
      newBoard.push(newRow);
    }
    setBoard(newBoard);
  };
  const expandTable = (row: number, col: number) => {
    const currentBoard = [...board];
    if (row === 0) {
      const newRow = currentBoard[0].map((item) => {
        return {
          id: uuidv4(),
          idCol: uuidv4(),
          value: '',
        };
      });
      currentBoard.unshift(newRow);
      setBoard(currentBoard);
    }
    if (row === currentBoard.length - 1) {
      const newRow = currentBoard[0].map((item) => {
        return {
          id: uuidv4(),
          idCol: uuidv4(),
          value: '',
        };
      });
      currentBoard.push(newRow);
      setBoard(currentBoard);
    }
    if (col === 0) {
      currentBoard.forEach((item) => {
        return item.unshift({ id: item[0].id, idCol: uuidv4(), value: '' });
      });
      setBoard(currentBoard);
    }
    if (col === board[0].length - 1) {
      currentBoard.forEach((item) => {
        return item.push({ id: item[0].id, idCol: uuidv4(), value: '' });
      });
      setBoard(currentBoard);
    }
  };
  useEffect(() => {
    localStorage.setItem('currentPlayer', role.x);
    createBoard(dataBoard.row, dataBoard.col);
  }, [dataBoard]);

  const checkedItem = (row: number, col: number) => {
    const currentPlayer = localStorage.getItem('currentPlayer') || '';
    const currentBoard = board;
    currentBoard[row][col].value = currentPlayer;
    setBoard(currentBoard);
    const isWinner = checkIsWinner(currentBoard, row, col);
    if (isWinner) {
      getWinner(currentPlayer);
    }
    if (currentPlayer === role.x) {
      localStorage.setItem('currentPlayer', role.o);
    } else {
      localStorage.setItem('currentPlayer', role.x);
    }
    expandTable(row, col);
  };

  return (
    <div className='table'>
      {board.map((row, indexRow) => {
        return (
          <div key={board[indexRow][0].id} className='col'>
            {row.map((item, indexCol) => {
              return <Item key={item.idCol} checkedItem={checkedItem} col={indexCol} row={indexRow} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Table);
