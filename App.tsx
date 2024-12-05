import 'react-native-reanimated';
import React from 'react';
import AppNavigation from './src/navigation/appNavigation';
import Toast from 'react-native-toast-message';
import {AuthProvider} from './src/context/useAuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigation />
        <Toast />
      </AuthProvider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
