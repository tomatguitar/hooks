import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);
  if (visible) {
    return (
      <div>
        <button
          onClick={() => {
            setValue((v) => v + 1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setValue((v) => v - 1);
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          Hide
        </button>
        <PlanetInfo id={value} />
        {/* <Notification /> */}
        {/* <ClassCounter value={value} /> */}
        {/* <HookCounter value={value} /> */}
      </div>
    );
  } else {
    return (
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        Show
      </button>
    );
  }
};

const usePlanetInfo = (id) => {
  const [planetName, setPlanetName] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`http://swapi.dev/api/planets/${id}`)
      .then((res) => res.json())
      .then((data) => !cancelled && setPlanetName(data.name));
    return () => (cancelled = true);
  }, [id]);

  return planetName;
};

const PlanetInfo = ({ id }) => {
  const name = usePlanetInfo(id);
  return (
    <div>
      {id} - {name}
    </div>
  );
};

// const Notification = () => {
//   const [visible, setVisible] = useState(true);
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(false);
//       console.log('Hidden');
//     }, 1500);
//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [visible]);
//   return <div>{visible && <p>Hello</p>}</div>;
// };

// const HookCounter = ({ value }) => {
//   useEffect(() => {
//     console.log('useEffect()');
//     return () => console.log('clear');
//   });
//   return <p>{value}</p>;
// };

// class ClassCounter extends Component {
//   componentDidMount() {
//     console.log('class: mount');
//   }
//   componentDidUpdate() {
//     console.log('class: update');
//   }
//   componentWillUnmount() {
//     console.log('class: unmount');
//   }
//   render() {
//     return <p>{this.props.value}</p>;
//   }
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
