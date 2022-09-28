import { useState } from 'react';
import Board from './component/Board';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Board />
    </div>
  );
}

export default App;
