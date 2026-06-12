import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Ícones
import SearchIcon from '../Icons/SearchIcon.svg';
import ChevronRightIcon from '../Icons/ChevronRightIcon.svg';
import DumbellIcon from '../Icons/DumbellIcon.svg';

// Mock temporário para a Biblioteca
const CATEGORIAS = ['Todos', 'Peito', 'Pernas', 'Costas'];

const EXERCICIOS_MOCK = [
  { id: '1', nome: 'SUPINO RETO', categoria: 'Peito', iconeCor: '#E6F0FF', iconColor: '#005CEE' },
  { id: '2', nome: 'AGACHAMENTO LIVRE', categoria: 'Pernas', iconeCor: '#E6F0FF', iconColor: '#005CEE' },
  { id: '3', nome: 'REMADA CURVADA', categoria: 'Costas', iconeCor: '#E6F0FF', iconColor: '#005CEE' },
];

export default function Biblioteca() {
  const navigation = useNavigation();
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');

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
          <Text style={styles.mainTitle}>BIBLIOTECA</Text>
          <Text style={styles.subtitle}>
            Explore exercícios reais para complementar seus treinos
          </Text>
        </View>

        {/* BARRA DE BUSCA */}
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar exercício..."
            placeholderTextColor="#9CA3AF"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        {/* FILTROS DE CATEGORIA */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filtersWrapper}
          contentContainerStyle={styles.filtersContainer}
        >
          {CATEGORIAS.map((cat) => {
            const isAtivo = categoriaAtiva === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategoriaAtiva(cat)}
                style={[styles.filterChip, isAtivo && styles.filterChipActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, isAtivo && styles.filterTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* LISTA DE EXERCÍCIOS */}
        <Text style={styles.sectionTitle}>EXERCÍCIOS</Text>

        <View style={styles.listContainer}>
          {EXERCICIOS_MOCK.map((ex) => (
            <TouchableOpacity key={ex.id} style={styles.card} activeOpacity={0.7}>
              <View style={[styles.iconWrapper, { backgroundColor: ex.iconeCor }]}>
                <DumbellIcon width={20} height={20} color={ex.iconColor} />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{ex.nome}</Text>
                <Text style={styles.cardSubtitle}>{ex.categoria}</Text>
              </View>

              <ChevronRightIcon width={20} height={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Lexend_400Regular',
    fontSize: 15,
    color: '#1A1C29',
    height: '100%',
  },
  filtersWrapper: {
    flexGrow: 0,
    marginBottom: 32,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  filterChipActive: {
    backgroundColor: '#005CEE',
    borderColor: '#005CEE',
  },
  filterText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 13,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 2,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 16,
    color: '#1A1C29',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 13,
    color: '#9CA3AF',
  },
});
