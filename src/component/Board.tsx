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
    row: 30,
    col: 30,
    data: [[{ idCol: '', value: 'x', id: '' }]],
  },
  timeToWin: -1,
  winner: '',
};
const Board = () => {
  console.log('Loop Board');

  const [room, setRoom] = useState<Room>(initialRoom);

  const updatePlayerInRoom = (playerX: string, playerO: string) => {
    setRoom((room) => ({ ...room, playerX, playerO }));
  };
  const setWinnerWhenTimeOut = () => {
    setRoom((room) => ({ ...room, winner: 'draw', timeToWin: 0 }));
  };
  const getTimeWhenWin = (currentTime: number) => {
    setRoom((room) => ({ ...room, timeToWin: 20 * 60 - currentTime }));
  };
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
      <div>
        <div className='flex-center'>
          <span>X: {room.playerX}</span>
          <Countdown
            initialTime={20 * 60}
            setWinnerWhenTimeOut={setWinnerWhenTimeOut}
            winner={room.winner}
            getTimeWhenWin={getTimeWhenWin}
          />
          <span>O: {room.playerO}</span>
        </div>
      </div>

      {room.winner && (
        <Notification>
          {room.winner === 'draw' ? 'Hòa' : <span>Người chiến thắng:{room.winner} </span>}
          <div>
            <span>Thời gian chơi là: </span>
            <span>{handleTime(Math.floor(room.timeToWin / 3600))}:</span>
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
