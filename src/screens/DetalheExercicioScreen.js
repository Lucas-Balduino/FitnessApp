import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useScreenAnimation } from '../hooks/useScreenAnimation';

import DumbellIcon from '../Icons/DumbellIcon.svg';

import { fetchExerciseInfo } from '../utils/wgerApi';
import { stripHtml } from '../utils/stripHtml';

export default function DetalheExercicioScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { slideAnim, animateOut } = useScreenAnimation();

  const { exercicio, categoriaNome } = route.params;

  const [descricao, setDescricao] = useState('');
  const [equipamentos, setEquipamentos] = useState([]);
  const [musculos, setMusculos] = useState([]);
  const [carregandoDescricao, setCarregandoDescricao] = useState(true);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const info = await fetchExerciseInfo(exercicio.id);
        // Descrição: pega a primeira tradução em PT-BR ou qualquer disponível
        const descPt = info.translations?.find(t => t.language === 2);
        const descAny = info.translations?.[0];
        const textoHtml = descPt?.description || descAny?.description || info.description || '';
        setDescricao(stripHtml(textoHtml));

        // Equipamentos
        if (info.equipment && info.equipment.length > 0) {
          setEquipamentos(info.equipment.map(eq => eq.name));
        }

        // Músculos
        if (info.muscles && info.muscles.length > 0) {
          setMusculos(info.muscles.map(m => m.name_en || m.name));
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        setDescricao('Não foi possível carregar a descrição.');
      } finally {
        setCarregandoDescricao(false);
      }
    }
    carregarDetalhes();
  }, [exercicio.id]);

  const fechar = () => {
    animateOut(() => navigation.goBack());
  };

  return (
    <Animated.View style={[{ flex: 1 }, { transform: [{ translateX: slideAnim }] }]}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={fechar}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.logoKinetic}>KINETIC</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          {/* ÍCONE HERO */}
          <View style={styles.heroCard}>
            <DumbellIcon width={60} height={60} color="#005CEE" />
          </View>

          {/* NOME E TAGS */}
          <Text style={styles.exercicioNome}>{exercicio.name?.toUpperCase()}</Text>
          <View style={styles.tagsRow}>
            {categoriaNome && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{categoriaNome.toUpperCase()}</Text>
              </View>
            )}
            {equipamentos.map((eq, i) => (
              <View key={i} style={[styles.tag, styles.tagOrange]}>
                <Text style={[styles.tagText, styles.tagOrangeText]}>{eq.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          {/* INSTRUÇÕES */}
          {carregandoDescricao ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#005CEE" />
            </View>
          ) : descricao ? (
            <View style={styles.instrucaoCard}>
              <Text style={styles.instrucaoTitulo}>⚡ INSTRUÇÕES</Text>
              <Text style={styles.instrucaoTexto}>{descricao}</Text>
            </View>
          ) : (
            <View style={styles.instrucaoCard}>
              <Text style={styles.instrucaoTitulo}>⚡ INSTRUÇÕES</Text>
              <Text style={styles.instrucaoTexto}>Descrição não disponível para este exercício.</Text>
            </View>
          )}

          {/* DETALHES */}
          <Text style={styles.detalhesLabel}>DETALHES</Text>
          <View style={styles.detalhesRow}>
            <View style={styles.detalheCard}>
              <Text style={styles.detalheCardLabel}>CATEGORIA</Text>
              <Text style={styles.detalheCardValue}>{categoriaNome || 'N/A'}</Text>
            </View>
            <View style={styles.detalheCard}>
              <Text style={styles.detalheCardLabel}>EQUIPAMENTO</Text>
              <Text style={styles.detalheCardValue}>{equipamentos[0] || 'Nenhum'}</Text>
            </View>
          </View>

          {musculos.length > 0 && (
            <>
              <Text style={styles.detalhesLabel}>MÚSCULOS</Text>
              <View style={styles.musculosContainer}>
                {musculos.map((m, i) => (
                  <View key={i} style={styles.musculoTag}>
                    <Text style={styles.musculoTagText}>{m}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
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
  backIcon: {
    fontSize: 26,
    color: '#1A1C29',
  },
  logoKinetic: {
    fontFamily: 'Lexend_900Black',
    fontSize: 20,
    color: '#005CEE',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#E6F0FF',
    borderRadius: 24,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  exercicioNome: {
    fontFamily: 'Lexend_900Black',
    fontSize: 28,
    color: '#1A1C29',
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 11,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  tagOrange: {
    backgroundColor: '#FFF3E6',
  },
  tagOrangeText: {
    color: '#F26522',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  instrucaoCard: {
    backgroundColor: '#005CEE',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  instrucaoTitulo: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  instrucaoTexto: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  detalhesLabel: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 2,
    marginBottom: 12,
  },
  detalhesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  detalheCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  detalheCardLabel: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 6,
  },
  detalheCardValue: {
    fontFamily: 'Lexend_900Black',
    fontSize: 18,
    color: '#1A1C29',
  },
  musculosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  musculoTag: {
    backgroundColor: '#E6F0FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  musculoTagText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 13,
    color: '#005CEE',
  },
});
