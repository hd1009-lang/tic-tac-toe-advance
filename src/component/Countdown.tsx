import React, { useEffect, useState } from 'react';
import { handleTime } from '../utils';
interface Props {
  setWinnerWhenTimeOut: () => void;
  initialTime: number;
}
const Countdown = ({ setWinnerWhenTimeOut, initialTime }: Props) => {
  const [timer, setTimer] = useState(initialTime);
  const toggleCountDown = () => {
    var blob = new Blob(["setInterval(function() { postMessage('')}, 1000);"]);
    const url = window.URL.createObjectURL(blob);
    const MyWorker = new Worker(url);
    MyWorker.onmessage = function () {
      setTimer((timer) => {
        if (timer > 0) {
          return timer - 1;
        }
        if (timer <= 0) {
          MyWorker.terminate();
          window.URL.revokeObjectURL(url);
        }
        return timer;
      });
    };
  };
  useEffect(() => {
    if (timer === initialTime) {
      toggleCountDown();
    }
  }, []);
  useEffect(() => {
    if (timer === 0) {
      setWinnerWhenTimeOut();
    }
    document.title = `${
      timer > 0
        ? `${handleTime(Math.floor(timer / 3600))}:${handleTime(Math.floor(timer / 60) - Math.floor(timer / 3600) * 60)}:${handleTime(
            Number((timer % 60).toFixed(0)),
          )}`
        : 'Interview'
    }`;
  }, [timer]);
  return (
    <div className='box-countdown'>
      {' '}
      <span> {handleTime(Math.floor(timer / 3600))} : </span>
      <span> {handleTime(Math.floor(timer / 60) - Math.floor(timer / 3600) * 60)} : </span>
      <span> {handleTime(Number((timer % 60).toFixed(0)))}</span>
    </div>
  );
};

export default React.memo(Countdown);
