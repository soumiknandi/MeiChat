import React from 'react';

import Navigation from './Navigation';
import {Provider} from './context/SocketContext';
import {View} from 'react-native';

const App = () => {
  return (
    <Provider>
      <Navigation />
    </Provider>
  );
};

export default App;
