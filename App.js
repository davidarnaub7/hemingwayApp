/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {STORE} from './src/redux/reduxMain';
import Init from './src/view/init';

const App = () => {
  return (
    <Provider store={STORE}>
      {/* manin rout handler */}
      <Init />
    </Provider>
  );
};

export default App;
