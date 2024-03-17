/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import MainScreens from './src/ui/Screens/MainScreens';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <ToastProvider>
            <MainScreens />
          </ToastProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
