import React, { useCallback, useState } from 'react';
import { Room } from '../type';
import { handleTime } from '../utils';
import Countdown from './Countdown';
import FormRegister from './FormRegister';
import Table from './Table';
const Board = () => {
  const [room, setRoom] = useState<Room>({
    playerX: '',
    playerO: '',
    board: {
      row: 30,
      col: 30,
      data: [[{ col: 0, row: 0, value: 'x' }]],
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
  if (!room.playerX || !room.playerO) {
    return <FormRegister updatePlayerInRoom={updatePlayerInRoom} />;
  }
  return (
    <div className='board'>
      {!room.winner && <Countdown initialTime={20 * 60} setWinnerWhenTimeOut={setWinnerWhenTimeOut} />}
      <Table dataBoard={room.board} />
      <div className='main-board'>{room.winner && room.winner}</div>
    </div>
  );
};

export default Board;
