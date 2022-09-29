import { useCallback, useState } from 'react';
import { role, Room } from '../type';
import { handleTime } from '../utils';
import Countdown from './Countdown';
import FormRegister from './FormRegister';
import Notification from './Notification';
import Table from './Table';
const initialRoom = {
  playerX: '',
  playerO: '',
  board: {
    row: 10,
    col: 10,
    data: [[{ idCol: '', value: 'x', id: '' }]],
  },
  timeToWin: -1,
  winner: '',
};
const Board = () => {
  const [room, setRoom] = useState<Room>(initialRoom);

  const updatePlayerInRoom = (playerX: string, playerO: string) => {
    setRoom((room) => ({ ...room, playerX, playerO }));
  };
  const setWinnerWhenTimeOut = () => {
    setRoom((room) => ({ ...room, winner: 'draw', timeToWin: 0 }));
  };
  const getTimeWhenWin = useCallback((currentTime: number) => {
    setRoom((room) => ({ ...room, timeToWin: 20 * 60 - currentTime }));
  }, []);
  const getWinner = useCallback((currentRole: string) => {
    if (currentRole === role.x) {
      setRoom((room) => ({ ...room, winner: room.playerX }));
    } else {
      setRoom((room) => ({ ...room, winner: room.playerO }));
    }
  }, []);

  const resetGame = () => {
    const resetBoard = initialRoom.board;
    const currentRoom = { ...room };
    currentRoom.board = { ...resetBoard };
    currentRoom.winner = '';
    currentRoom.timeToWin = -1;
    setRoom(currentRoom);
  };
  if (!room.playerX || !room.playerO) {
    return <FormRegister updatePlayerInRoom={updatePlayerInRoom} />;
  }
  return (
    <div className='board'>
      <Countdown initialTime={20 * 60} setWinnerWhenTimeOut={setWinnerWhenTimeOut} winner={room.winner} getTimeWhenWin={getTimeWhenWin} />
      {room.winner && (
        <Notification>
          <span>Người chiến thắng: </span>
          {room.winner === 'draw' ? 'Hòa' : room.winner}
          <div>
            <span>Trong thời gian là: </span>
            <span> {handleTime(Math.floor(room.timeToWin / 3600))}:</span>
            <span> {handleTime(Math.floor(room.timeToWin / 60) - Math.floor(room.timeToWin / 3600) * 60)}:</span>
            <span> {handleTime(Number((room.timeToWin % 60).toFixed(0)))}</span>
          </div>
          <div className='box-btn'>
            <button className='btn' onClick={() => resetGame()}>
              Cài đặt lại
            </button>
          </div>
        </Notification>
      )}
      <Table dataBoard={room.board} getWinner={getWinner} />
    </div>
  );
};

export default Board;
