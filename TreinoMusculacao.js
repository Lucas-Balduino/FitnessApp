import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

// Ícones
import ArrowIcon      from './Icons/ArrowIcon.svg';
import LightningIcon  from './Icons/LightningIcon.svg';
import AddIcon        from './Icons/AddIcon.svg';
import DumbellIconNav from './Icons/DumbellIconNav.svg';
import ProfileIcon    from './Icons/ProfileIcon.svg';

// ==========================================
// DADOS DO TREINO
// ==========================================

const aquecimento = [
  { numero: '01', numeroColor: '#82E53A', nome: 'Contração escapular',         detalhe: '2 Sets x 15 Reps' },
  { numero: '02', numeroColor: '#F26522', nome: 'Alongamento dinâmico de peito', detalhe: '60 Seconds' },
];

const exercicios = [
  {
    id: '1',
    nome: 'SUPINO INCLINADO',
    tag1: 'EXERCÍCIO LIVRE',
    tag2: 'PEITORAL SUPERIOR',
    series: 4,
    reps: '8-10',
    descanso: '90s',
    imagem: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    nome: 'CRUCIFIXO NA POLIA',
    tag1: 'POLIA',
    tag2: 'PEITORAL',
    series: 3,
    reps: '12-15',
    descanso: '60s',
    imagem: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    nome: 'TRÍCEPS POLIA',
    tag1: 'POLIA',
    tag2: 'TRÍCEPS MUSCULARES',
    series: 3,
    reps: '15+',
    descanso: '0s',
    imagem: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    nome: 'TRÍCEPS TESTA',
    tag1: 'BARRA',
    tag2: 'TRÍCEPS',
    series: 3,
    reps: '10-12',
    descanso: '60s',
    imagem: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    nome: 'DESENVOLVIMENTO COM HALTERES',
    tag1: 'HALTERES',
    tag2: 'OMBROS',
    series: 3,
    reps: '10-12',
    descanso: '60s',
    imagem: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=800&auto=format&fit=crop',
  },
];

// ==========================================
// TELA PRINCIPAL
// ==========================================

export default function TreinoMusculacao({ fechar }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* ── CABEÇALHO ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={fechar} style={styles.backButton}>
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
          <Text style={styles.mainTitle}>MUSCULAÇÃO</Text>
          <Text style={styles.subtitle}>
            Treino com foco em hipertrofia, realizado com uso de pesos ou máquinas destinado para cada grupo muscular.
          </Text>
        </View>

        {/* ── ESTATÍSTICAS: 2 cards individuais ── */}
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
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <LightningIcon width={16} height={16} fill="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.tipTitle}>DICA DE TREINADOR</Text>
          </View>
          <Text style={styles.tipText}>
            Se concentre na fase excêntrica dos movimentos de empurra.
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

            {/* Imagem com bordas arredondadas */}
            <Image
              source={{ uri: ex.imagem }}
              style={styles.exerciseImage}
              resizeMode="cover"
            />

            {/* Nome + tags */}
            <Text style={styles.exerciseName}>{ex.nome}</Text>
            <View style={styles.exerciseTags}>
              <Text style={styles.tagBlue}>{ex.tag1}</Text>
              <Text style={styles.tagDot}> • </Text>
              <Text style={styles.tagBlue}>{ex.tag2}</Text>
            </View>

            {/* ── Stats do exercício: 3 cards individuais ── */}
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

      {/* ── BOTTOM NAVIGATION (igual à tela principal) ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <DumbellIconNav width={24} height={24} color="#9CA3AF" style={styles.navIconSpacing} />
          <Text style={styles.navLabel}>TRAIN</Text>
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
  logoTitle: { fontSize: 20, color: '#005CEE', fontWeight: '900', letterSpacing: 1 },

  // ── Scroll
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110 },

  // ── Título
  titleContainer: { marginTop: 10, marginBottom: 20 },
  mainTitle: { fontSize: 42, color: '#1A1C29', fontWeight: '900', lineHeight: 46, marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#6B7280', lineHeight: 22 },

  // ── Estatísticas: 2 cards independentes lado a lado
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
  statLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  statValue: { fontSize: 28, color: '#1A1C29', fontWeight: '900' },
  statUnit: { fontSize: 14, color: '#9CA3AF', fontWeight: 'bold' },

  // ── Dica de Treinador
  tipCard: {
    backgroundColor: '#005CEE',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 28,
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  tipTitle: { fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 'bold', letterSpacing: 1.2, marginLeft: 8 },
  tipText: { fontSize: 14, color: '#FFFFFF', lineHeight: 22 },

  // ── Aquecimento
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#9CA3AF', letterSpacing: 1.5, marginBottom: 12 },
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
  warmupNumber: { fontSize: 22, fontWeight: '900', width: 44 },
  warmupTextBlock: { flex: 1 },
  warmupName: { fontSize: 15, color: '#1A1C29', fontWeight: 'bold', marginBottom: 3 },
  warmupDetail: { fontSize: 13, color: '#9CA3AF' },

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
  exerciseName: { fontSize: 20, color: '#1A1C29', fontWeight: '900', marginBottom: 4, letterSpacing: 0.3 },
  exerciseTags: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  tagBlue: { fontSize: 11, color: '#005CEE', fontWeight: 'bold', letterSpacing: 0.5 },
  tagDot: { fontSize: 13, color: '#005CEE', fontWeight: 'bold', marginHorizontal: 3 },

  // ── Stats do exercício: 3 cards independentes
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
    backgroundColor: '#005CEE',
    borderRadius: 2,
    marginRight: 10,
  },
  exerciseStatContent: { flex: 1 },
  exerciseStatLabel: { fontSize: 9, color: '#9CA3AF', fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  exerciseStatValue: { fontSize: 20, color: '#1A1C29', fontWeight: '900' },

  // ── Botão Começar
  startButton: {
    backgroundColor: '#005CEE',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#005CEE',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  startButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.2 },

  // ── Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', width: 60 },
  navIconSpacing: { marginBottom: 4 },
  navLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold' },
  fabContainer: { position: 'relative', top: -25, justifyContent: 'center', alignItems: 'center' },
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
