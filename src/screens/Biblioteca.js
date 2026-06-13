import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useWgerExercises } from '../hooks/useWgerExercises';
import LoadingOverlay from '../components/LoadingOverlay';

// Ícones
import SearchIcon from '../Icons/SearchIcon.svg';
import ChevronRightIcon from '../Icons/ChevronRightIcon.svg';
import DumbellIcon from '../Icons/DumbellIcon.svg';

export default function Biblioteca() {
  const navigation = useNavigation();
  const { exercicios, categorias, carregando, erro, recarregar } = useWgerExercises();

  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState(null); // null = Todos

  // Montar lista de categorias únicas presentes nos exercícios
  const categoriasPresentes = Object.entries(categorias)
    .filter(([id]) => exercicios.some(ex => ex.category === Number(id)))
    .map(([id, nome]) => ({ id: Number(id), nome }));

  // Filtrar exercícios
  const exerciciosFiltrados = exercicios.filter(ex => {
    const matchBusca = ex.name.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === null || ex.category === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  const renderExercicio = ({ item }) => {
    const categoriaNome = item.categoryName || categorias[item.category] || 'Outro';
    return (
      <TouchableOpacity
        style={styles.exercicioCard}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('DetalheExercicio', { exercicio: item, categoriaNome })}
      >
        <View style={styles.exercicioIconContainer}>
          <DumbellIcon width={22} height={22} color="#005CEE" />
        </View>
        <View style={styles.exercicioInfo}>
          <Text style={styles.exercicioNome} numberOfLines={1}>{item.name.toUpperCase()}</Text>
          <Text style={styles.exercicioCategoria}>{categoriaNome}</Text>
        </View>
        <ChevronRightIcon width={18} height={18} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  // ── LOADING ──
  if (carregando) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.logoKinetic}>KINETIC</Text>
          <View style={{ width: 24 }} />
        </View>
        <LoadingOverlay mensagem="Carregando exercícios..." />
      </SafeAreaView>
    );
  }

  // ── ERRO ──
  if (erro) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.logoKinetic}>KINETIC</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.erroText}>{erro}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={recarregar}>
            <Text style={styles.retryText}>TENTAR NOVAMENTE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── CONTEÚDO ──
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logoKinetic}>KINETIC</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* TÍTULO */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>BIBLIOTECA</Text>
        <Text style={styles.subtitle}>
          Explore exercícios reais para complementar seus treinos
        </Text>
      </View>

      {/* BARRA DE BUSCA */}
      <View style={styles.searchContainer}>
        <SearchIcon width={18} height={18} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar exercícios..."
          placeholderTextColor="#9CA3AF"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* FILTRO DE CATEGORIAS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriasList}
        style={styles.categoriasContainer}
      >
        {[{ id: null, nome: 'Todos' }, ...categoriasPresentes].map((item) => (
          <TouchableOpacity
            key={String(item.id)}
            style={[
              styles.categoriaBtn,
              categoriaAtiva === item.id && styles.categoriaBtnAtiva,
            ]}
            onPress={() => setCategoriaAtiva(item.id)}
          >
            <Text
              style={[
                styles.categoriaBtnText,
                categoriaAtiva === item.id && styles.categoriaBtnTextAtiva,
              ]}
            >
              {item.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CONTADOR */}
      <Text style={styles.contadorText}>
        {exerciciosFiltrados.length} exercício{exerciciosFiltrados.length !== 1 ? 's' : ''} encontrado{exerciciosFiltrados.length !== 1 ? 's' : ''}
      </Text>

      {/* LISTA DE EXERCÍCIOS */}
      <FlatList
        data={exerciciosFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderExercicio}
        contentContainerStyle={styles.listaContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ flex: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum exercício encontrado</Text>
          </View>
        }
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
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontFamily: 'Lexend_900Black',
    fontSize: 28,
    color: '#1A1C29',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Lexend_400Regular',
    fontSize: 15,
    color: '#1A1C29',
    marginLeft: 12,
  },
  categoriasContainer: {
    maxHeight: 50,
    marginBottom: 10,
  },
  categoriasList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoriaBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  categoriaBtnAtiva: {
    backgroundColor: '#005CEE',
  },
  categoriaBtnText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 13,
    color: '#6B7280',
  },
  categoriaBtnTextAtiva: {
    color: '#FFFFFF',
  },
  contadorText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 13,
    color: '#9CA3AF',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  listaContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  exercicioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  exercicioIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  exercicioInfo: {
    flex: 1,
  },
  exercicioNome: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 14,
    color: '#1A1C29',
    marginBottom: 3,
  },
  exercicioCategoria: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 12,
  },
  erroText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 15,
    color: '#EF4444',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#005CEE',
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
  retryText: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
});
