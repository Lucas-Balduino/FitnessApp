import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Lexend_400Regular,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black
} from '@expo-google-fonts/lexend';

import AppDrawer from './src/navigation/AppDrawer';
import AuthStack from './src/navigation/AuthStack';
import LoadingOverlay from './src/components/LoadingOverlay';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [authCarregando, setAuthCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setAuthCarregando(false);
    });
    return unsubscribe;
  }, []);

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });

  if (!fontsLoaded || authCarregando) {
    return <LoadingOverlay mensagem="Carregando..." />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FE" />
        <NavigationContainer>
          {usuario ? <AppDrawer /> : <AuthStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}