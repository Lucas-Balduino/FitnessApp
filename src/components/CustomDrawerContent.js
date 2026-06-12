import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import LogoutIcon from '../Icons/LogoutIcon.svg';

export default function CustomDrawerContent(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho do Drawer */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarLetter}>L</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText}>Olá, Atleta!</Text>
            <Text style={styles.nameText}>Lucas Silva</Text>
          </View>
        </View>

        {/* Itens do Menu Padrão (Inicio, Biblioteca, Perfil) */}
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Rodapé com botão de Sair */}
      <View style={styles.footer}>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Sair pressionado')}>
          <LogoutIcon width={24} height={24} color="#F44336" style={{ marginRight: 15 }} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>KINETIC v1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingTop: 0,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#005CEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarLetter: {
    fontFamily: 'Lexend_900Black',
    fontSize: 28,
    color: '#FFFFFF',
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  nameText: {
    fontFamily: 'Lexend_900Black',
    fontSize: 20,
    color: '#1A1C29',
  },
  drawerItemsContainer: {
    paddingHorizontal: 15,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 20,
  },
  logoutButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  logoutText: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 16,
    color: '#F44336',
  },
  versionText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 12,
    color: '#9CA3AF',
  }
});
