import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import Dashboard from '../screens/Dashboard';
import CriarTreino from '../screens/CriarTreino';
import DetalhesTreino from '../screens/DetalhesTreino';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
        cardStyle: { flex: 1, backgroundColor: '#F8F9FE' },
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="CriarTreino" component={CriarTreino} />
      <Stack.Screen name="DetalhesTreino" component={DetalhesTreino} />
    </Stack.Navigator>
  );
}
