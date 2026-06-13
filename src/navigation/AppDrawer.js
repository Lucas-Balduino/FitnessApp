import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Stacks e Telas
import HomeStack from './HomeStack';
import CustomDrawerContent from '../components/CustomDrawerContent';
import BibliotecaStack from './BibliotecaStack';
import PerfilScreen from '../screens/PerfilScreen';

// Ícones
import HomeIcon from '../Icons/HomeIcon.svg';
import DumbellIcon from '../Icons/DumbellIcon.svg';
import ProfileIcon from '../Icons/ProfileIcon.svg';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        // Garante altura limitada para ScrollViews nas telas filhas
        sceneStyle: { flex: 1, backgroundColor: '#F8F9FE' },
        // Drawer só responde ao gesto na borda esquerda — não compete com scroll vertical
        swipeEdgeWidth: 32,
        drawerActiveBackgroundColor: '#005CEE',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#9CA3AF',
        drawerLabelStyle: {
          fontFamily: 'Lexend_700Bold',
          fontSize: 14,
        },
        drawerItemStyle: {
          borderRadius: 12, 
          paddingHorizontal: 8,
          marginVertical: 4,
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
        component={BibliotecaStack}
        options={{
          drawerLabel: 'Biblioteca',
          drawerIcon: ({ color }) => <DumbellIcon width={22} height={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: ({ color }) => <ProfileIcon width={22} height={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
