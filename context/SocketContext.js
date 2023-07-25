import React, {createContext} from 'react';
import reducer from './socketReducer';
import actions from './actions';

export const SocketContext = createContext();
const initialState = {
  socket: undefined,
  user: undefined,
  online_users: [],
};

export const Provider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <SocketContext.Provider value={{state, dispatch}}>
      {children}
    </SocketContext.Provider>
  );
};
