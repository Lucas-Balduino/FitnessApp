import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Stacks e Telas
import HomeStack from './HomeStack';
import CustomDrawerContent from '../components/CustomDrawerContent';

// Ícones
import HomeIcon from '../Icons/HomeIcon.svg';
import DumbellIcon from '../Icons/DumbellIcon.svg';
import ProfileIcon from '../Icons/ProfileIcon.svg';

const Drawer = createDrawerNavigator();

// Telas Placeholder (Serão implementadas nas Fases 4 e 6)
const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FE' }}>
    <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 20, color: '#005CEE' }}>{name}</Text>
    <Text style={{ fontFamily: 'Lexend_400Regular', color: '#9CA3AF', marginTop: 10 }}>
      Em construção...
    </Text>
  </View>
);

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#005CEE',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#9CA3AF',
        drawerLabelStyle: {
          fontFamily: 'Lexend_700Bold',
          fontSize: 14,
          marginLeft: -10, // Aproxima o texto do ícone
        },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color }) => <HomeIcon width={22} height={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Biblioteca"
        component={() => <PlaceholderScreen name="Biblioteca" />}
        options={{
          drawerLabel: 'Biblioteca',
          drawerIcon: ({ color }) => <DumbellIcon width={22} height={22} fill={color} />,
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={() => <PlaceholderScreen name="Perfil" />}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: ({ color }) => <ProfileIcon width={22} height={22} fill={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
