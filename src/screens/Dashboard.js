import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';

import { treinos } from '../data/treinos';
import { estatisticas } from '../data/estatisticas';

// Import dos Modais
import CriarTreino from './CriarTreino';
import TreinoMusculacao from './TreinoMusculacao';
import TreinoCiclismo from './TreinoCiclismo';
import TreinoCorrida from './TreinoCorrida';
import TreinoFutebol from './TreinoFutebol';
import TreinoVolei from './TreinoVolei';
import TreinoNatacao from './TreinoNatacao';

// Ícones SVG da navegação
import AddIcon from '../Icons/AddIcon.svg';
import DumbellIconNav from '../Icons/DumbellIconNav.svg';
import ProfileIcon from '../Icons/ProfileIcon.svg';

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMusculacao, setModalMusculacao] = useState(false);
  const [modalCiclismo, setModalCiclismo] = useState(false);
  const [modalCorrida, setModalCorrida] = useState(false);
  const [modalFutebol, setModalFutebol] = useState(false);
  const [modalVolei, setModalVolei] = useState(false);
  const [modalNatacao, setModalNatacao] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logoKinetic}>KINETIC</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>ESCOLHA SEU TREINO</Text>
          <Text style={styles.subtitle}>
            Escolha a metodologia que melhor se adapta aos seus objetivos de treino.
          </Text>
        </View>

        {treinos.map((treino) => {
          const IconeDoCard = treino.Icone;

          return (
            <View key={treino.id} style={[styles.card, !treino.imagem && styles.cardSemImagem]}>
              {treino.imagem && (
                <Image source={{ uri: treino.imagem }} style={styles.cardImage} />
              )}

              <View style={styles.cardContent}>
                <View style={[styles.floatingIcon, { backgroundColor: treino.mainColor }]}>
                  <IconeDoCard width={24} height={24} fill="#FFFFFF" />
                </View>

                <Text style={styles.cardTitle}>{treino.titulo}</Text>
                <Text style={styles.cardDesc}>{treino.descricao}</Text>

                {treino.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {treino.tags.map((tag, index) => (
                      <View key={index} style={[styles.tag, { backgroundColor: tag.bg }]}>
                        <Text style={[styles.tagText, { color: tag.text }]}>{tag.label}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: treino.mainColor }]}
                  onPress={() => {
                    if (treino.id === '1') setModalMusculacao(true);
                    else if (treino.id === '2') setModalCiclismo(true);
                    else if (treino.id === '3') setModalCorrida(true);
                    else if (treino.id === '4') setModalFutebol(true);
                    else if (treino.id === '5') setModalVolei(true);
                    else if (treino.id === '6') setModalNatacao(true);
                    else if (treino.id === '7') setModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>{treino.textoBotao}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>ESTATÍSTICAS ÚLTIMOS 7 DIAS</Text>

          <View style={styles.statsGrid}>
            {estatisticas.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statColorLine, { backgroundColor: stat.cor }]} />
                <View style={styles.statContent}>
                  <Text style={styles.statLabel}>{stat.titulo}</Text>
                  <Text style={styles.statValue}>{stat.valor}</Text>
                  <Text style={[styles.statSub, { color: stat.cor }]}>{stat.subtitulo}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* BOTTOM NAVIGATION COM SVGs */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <DumbellIconNav width={24} height={24} color="#005CEE" style={styles.navIconSpacing} />
          <Text style={[styles.navLabel, { color: '#005CEE' }]}>TRAIN</Text>
        </TouchableOpacity>

        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
            <AddIcon width={20} height={20} fill="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.navItem}>
          <ProfileIcon width={24} height={24} fill="#9CA3AF" style={styles.navIconSpacing} />
          <Text style={styles.navLabel}>PROFILE</Text>
        </TouchableOpacity>

        <Modal transparent={false} animationType="slide" visible={modalVisible}>
          <CriarTreino fechar={() => setModalVisible(false)} />
        </Modal>

        <Modal transparent={false} animationType="none" visible={modalMusculacao}>
          <TreinoMusculacao fechar={() => setModalMusculacao(false)} />
        </Modal>

        <Modal transparent={false} animationType="none" visible={modalCiclismo}>
          <TreinoCiclismo fechar={() => setModalCiclismo(false)} />
        </Modal>

        <Modal transparent={false} animationType="none" visible={modalCorrida}>
          <TreinoCorrida fechar={() => setModalCorrida(false)} />
        </Modal>

        <Modal transparent={false} animationType="none" visible={modalFutebol}>
          <TreinoFutebol fechar={() => setModalFutebol(false)} />
        </Modal>

        <Modal transparent={false} animationType="none" visible={modalVolei}>
          <TreinoVolei fechar={() => setModalVolei(false)} />
        </Modal>

        <Modal transparent={false} animationType="none" visible={modalNatacao}>
          <TreinoNatacao fechar={() => setModalNatacao(false)} />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F8F9FE',
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
    marginTop: 10,
    marginBottom: 20,
  },
  mainTitle: {
    fontFamily: 'Lexend_900Black',
    fontSize: 40,
    color: '#1A1C29',
    lineHeight: 44,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  cardSemImagem: {
    marginTop: 15,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cardContent: {
    padding: 24,
    paddingTop: 40,
    position: 'relative',
  },
  floatingIcon: {
    position: 'absolute',
    top: -25,
    left: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    zIndex: 10,
  },
  cardTitle: {
    fontFamily: 'Lexend_900Black',
    fontSize: 24,
    color: '#1A1C29',
    marginBottom: 8,
  },
  cardDesc: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Lexend_800ExtraBold',
    color: '#FFFFFF',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  statsTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 2,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  statColorLine: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Lexend_900Black',
    fontSize: 28,
    color: '#1A1C29',
    marginBottom: 2,
  },
  statSub: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 10,
  },
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
  navIconSpacing: {
    marginBottom: 4,
  },
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
  }
});
