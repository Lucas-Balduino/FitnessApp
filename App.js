import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Lexend_400Regular,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black
} from '@expo-google-fonts/lexend';

import AppDrawer from './src/navigation/AppDrawer';
import AuthStack from './src/navigation/AuthStack';

export default function App() {
  // Flag temporária para forçar usuário "logado" e testarmos o Drawer
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#005CEE" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FE" />
      <NavigationContainer>
        {isLoggedIn ? <AppDrawer /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  }
});