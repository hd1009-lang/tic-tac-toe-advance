import { Col } from '../type';

export const handleTime = (time: number) => {
  if (time < 10) {
    return '0' + time;
  }
  return time;
};
export const checkIsWinner = (board: Col[], currentRow: number, currentCol: number) => {
  let result = { countY: 0, countX: 0, countZ: 0, wrappedZ: 0, wrappedY: 0, wrappedX: 0 };
  result.countY++;
  result.countX++;
  result.countZ++;
  checkWinnerOnTopY(board, currentRow, currentCol, result);
  checkWinnerUnderY(board, currentRow, currentCol, result);
  checkWinnerLeftX(board, currentRow, currentCol, result);
  checkWinnerRightX(board, currentRow, currentCol, result);
  checkWinnerOnTopZ(board, currentRow, currentCol, result);
  checkWinnerUnderZ(board, currentRow, currentCol, result);
  if (
    (result.countX === 4 && result.wrappedX === 0) ||
    (result.countY === 4 && result.wrappedY === 0) ||
    (result.countZ === 4 && result.wrappedZ === 0)
  ) {
    return true;
  }
  if (
    (result.countY === 5 && result.wrappedY < 2) ||
    (result.countX === 5 && result.wrappedX < 2) ||
    (result.countZ === 5 && result.wrappedZ < 2)
  ) {
    return true;
  }
  return false;
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
    return;
  }
  console.log('Up', result.countY);
};
const checkWinnerUnderY = (board: Col[], currentRow: number, currentCol: number, result: { countY: number; wrappedY: number }) => {
  if (board[currentRow + 1] && board[currentRow + 1][currentCol].value === board[currentRow][currentCol].value) {
    result.countY++;
    checkWinnerUnderY(board, currentRow + 1, currentCol, result);
  }
  if (
    board[currentRow + 1] &&
    board[currentRow + 1][currentCol].value &&
    board[currentRow + 1][currentCol].value !== board[currentRow][currentCol].value
  ) {
    result.wrappedY++;
    return;
  }
  console.log('under', result.countY);
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
//z
const checkWinnerOnTopZ = (board: Col[], currentRow: number, currentCol: number, result: { countZ: number; wrappedZ: number }) => {
  if (!board[currentRow - 1] || !board[currentRow - 1][currentCol - 1]) {
    return;
  }
  if (board[currentRow - 1][currentCol - 1].value === board[currentRow][currentCol].value) {
    result.countZ++;
    checkWinnerOnTopZ(board, currentRow - 1, currentCol - 1, result);
  }
  if (board[currentRow - 1][currentCol - 1].value && board[currentRow - 1][currentCol - 1].value !== board[currentRow][currentCol].value) {
    result.wrappedZ++;
  }
};
const checkWinnerUnderZ = (board: Col[], currentRow: number, currentCol: number, result: { countZ: number; wrappedZ: number }) => {
  if (!board[currentRow + 1] || !board[currentRow + 1][currentCol + 1]) {
    return;
  }
  if (board[currentRow + 1][currentCol + 1].value === board[currentRow][currentCol].value) {
    result.countZ++;
    checkWinnerUnderZ(board, currentRow + 1, currentCol + 1, result);
  }
  if (board[currentRow + 1][currentCol + 1].value && board[currentRow + 1][currentCol + 1].value !== board[currentRow][currentCol].value) {
    result.wrappedZ++;
  }
};
