import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const getPlanet = (id) => {
  return fetch(`http://swapi.dev/api/planets/${id}`)
    .then((res) => res.json())
    .then((data) => data);
};

const useRequest = (request) => {
  const initialState = useMemo(
    () => ({
      data: null,
      loading: true,
      error: null,
    }),
    []
  );

  const [dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);
    let cancelled = false;
    request()
      .then(
        (data) =>
          !cancelled && setDataState({ data, loading: false, error: null })
      )
      .catch(
        (error) =>
          !cancelled && setDataState({ data: null, loading: false, error })
      );
    return () => (cancelled = true);
  }, [request, initialState]);

  return dataState;
};

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id]);

  return useRequest(request);
};

const PlanetInfo = ({ id }) => {
  const { data, loading, error } = usePlanetInfo(id);
  if (error) {
    return <div>Something is wrong</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {id} - {data.name}
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
