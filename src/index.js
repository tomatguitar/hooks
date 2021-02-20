import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <HookSwitcher />;
    </div>
  );
};

const HookSwitcher = () => {
  const [color, setColor] = useState('white');
  const [fontSize, setFontSize] = useState(14);
  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: color,
        fontSize: `${fontSize}px`,
      }}
    >
      <h1>TEXT</h1>
      <button
        onClick={() => {
          setColor('black');
        }}
      >
        Dark
      </button>
      <button
        onClick={() => {
          setColor('white');
        }}
      >
        Light
      </button>
      <button
        onClick={() => {
          setFontSize((prevFontSize) => prevFontSize + 7);
        }}
      >
        Bigger
      </button>
      <button
        onClick={() => {
          setFontSize((prevFontSize) => prevFontSize - 7);
        }}
      >
        Smaller
      </button>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
