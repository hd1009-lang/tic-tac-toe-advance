import { Col } from '../type';

export const handleTime = (time: number) => {
  if (time < 10) {
    return '0' + time;
  }
  return time;
};
export const checkIsWinner = (board: Col[], currentRow: number, currentCol: number) => {
  let result = { countY: 0, countX: 0, wrappedY: 0, wrappedX: 0 };
  console.log(result);
  result.countY++;
  result.countX++;
  checkWinnerOnTopY(board, currentRow, currentCol, result);
  checkWinnerUnderY(board, currentRow, currentCol, result);
  checkWinnerLeftX(board, currentRow, currentCol, result);
  checkWinnerRightX(board, currentRow, currentCol, result);
  console.log('After', result);
  if ((result.countX === 4 && result.wrappedX === 0) || (result.countY === 4 && result.wrappedY === 0)) {
    alert('Winner X');
    return;
  }
  if ((result.countY === 5 && result.wrappedY < 2) || (result.countX === 5 && result.wrappedX < 2)) {
    alert('Winner Y');
    return;
  }
};
//basic logic :D
//y
const checkWinnerOnTopY = (board: Col[], currentRow: number, currentCol: number, result: { countY: number; wrappedY: number }) => {
  if (board[currentRow - 1] && board[currentRow - 1][currentCol].value === board[currentRow][currentCol].value) {
    result.countY++;
    checkWinnerOnTopY(board, currentRow - 1, currentCol, result);
  }
  if (
    board[currentRow - 1] &&
    board[currentRow - 1][currentCol].value &&
    board[currentRow - 1][currentCol].value !== board[currentRow][currentCol].value
  ) {
    result.wrappedY++;
  }
};
const checkWinnerUnderY = (board: Col[], currentRow: number, currentCol: number, result: { countY: number; wrappedY: number }) => {
  if (board[currentRow + 1] && board[currentRow + 1][currentCol].value === board[currentRow][currentCol].value) {
    result.countY++;
    checkWinnerOnTopY(board, currentRow + 1, currentCol, result);
  }
  if (
    board[currentRow + 1] &&
    board[currentRow + 1][currentCol].value &&
    board[currentRow + 1][currentCol].value !== board[currentRow][currentCol].value
  ) {
    result.wrappedY++;
  }
};

//X
const checkWinnerRightX = (board: Col[], currentRow: number, currentCol: number, result: { countX: number; wrappedX: number }) => {
  if (board[currentRow][currentCol - 1] && board[currentRow][currentCol - 1].value === board[currentRow][currentCol].value) {
    result.countX++;
    checkWinnerRightX(board, currentRow, currentCol - 1, result);
  }
  if (
    board[currentRow][currentCol - 1] &&
    board[currentRow][currentCol - 1].value &&
    board[currentRow][currentCol - 1].value !== board[currentRow][currentCol].value
  ) {
    result.wrappedX++;
  }
};
const checkWinnerLeftX = (board: Col[], currentRow: number, currentCol: number, result: { countX: number; wrappedX: number }) => {
  if (board[currentRow][currentCol + 1] && board[currentRow][currentCol + 1].value === board[currentRow][currentCol].value) {
    result.countX++;
    checkWinnerLeftX(board, currentRow, currentCol + 1, result);
  }
  if (
    board[currentRow][currentCol + 1] &&
    board[currentRow][currentCol + 1].value &&
    board[currentRow][currentCol + 1].value !== board[currentRow][currentCol].value
  ) {
    result.wrappedX++;
  }
};
