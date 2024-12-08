import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/context/useAuthContext';
import AppNavigation from './src/navigation/appNavigation';

function App() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <AppNavigation />
          <Toast />
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
