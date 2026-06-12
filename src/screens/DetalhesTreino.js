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
import { useNavigation } from '@react-navigation/native';
import { exerciciosPorEsporte } from '../data/exerciciosPorEsporte';

// Ícones
import ArrowIcon from '../Icons/ArrowIcon.svg';
import LightningIcon from '../Icons/LightningIcon.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DetalhesTreino({ route }) {
  const navigation = useNavigation();
  const { esporte } = route.params;
  const dados = exerciciosPorEsporte[esporte];

  const fechar = () => navigation.goBack();

  // ── Animação: slide da direita para esquerda
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  // Entra da direita ao montar
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  // Sai para a direita ao fechar, depois chama fechar()
  const handleFechar = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 260,
      useNativeDriver: true,
    }).start(() => fechar());
  };

  if (!dados) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50, fontFamily: 'Lexend_700Bold' }}>
          Treino não encontrado!
        </Text>
      </SafeAreaView>
    );
  }

  const { titulo, cor, aquecimento, exercicios } = dados;

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: slideAnim }] }}>
      <SafeAreaView style={styles.container}>
        {/* ── CABEÇALHO ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleFechar} style={styles.backButton}>
            <ArrowIcon width={22} height={22} fill="#1A1C29" />
          </TouchableOpacity>
          <Text style={[styles.logoTitle, { color: cor }]}>KINETIC</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* ── CONTEÚDO ── */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* TÍTULO */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>{titulo}</Text>
            <Text style={styles.subtitle}>
              Treino focado em desenvolvimento de performance e resultados específicos desta modalidade.
            </Text>
          </View>

          {/* ── ESTATÍSTICAS ── */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>DURAÇÃO</Text>
              <Text style={styles.statValue}>60<Text style={styles.statUnit}>min</Text></Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>CALORIAS</Text>
              <Text style={styles.statValue}>450<Text style={styles.statUnit}>kcal</Text></Text>
            </View>
          </View>

          {/* ── DICA DE TREINADOR ── */}
          <View style={[styles.tipCard, { backgroundColor: cor }]}>
            <View style={styles.tipHeader}>
              <LightningIcon width={16} height={16} fill="#FFFFFF" />
              <Text style={styles.tipTitle}>DICA DE TREINADOR</Text>
            </View>
            <Text style={styles.tipText}>
              Se concentre na fase de execução dos movimentos para evitar lesões e maximizar ganhos.
            </Text>
          </View>

          {/* ── AQUECIMENTO ── */}
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
          <Text style={[styles.sectionTitle, { marginTop: 10 }]}>SÉRIE PRINCIPAL</Text>
          {exercicios.map((ex) => (
            <View key={ex.id} style={styles.exerciseCard}>
              <Image source={{ uri: ex.imagem }} style={styles.exerciseImage} resizeMode="cover" />

              <Text style={styles.exerciseName}>{ex.nome}</Text>
              <View style={styles.exerciseTags}>
                <Text style={[styles.tagColor, { color: cor }]}>{ex.tag1}</Text>
                <Text style={[styles.tagDot, { color: cor }]}> • </Text>
                <Text style={[styles.tagColor, { color: cor }]}>{ex.tag2}</Text>
              </View>

              {/* Stats */}
              <View style={styles.exerciseStatsRow}>
                <View style={styles.exerciseStatCard}>
                  <View style={[styles.exerciseStatAccent, { backgroundColor: cor }]} />
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
          <TouchableOpacity style={[styles.startButton, { backgroundColor: cor, shadowColor: cor }]} activeOpacity={0.85}>
            <Text style={styles.startButtonText}>▶  COMEÇAR TREINO</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
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
    letterSpacing: 1,
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
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
  tipCard: {
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
  tagColor: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  tagDot: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 13,
    marginHorizontal: 2,
  },
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
  startButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
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
});
