import { Col } from '../type';

export const handleTime = (time: number) => {
  if (time < 10) {
    return '0' + time;
  }
  return time;
};
export const checkIsWinner = (board: Col[], currentRow: number, currentCol: number) => {
  let result = { countY: 0, countX: 0, countZR: 0, wrappedZR: 0, countZL: 0, wrappedZL: 0, wrappedY: 0, wrappedX: 0 };
  result.countY++;
  result.countX++;
  result.countZR++;
  result.countZL++;
  checkWinnerOnTopY(board, currentRow, currentCol, result);
  checkWinnerUnderY(board, currentRow, currentCol, result);
  checkWinnerLeftX(board, currentRow, currentCol, result);
  checkWinnerRightX(board, currentRow, currentCol, result);
  checkWinnerOnTopZR(board, currentRow, currentCol, result);
  checkWinnerUnderZR(board, currentRow, currentCol, result);
  checkWinnerOnTopZL(board, currentRow, currentCol, result);
  checkWinnerUnderZL(board, currentRow, currentCol, result);
  if (
    (result.countY === 5 && result.wrappedY < 2) ||
    (result.countX === 5 && result.wrappedX < 2) ||
    (result.countZR === 5 && result.wrappedZR < 2) ||
    (result.countZL === 5 && result.wrappedZL < 2)
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
const checkWinnerOnTopZR = (board: Col[], currentRow: number, currentCol: number, result: { countZR: number; wrappedZR: number }) => {
  if (!board[currentRow - 1] || !board[currentRow - 1][currentCol - 1]) {
    return;
  }
  if (board[currentRow - 1][currentCol - 1].value === board[currentRow][currentCol].value) {
    result.countZR++;
    checkWinnerOnTopZR(board, currentRow - 1, currentCol - 1, result);
  }
  if (board[currentRow - 1][currentCol - 1].value && board[currentRow - 1][currentCol - 1].value !== board[currentRow][currentCol].value) {
    result.wrappedZR++;
  }
};
const checkWinnerOnTopZL = (board: Col[], currentRow: number, currentCol: number, result: { countZL: number; wrappedZL: number }) => {
  if (!board[currentRow - 1] || !board[currentRow - 1][currentCol + 1]) {
    return;
  }
  if (board[currentRow - 1][currentCol + 1].value === board[currentRow][currentCol].value) {
    result.countZL++;
    checkWinnerOnTopZL(board, currentRow - 1, currentCol + 1, result);
  }
  if (board[currentRow - 1][currentCol + 1].value && board[currentRow - 1][currentCol + 1].value !== board[currentRow][currentCol].value) {
    result.wrappedZL++;
  }
};
const checkWinnerUnderZR = (board: Col[], currentRow: number, currentCol: number, result: { countZR: number; wrappedZR: number }) => {
  if (!board[currentRow + 1] || !board[currentRow + 1][currentCol + 1]) {
    return;
  }
  if (board[currentRow + 1][currentCol + 1].value === board[currentRow][currentCol].value) {
    result.countZR++;
    checkWinnerUnderZR(board, currentRow + 1, currentCol + 1, result);
  }
  if (board[currentRow + 1][currentCol + 1].value && board[currentRow + 1][currentCol + 1].value !== board[currentRow][currentCol].value) {
    result.wrappedZR++;
  }
};
const checkWinnerUnderZL = (board: Col[], currentRow: number, currentCol: number, result: { countZL: number; wrappedZL: number }) => {
  if (!board[currentRow + 1] || !board[currentRow + 1][currentCol - 1]) {
    return;
  }
  if (board[currentRow + 1][currentCol - 1].value === board[currentRow][currentCol].value) {
    result.countZL++;
    checkWinnerUnderZL(board, currentRow + 1, currentCol - 1, result);
  }
  if (board[currentRow + 1][currentCol - 1].value && board[currentRow + 1][currentCol - 1].value !== board[currentRow][currentCol].value) {
    result.wrappedZL++;
  }
};
