import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

// Ícones
import ArrowIcon from './Icons/ArrowIcon.svg';
import LightningIcon from './Icons/LightningIcon.svg';
import AddIcon from './Icons/AddIcon.svg';
import DumbellIconNav from './Icons/DumbellIconNav.svg';
import ProfileIcon from './Icons/ProfileIcon.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ==========================================
// DADOS DO TREINO
// ==========================================

const aquecimento = [
  { numero: '01', numeroColor: '#82E53A', nome: 'Caminhada rápida', detalhe: '5 Minutes' },
  { numero: '02', numeroColor: '#F26522', nome: 'Alongamento dinâmico', detalhe: '3 Minutes' },
];

const exercicios = [
  {
    id: '1',
    nome: 'SPRINT',
    tag1: 'PISTA',
    tag2: 'VELOCIDADE',
    series: 6,
    reps: '100m',
    descanso: '90s',
    imagem: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    nome: 'TROTE MODERADO',
    tag1: 'PARQUE',
    tag2: 'RESISTÊNCIA',
    series: 1,
    reps: '30m',
    descanso: '0s',
    imagem: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    nome: 'CORRIDA EM LADEIRA',
    tag1: 'RUA',
    tag2: 'FORÇA',
    series: 5,
    reps: '1m',
    descanso: '2m',
    imagem: 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    nome: 'FARTLEK',
    tag1: 'MISTO',
    tag2: 'INTERVALADO',
    series: 4,
    reps: '5m',
    descanso: '2m',
    imagem: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    nome: 'CORRIDA LONGA',
    tag1: 'ESTRADA',
    tag2: 'ENDURANCE',
    series: 1,
    reps: '60m',
    descanso: '0s',
    imagem: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=800&auto=format&fit=crop',
  }
];

// ==========================================
// TELA PRINCIPAL
// ==========================================

