import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

const MyContext = React.createContext();

const App = () => {
  return (
    <MyContext.Provider value="Hello 123">
      <Child />
    </MyContext.Provider>
  );
};

const Child = () => {
  const context = useContext(MyContext);
  return <p>{context}</p>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
