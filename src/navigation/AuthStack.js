import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Tela Placeholder de Login (Será implementada na Fase 4)
const LoginPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FE' }}>
    <Text style={{ fontFamily: 'Lexend_900Black', fontSize: 32, color: '#005CEE' }}>KINETIC</Text>
    <Text style={{ fontFamily: 'Lexend_400Regular', color: '#9CA3AF', marginTop: 10 }}>
      Login em construção... (Fase 4)
    </Text>
  </View>
);

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPlaceholder} />
    </Stack.Navigator>
  );
}