export default function TreinoCorrida({ fechar }) {
  // ── Animação: slide da direita para esquerda
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  // Entra da direita ao montar
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, []);

  // Sai para a direita ao fechar, depois chama fechar()
  const handleFechar = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 260,
      useNativeDriver: true,
    }).start(() => fechar());
  };

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: slideAnim }] }}>
      <SafeAreaView style={styles.container}>

        {/* ── CABEÇALHO ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleFechar} style={styles.backButton}>
            <ArrowIcon width={22} height={22} fill="#1A1C29" />
          </TouchableOpacity>
          <Text style={styles.logoTitle}>KINETIC</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* ── CONTEÚDO ── */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* TÍTULO */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>CORRIDA</Text>
            <Text style={styles.subtitle}>
              A corrida é uma das modalidades mais completas para queimar calorias e fortalecer o sistema cardiorrespiratório. Além de exigir poucos equipamentos, a prática constante tonifica os membros inferiores e atua fortemente na redução do estresse diário.
            </Text>
          </View>

          {/* ── ESTATÍSTICAS: 2 cards individuais ── */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>DURAÇÃO</Text>
              <Text style={styles.statValue}>45<Text style={styles.statUnit}>min</Text></Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>DISTÂNCIA</Text>
              <Text style={styles.statValue}>8<Text style={styles.statUnit}>km</Text></Text>
            </View>
          </View>

          {/* ── DICA DE TREINADOR ── */}
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <LightningIcon width={16} height={16} fill="#FFFFFF" />
              <Text style={styles.tipTitle}>DICA DE TREINADOR</Text>
            </View>
            <Text style={styles.tipText}>
              Controle a respiração e mantenha o tronco levemente inclinado para frente.
            </Text>
          </View>

          {/* ── AQUECIMENTO: card único contendo os itens ── */}
          <Text style={styles.sectionTitle}>AQUECIMENTO</Text>
          <View style={styles.warmupCard}>
            {aquecimento.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.warmupRow,
                  index < aquecimento.length - 1 && styles.warmupRowBorder,
                ]}
              >
                <Text style={[styles.warmupNumber, { color: item.numeroColor }]}>
                  {item.numero}
                </Text>
                <View style={styles.warmupTextBlock}>
                  <Text style={styles.warmupName}>{item.nome}</Text>
                  <Text style={styles.warmupDetail}>{item.detalhe}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* ── CARDS DE EXERCÍCIO ── */}
          {exercicios.map((ex) => (
            <View key={ex.id} style={styles.exerciseCard}>

              <Image
                source={{ uri: ex.imagem }}
                style={styles.exerciseImage}
                resizeMode="cover"
              />

              <Text style={styles.exerciseName}>{ex.nome}</Text>
              <View style={styles.exerciseTags}>
                <Text style={styles.tagBlue}>{ex.tag1}</Text>
                <Text style={styles.tagDot}> • </Text>
                <Text style={styles.tagBlue}>{ex.tag2}</Text>
              </View>

              {/* Stats: 3 cards individuais */}
              <View style={styles.exerciseStatsRow}>

                <View style={styles.exerciseStatCard}>
                  <View style={styles.exerciseStatAccent} />
                  <View style={styles.exerciseStatContent}>
                    <Text style={styles.exerciseStatLabel}>SETS</Text>
                    <Text style={styles.exerciseStatValue}>{ex.series}</Text>
                  </View>
                </View>

                <View style={styles.exerciseStatCard}>
                  <View style={styles.exerciseStatContent}>
                    <Text style={styles.exerciseStatLabel}>REPS</Text>
                    <Text style={styles.exerciseStatValue}>{ex.reps}</Text>
                  </View>
                </View>

                <View style={styles.exerciseStatCard}>
                  <View style={styles.exerciseStatContent}>
                    <Text style={styles.exerciseStatLabel}>DESCANSO</Text>
                    <Text style={styles.exerciseStatValue}>{ex.descanso}</Text>
                  </View>
                </View>

              </View>
            </View>
          ))}

          {/* ── BOTÃO COMEÇAR TREINO ── */}
          <TouchableOpacity style={styles.startButton} activeOpacity={0.85}>
            <Text style={styles.startButtonText}>▶  COMEÇAR TREINO</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* ── BOTTOM NAVIGATION ── */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <DumbellIconNav width={24} height={24} color="#005CEE" style={styles.navIconSpacing} />
            <Text style={[styles.navLabel, { color: '#005CEE' }]}>TRAIN</Text>
          </TouchableOpacity>

          <View style={styles.fabContainer}>
            <TouchableOpacity style={styles.fab}>
              <AddIcon width={20} height={20} fill="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.navItem}>
            <ProfileIcon width={24} height={24} fill="#9CA3AF" style={styles.navIconSpacing} />
            <Text style={styles.navLabel}>PROFILE</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </Animated.View>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#F8F9FE' },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: { padding: 5 },
  logoTitle: {
    fontFamily: 'Lexend_900Black',
    fontSize: 20,
    color: '#005CEE',
    letterSpacing: 1,
  },

  // ── Scroll
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110 },

  // ── Título
  titleContainer: { marginTop: 10, marginBottom: 20 },
  mainTitle: {
    fontFamily: 'Lexend_900Black',
    fontSize: 42,
    color: '#1A1C29',
    lineHeight: 46,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },

  // ── Estatísticas
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  statLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Lexend_900Black',
    fontSize: 28,
    color: '#1A1C29',
  },
  statUnit: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 14,
    color: '#9CA3AF',
  },

  // ── Dica de Treinador
  tipCard: {
    backgroundColor: '#82E53A',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 28,
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  tipTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 11,
    color: 'rgba(255,255,255,0.80)',
    letterSpacing: 1.2,
  },
  tipText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },

  // ── Aquecimento
  sectionTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  warmupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  warmupRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  warmupRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  warmupNumber: { fontFamily: 'Lexend_900Black', fontSize: 22, width: 44 },
  warmupTextBlock: { flex: 1 },
  warmupName: { fontFamily: 'Lexend_700Bold', fontSize: 15, color: '#1A1C29', marginBottom: 3 },
  warmupDetail: { fontFamily: 'Lexend_400Regular', fontSize: 13, color: '#9CA3AF' },

  // ── Exercise Card
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 22,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  exerciseImage: {
    width: '100%',
    height: 190,
    borderRadius: 14,
    marginBottom: 14,
  },
  exerciseName: {
    fontFamily: 'Lexend_900Black',
    fontSize: 20,
    color: '#1A1C29',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  exerciseTags: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  tagBlue: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 11,
    color: '#82E53A',
    letterSpacing: 0.5,
  },
  tagDot: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 13,
    color: '#82E53A',
    marginHorizontal: 2,
  },

  // ── Stats do exercício: 3 cards individuais
  exerciseStatsRow: { flexDirection: 'row', gap: 8 },
  exerciseStatCard: {
    flex: 1,
    backgroundColor: '#F8F9FE',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseStatAccent: {
    width: 3,
    alignSelf: 'stretch',
    backgroundColor: '#82E53A',
    borderRadius: 2,
    marginRight: 10,
  },
  exerciseStatContent: { flex: 1 },
  exerciseStatLabel: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 9,
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  exerciseStatValue: {
    fontFamily: 'Lexend_900Black',
    fontSize: 20,
    color: '#1A1C29',
  },

  // ── Botão Começar
  startButton: {
    backgroundColor: '#82E53A',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#82E53A',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  startButtonText: {
    fontFamily: 'Lexend_800ExtraBold',
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1.2,
  },

  // ── Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconSpacing: { marginBottom: 4 },
  navLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 10,
    color: '#9CA3AF',
  },
  fabContainer: {
    width: 100,
    position: 'relative',
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#005CEE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#005CEE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
});
