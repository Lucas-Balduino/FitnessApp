import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import CustomSwitch from '../components/CustomSwitch';
import CustomPicker from '../components/CustomPicker';

import ChevronDownIcon from '../Icons/ChevronDownIcon.svg';

export default function PerfilScreen() {
  const navigation = useNavigation();
  
  // Estados Locais (Mocks temporários)
  const [nome, setNome] = useState('Lucas Silva');
  const [email] = useState('lucas@email.com');
  const [nivel, setNivel] = useState('Intermediário');
  
  // Controle do CustomPicker
  const [pickerVisible, setPickerVisible] = useState(false);
  const opcoesNivel = ['Iniciante', 'Intermediário', 'Avançado', 'Expert'];
  
  const [notificacoes, setNotificacoes] = useState(true);
  const [treinoParceiro, setTreinoParceiro] = useState(false);
  
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = () => {
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      alert('Alterações salvas com sucesso! (Mock)');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── CABEÇALHO ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logoKinetic}>KINETIC</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TÍTULO E SUBTÍTULO */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>MEU PERFIL</Text>
          <Text style={styles.subtitle}>
            Gerencie seus dados e preferências
          </Text>
        </View>

        {/* TOP CARD: AVATAR E EMAIL */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>{nome.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.avatarTextContainer}>
            <Text style={styles.avatarName}>{nome}</Text>
            <Text style={styles.avatarEmail}>{email}</Text>
          </View>
        </View>

        {/* DADOS PESSOAIS */}
        <Text style={styles.sectionTitle}>DADOS PESSOAIS</Text>
        <View style={styles.cardGroup}>
          <View style={styles.cardItem}>
            <Text style={styles.cardLabel}>NOME</Text>
            <TextInput 
              style={styles.cardInput}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.cardItem}>
            <Text style={styles.cardLabel}>NÍVEL DE EXPERIÊNCIA</Text>
            <TouchableOpacity style={styles.pickerRow} onPress={() => setPickerVisible(true)}>
              <Text style={styles.pickerText}>{nivel}</Text>
              <ChevronDownIcon width={20} height={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* PREFERÊNCIAS */}
        <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text>
        <View style={styles.cardGroup}>
          <View style={styles.switchCard}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchTitle}>Notificações de Treino</Text>
              <Text style={styles.switchSubtitle}>Me lembre de fazer meus treinos</Text>
            </View>
            <CustomSwitch
              value={notificacoes}
              onValueChange={setNotificacoes}
              activeColor="#34D399"
            />
          </View>

          <View style={styles.switchCard}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchTitle}>Treino com parceiro</Text>
              <Text style={styles.switchSubtitle}>Compartilhe métricas</Text>
            </View>
            <CustomSwitch
              value={treinoParceiro}
              onValueChange={setTreinoParceiro}
              activeColor="#34D399"
            />
          </View>
        </View>
      </ScrollView>

      {/* BOTÕES (Fixo embaixo) */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.mainButton, salvando && styles.mainButtonDisabled]} 
          onPress={handleSalvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.mainButtonText}>SALVAR ALTERAÇÕES</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            const { getAuth, signOut } = await import('firebase/auth');
            const auth = getAuth();
            signOut(auth).catch(e => alert(e.message));
          }}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <CustomPicker 
        visible={pickerVisible}
        tipo="Nível de Experiência"
        opcoes={opcoesNivel}
        onClose={() => setPickerVisible(false)}
        onSelect={(opcao) => {
          setNivel(opcao);
          setPickerVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: '#005CEE',
  },
  logoKinetic: {
    fontFamily: 'Lexend_900Black',
    fontSize: 20,
    color: '#005CEE',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 24,
  },
  mainTitle: {
    fontFamily: 'Lexend_900Black',
    fontSize: 40,
    color: '#1A1C29',
    lineHeight: 44,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 15,
    color: '#6B7280',
  },
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarLetter: {
    fontFamily: 'Lexend_900Black',
    fontSize: 28,
    color: '#005CEE',
    marginTop: 4,
  },
  avatarTextContainer: {
    flex: 1,
  },
  avatarName: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 18,
    color: '#1A1C29',
    marginBottom: 4,
  },
  avatarEmail: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  sectionTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 2,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  cardGroup: {
    marginHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  cardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  cardLabel: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  cardInput: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 16,
    color: '#1A1C29',
    padding: 0,
    margin: 0,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 16,
    color: '#005CEE',
  },
  switchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  switchTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  switchTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 15,
    color: '#1A1C29',
    marginBottom: 4,
  },
  switchSubtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 13,
    color: '#9CA3AF',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F8F9FE',
  },
  mainButton: {
    backgroundColor: '#005CEE',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#005CEE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  mainButtonDisabled: {
    opacity: 0.7,
  },
  mainButtonText: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  logoutButton: {
    marginTop: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 14,
    color: '#EF4444', // Vermelho (tailwind red-500)
  },
});
