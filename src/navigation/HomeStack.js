import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import Dashboard from '../screens/Dashboard';
import CriarTreino from '../screens/CriarTreino';
// Temporariamente apontando DetalhesTreino para TreinoMusculacao até a Fase 2
import TreinoMusculacao from '../screens/TreinoMusculacao';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false // Desativa animação nativa para usarmos o nosso custom hook depois
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="CriarTreino" component={CriarTreino} />
      <Stack.Screen name="DetalhesTreino" component={TreinoMusculacao} />
    </Stack.Navigator>
  );
}
