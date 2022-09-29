import React, { useCallback, useEffect, useState } from 'react';
import { role, Room } from '../type';
import { handleTime } from '../utils';
import Countdown from './Countdown';
import FormRegister from './FormRegister';
import Table from './Table';
const Board = () => {
  const [room, setRoom] = useState<Room>({
    playerX: '',
    playerO: '',
    board: {
      row: 10,
      col: 10,
      data: [[{ idCol: '', value: 'x', id: '' }]],
    },
    timeToWin: -1,
    winner: '',
  });

  const updatePlayerInRoom = useCallback((playerX: string, playerO: string) => {
    setRoom((room) => ({ ...room, playerX, playerO }));
  }, []);
  const setWinnerWhenTimeOut = useCallback(() => {
    alert('Draw');
    setRoom((room) => ({ ...room, winner: 'Draw' }));
  }, []);
  const getTimeWhenWin = useCallback((currentTime: number) => {
    setRoom((room) => ({ ...room, timeToWin: currentTime }));
  }, []);
  const getWinner = useCallback((currentRole: string) => {
    if (currentRole === role.x) {
      setRoom((room) => ({ ...room, winner: room.playerX }));
    } else {
      setRoom((room) => ({ ...room, winner: room.playerO }));
    }
  }, []);
  const expandBoard = (row: number, col: number) => {
    const currentBoard = room.board;
    currentBoard.col = col;
    currentBoard.row = row;
    setRoom((room) => ({ ...room, board: currentBoard }));
  };
  if (!room.playerX || !room.playerO) {
    return <FormRegister updatePlayerInRoom={updatePlayerInRoom} />;
  }
  return (
    <div className='board'>
      <Countdown initialTime={20 * 60} setWinnerWhenTimeOut={setWinnerWhenTimeOut} winner={room.winner} getTimeWhenWin={getTimeWhenWin} />
      <Table dataBoard={room.board} getWinner={getWinner} expandBoard={expandBoard} />
      <div className='main-board'>
        {room.winner && (
          <div>
            {room.winner}
            <div>
              <span> {handleTime(Math.floor(room.timeToWin / 3600))} : </span>
              <span> {handleTime(Math.floor(room.timeToWin / 60) - Math.floor(room.timeToWin / 3600) * 60)} : </span>
              <span> {handleTime(Number((room.timeToWin % 60).toFixed(0)))}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
