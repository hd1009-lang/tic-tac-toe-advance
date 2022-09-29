import React, { FormHTMLAttributes, useRef } from 'react';

interface Props {
  updatePlayerInRoom: (playerX: string, playerO: string) => void;
}

const FormRegister = ({ updatePlayerInRoom }: Props) => {
  const playerXRef = useRef<HTMLInputElement | null>(null);
  const playerORef = useRef<HTMLInputElement | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const playerX = playerXRef.current?.value;
    const playerO = playerORef.current?.value;
    if (playerX && playerO) {
      updatePlayerInRoom(playerX, playerO);
    } else {
      alert('Chưa đủ người chơi');
    }
  };
  return (
    <form className='form-register' onSubmit={onSubmit}>
      <div className='row'>
        <input ref={playerXRef} placeholder='Tên người chơi X' />
        <input ref={playerORef} placeholder='Tên người chơi O' />
      </div>
      <button type='submit'>Vào chơi</button>
    </form>
  );
};

export default React.memo(FormRegister);
