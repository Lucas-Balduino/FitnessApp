import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Biblioteca from '../screens/Biblioteca';
import DetalheExercicioScreen from '../screens/DetalheExercicioScreen';

const Stack = createStackNavigator();

export default function BibliotecaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="ListaExercicios" component={Biblioteca} />
      <Stack.Screen name="DetalheExercicio" component={DetalheExercicioScreen} />
    </Stack.Navigator>
  );
}
