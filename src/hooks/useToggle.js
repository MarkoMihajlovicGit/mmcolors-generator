import { useState } from 'react';

function useToggle(initVal = false) {
  //call useState
  const [state, setState] = useState(initVal);
  const toggle = () => {
    setState(state => !state);
  };
  //return pice of state and a function to toggle it
  return [state, toggle];
}

export default useToggle;
