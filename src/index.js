import React from 'react';
import ReactDOM from 'react-dom';

const El = () => {
   return <h1>Hello World!</h1>
}

ReactDOM.render(
  <React.StrictMode>
    <El />
  </React.StrictMode>,
  document.getElementById('root')
);
