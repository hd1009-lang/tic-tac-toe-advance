export interface Room {
  playerX: string;
  playerO: string;
  board: Board;
  timeToWin: number;
  winner: string;
}
export interface Board {
  row: number;
  col: number;
  data: Col[];
}
export type Col = Row[];
export interface Row {
  id: string;
  idCol: string;
  value: string;
}

export enum role {
  x = 'x',
  o = 'o',
}
