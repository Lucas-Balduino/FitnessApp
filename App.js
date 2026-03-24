/**
 * FitShare - App de Compartilhamento de Treinos
 * Disciplina: Programação para Dispositivos Móveis
 *
 * DEPENDÊNCIAS NECESSÁRIAS:
 *   expo install @react-native-picker/picker
 *   expo install @react-native-community/slider
 *
 * ESTRUTURA:
 *   Parte 1 → Tela de Lista (ListaScreen)
 *   Parte 2 → Tela de Detalhe (DetalheScreen)
 *   Parte 3 → Tela de Cadastro (CadastroScreen)
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';

// =============================================================================
// DADOS - Modalidades de treino (Parte 1 e Parte 2)
// =============================================================================

const MODALIDADES = [
  {
    id: '1',
    nome: 'Musculação',
    categoria: 'Academia',
    imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    descricaoCurta: 'Treino com pesos para hipertrofia e força muscular.',
    descricaoLonga:
      'A musculação é uma das modalidades mais praticadas no mundo inteiro. ' +
      'Ela combina exercícios de resistência com pesos livres, máquinas e o peso ' +
      'do próprio corpo. Os treinos são organizados por grupos musculares e têm ' +
      'como objetivos principais a hipertrofia, o ganho de força, a resistência ' +
      'muscular e a melhora da composição corporal. É indicada para todas as idades ' +
      'e pode ser adaptada para iniciantes e atletas avançados.',
    duracao: '60 min',
    nivel: 'Intermediário',
    calorias: '400–600 kcal',
    exercicios: [
      {
        id: 'e1',
        nome: 'Supino Reto',
        detalhe: 'Peito',
        imagem: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=100&q=80',
      },
      {
        id: 'e2',
        nome: 'Agachamento',
        detalhe: 'Quadríceps',
        imagem: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=100&q=80',
      },
      {
        id: 'e3',
        nome: 'Levantamento Terra',
        detalhe: 'Posterior / Lombar',
        imagem: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=100&q=80',
      },
      {
        id: 'e4',
        nome: 'Puxada Frontal',
        detalhe: 'Costas / Bíceps',
        imagem: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&q=80',
      },
      {
        id: 'e5',
        nome: 'Desenvolvimento',
        detalhe: 'Ombros',
        imagem: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100&q=80',
      },
    ],
  },
  {
    id: '2',
    nome: 'Corrida',
    categoria: 'Cardio',
    imagem: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=600&q=80',
    descricaoCurta: 'Atividade aeróbica que melhora resistência e queima calorias.',
    descricaoLonga:
      'A corrida é um dos esportes mais democráticos e acessíveis do mundo. ' +
      'Não exige equipamentos sofisticados — basta um bom tênis e vontade. ' +
      'Seus benefícios incluem a melhora da saúde cardiovascular, o aumento da ' +
      'resistência física, a regulação do humor graças à liberação de endorfinas, ' +
      'além de ser uma excelente queimadora de calorias. Pode ser praticada em ' +
      'pistas, ruas, parques ou esteiras, e os treinos variam entre longões, ' +
      'intervalados e tiros de velocidade.',
    duracao: '45 min',
    nivel: 'Iniciante',
    calorias: '350–550 kcal',
    exercicios: [
      {
        id: 'e1',
        nome: 'Aquecimento',
        detalhe: 'Caminhada 5 min',
        imagem: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=100&q=80',
      },
      {
        id: 'e2',
        nome: 'Corrida Leve',
        detalhe: '20 min em ritmo confortável',
        imagem: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=100&q=80',
      },
      {
        id: 'e3',
        nome: 'Intervalado',
        detalhe: '4x 1 min acelerado / 2 min leve',
        imagem: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=100&q=80',
      },
      {
        id: 'e4',
        nome: 'Subidas',
        detalhe: '5x subidas de 100m',
        imagem: 'https://images.unsplash.com/photo-1452441271666-5d998aa2f6db?w=100&q=80',
      },
      {
        id: 'e5',
        nome: 'Volta à Calma',
        detalhe: 'Caminhada + alongamento',
        imagem: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80',
      },
    ],
  },
  {
    id: '3',
    nome: 'Ciclismo',
    categoria: 'Cardio / Resistência',
    imagem: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80',
    descricaoCurta: 'Pedalar fortalece pernas, melhora o cardio e é de baixo impacto.',
    descricaoLonga:
      'O ciclismo é uma modalidade completa que une prazer, saúde e sustentabilidade. ' +
      'Por ser uma atividade de baixo impacto nas articulações, é indicada para ' +
      'pessoas de todas as idades, incluindo aquelas com problemas nos joelhos. ' +
      'Os treinos variam entre passeios recreativos, treinos de endurance, ' +
      'circuitos de alta intensidade (HIIT na bike) e até modalidades como ' +
      'mountain bike e ciclismo de estrada. Fortalecer as pernas, glúteos e ' +
      'desenvolver capacidade cardiorrespiratória são os principais benefícios.',
    duracao: '75 min',
    nivel: 'Intermediário',
    calorias: '500–700 kcal',
    exercicios: [
      {
        id: 'e1',
        nome: 'Aquecimento',
        detalhe: 'Pedalada leve 10 min',
        imagem: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=100&q=80',
      },
      {
        id: 'e2',
        nome: 'Subida',
        detalhe: 'Escaladas em ritmo moderado',
        imagem: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=100&q=80',
      },
      {
        id: 'e3',
        nome: 'Sprint',
        detalhe: '6x 30 seg no máximo',
        imagem: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=100&q=80',
      },
      {
        id: 'e4',
        nome: 'Cadência Alta',
        detalhe: '90–100 RPM por 15 min',
        imagem: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=100&q=80',
      },
      {
        id: 'e5',
        nome: 'Desaquecimento',
        detalhe: 'Pedalada suave 10 min',
        imagem: 'https://images.unsplash.com/photo-1594882645126-14ac19a0a2d6?w=100&q=80',
      },
    ],
  },
  {
    id: '4',
    nome: 'Futebol',
    categoria: 'Esporte Coletivo',
    imagem: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',
    descricaoCurta: 'O esporte mais popular do Brasil desenvolve agilidade e trabalho em equipe.',
    descricaoLonga:
      'O futebol é muito mais do que um esporte no Brasil — é cultura e paixão nacional. ' +
      'Uma partida de futebol envolve corridas de alta intensidade, mudanças rápidas ' +
      'de direção, chutes, cabeçadas e passes, o que o torna um treino funcional ' +
      'completo. Praticá-lo regularmente melhora a coordenação motora, a agilidade, ' +
      'o raciocínio rápido e a capacidade de trabalho em equipe. O condicionamento ' +
      'físico de um jogador inclui treinos específicos de velocidade, força e técnica.',
    duracao: '90 min',
    nivel: 'Intermediário',
    calorias: '600–900 kcal',
    exercicios: [
      {
        id: 'e1',
        nome: 'Aquecimento Coletivo',
        detalhe: 'Roda de passes e trote',
        imagem: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=100&q=80',
      },
      {
        id: 'e2',
        nome: 'Rachão',
        detalhe: 'Jogo reduzido 4x4',
        imagem: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=100&q=80',
      },
      {
        id: 'e3',
        nome: 'Treino de Finalização',
        detalhe: '20 chutes ao gol',
        imagem: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=100&q=80',
      },
      {
        id: 'e4',
        nome: 'Jogo Livre',
        detalhe: 'Partida de 2x20 min',
        imagem: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=100&q=80',
      },
      {
        id: 'e5',
        nome: 'Desaquecimento',
        detalhe: 'Alongamento em grupo',
        imagem: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80',
      },
    ],
  },
  {
    id: '5',
    nome: 'Vôlei',
    categoria: 'Esporte Coletivo',
    imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80',
    descricaoCurta: 'Esporte que exige reflexo, precisão e muita sincronia entre os jogadores.',
    descricaoLonga:
      'O vôlei é um dos esportes mais técnicos e sinérgicos que existem. ' +
      'Cada jogada exige coordenação entre os seis atletas em quadra, precisão ' +
      'nos fundamentos de saque, recepção, levantamento e ataque, além de ' +
      'agilidade e força explosiva. Os treinos de vôlei desenvolvem reflexos ' +
      'rápidos, salto vertical, resistência aeróbica e anaeróbica e o espírito ' +
      'de equipe. É praticado em quadras cobertas e na areia (vôlei de praia), ' +
      'cada modalidade com suas particularidades técnicas e físicas.',
    duracao: '80 min',
    nivel: 'Intermediário',
    calorias: '400–600 kcal',
    exercicios: [
      {
        id: 'e1',
        nome: 'Saque',
        detalhe: '3 séries de 10 saques',
        imagem: 'https://images.unsplash.com/photo-1593787406462-6abb1a35c9e8?w=100&q=80',
      },
      {
        id: 'e2',
        nome: 'Recepção',
        detalhe: 'Exercício de manchete em duplas',
        imagem: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=100&q=80',
      },
      {
        id: 'e3',
        nome: 'Levantamento',
        detalhe: 'Posicionamento e tempo de bola',
        imagem: 'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=100&q=80',
      },
      {
        id: 'e4',
        nome: 'Ataque',
        detalhe: '4x10 cortadas em posições',
        imagem: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=100&q=80',
      },
      {
        id: 'e5',
        nome: 'Jogo Treino',
        detalhe: '2 sets completos',
        imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=100&q=80',
      },
    ],
  },
  {
    id: '6',
    nome: 'Natação',
    categoria: 'Aquático / Cardio',
    imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80',
    descricaoCurta: 'Modalidade completa, trabalha todo o corpo e protege as articulações.',
    descricaoLonga:
      'A natação é considerada um dos esportes mais completos para a saúde humana. ' +
      'Ela trabalha simultaneamente musculatura superior e inferior, melhora a ' +
      'capacidade cardiorrespiratória e é extremamente gentil com as articulações, ' +
      'pois a água sustenta grande parte do peso corporal. Os estilos crawl, costas, ' +
      'peito e borboleta desenvolvem grupos musculares distintos. Além disso, ' +
      'a respiração controlada na natação tem efeitos muito positivos no relaxamento ' +
      'e na concentração, tornando-a uma atividade física e mental.',
    duracao: '60 min',
    nivel: 'Iniciante',
    calorias: '400–700 kcal',
    exercicios: [
      {
        id: 'e1',
        nome: 'Crawl',
        detalhe: '10x 50m com descanso de 30s',
        imagem: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=100&q=80',
      },
      {
        id: 'e2',
        nome: 'Costas',
        detalhe: '4x 100m estilo costas',
        imagem: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=100&q=80',
      },
      {
        id: 'e3',
        nome: 'Peito',
        detalhe: '6x 50m nado peito',
        imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=100&q=80',
      },
      {
        id: 'e4',
        nome: 'Borboleta',
        detalhe: '4x 25m borboleta',
        imagem: 'https://images.unsplash.com/photo-1551958219-acbc595d19b4?w=100&q=80',
      },
      {
        id: 'e5',
        nome: 'Nado Livre',
        detalhe: 'Estilo livre 400m contínuo',
        imagem: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=100&q=80',
      },
    ],
  },
];


// =============================================================================
// COMPONENTE: CustomSwitch — substitui o Switch nativo com animação suave
// =============================================================================

const SWITCH_W = 52;   // largura total da trilha
const SWITCH_H = 28;   // altura da trilha
const THUMB_S  = 22;   // tamanho do thumb (quadrado → borderRadius metade)
const TRAVEL   = SWITCH_W - THUMB_S - 6; // distância que o thumb percorre

const CustomSwitch = ({ value, onValueChange }) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [value]);

  // Interpolações baseadas na animação
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, TRAVEL + 3],
  });

  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.08)', 'rgba(255,90,40,0.85)'],
  });

  const trackBorderColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.12)', 'rgba(255,90,40,1)'],
  });

  const thumbOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 1],
  });

  const glowOpacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      activeOpacity={0.85}
    >
      {/* Trilha */}
      <Animated.View
        style={{
          width: SWITCH_W,
          height: SWITCH_H,
          borderRadius: SWITCH_H / 2,
          backgroundColor: trackColor,
          borderWidth: 1,
          borderColor: trackBorderColor,
          justifyContent: 'center',
        }}
      >
        {/* Brilho laranja quando ligado */}
        <Animated.View
          style={{
            position: 'absolute',
            width: SWITCH_W,
            height: SWITCH_H,
            borderRadius: SWITCH_H / 2,
            backgroundColor: 'rgba(255,90,40,0.18)',
            opacity: glowOpacity,
          }}
        />

        {/* Thumb */}
        <Animated.View
          style={{
            width: THUMB_S,
            height: THUMB_S,
            borderRadius: THUMB_S / 2,
            backgroundColor: '#FFFFFF',
            opacity: thumbOpacity,
            transform: [{ translateX }],
            shadowColor: '#FF5A28',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: value ? 0.6 : 0,
            shadowRadius: 6,
            elevation: value ? 6 : 2,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

// =============================================================================
// COMPONENTE: CustomPicker — substitui o Picker nativo para controle total
// =============================================================================

const CustomPicker = ({ label, value, onChange, options }) => {
  const [aberto, setAberto] = useState(false);
  const opcaoSelecionada = options.find((o) => o.value === value);

  return (
    <>
      <TouchableOpacity
        style={pickerStyles.gatilho}
        onPress={() => setAberto(true)}
        activeOpacity={0.8}
      >
        <Text style={pickerStyles.gatilhoTexto}>
          {opcaoSelecionada ? opcaoSelecionada.label : label}
        </Text>
        <View style={pickerStyles.gatilhoIcone}>
          <Text style={pickerStyles.gatilhoSetaTexto}>&#9662;</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={aberto}
        transparent
        animationType="fade"
        onRequestClose={() => setAberto(false)}
      >
        <TouchableOpacity
          style={pickerStyles.backdrop}
          activeOpacity={1}
          onPress={() => setAberto(false)}
        >
          <TouchableOpacity activeOpacity={1}>
            <View style={pickerStyles.painel}>
              <View style={pickerStyles.painelHeader}>
                <Text style={pickerStyles.painelTitulo}>{label}</Text>
                <TouchableOpacity
                  onPress={() => setAberto(false)}
                  style={pickerStyles.fecharBotao}
                >
                  <Text style={pickerStyles.fecharTexto}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={pickerStyles.divisor} />
              {options.map((opcao, index) => {
                const selecionado = opcao.value === value;
                return (
                  <TouchableOpacity
                    key={opcao.value}
                    style={[
                      pickerStyles.opcao,
                      selecionado && pickerStyles.opcaoSelecionada,
                      index < options.length - 1 && pickerStyles.opcaoBorda,
                    ]}
                    onPress={() => {
                      onChange(opcao.value);
                      setAberto(false);
                    }}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        pickerStyles.opcaoTexto,
                        selecionado && pickerStyles.opcaoTextoSelecionado,
                      ]}
                    >
                      {opcao.label}
                    </Text>
                    {selecionado && (
                      <Text style={pickerStyles.checkmark}>+</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const pickerStyles = StyleSheet.create({
  gatilho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161830',
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.35)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 14,
  },
  gatilhoTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
    letterSpacing: -0.1,
  },
  gatilhoIcone: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,90,40,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gatilhoSetaTexto: {
    color: '#FF5A28',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  painel: {
    backgroundColor: '#0F1022',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.3)',
    width: 320,
    overflow: 'hidden',
    shadowColor: '#FF5A28',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 20,
  },
  painelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  painelTitulo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  fecharBotao: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,90,40,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fecharTexto: {
    color: '#FF5A28',
    fontSize: 13,
    fontWeight: '700',
  },
  divisor: {
    height: 1,
    backgroundColor: 'rgba(255,90,40,0.18)',
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  opcaoBorda: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  opcaoSelecionada: {
    backgroundColor: 'rgba(255,90,40,0.1)',
  },
  opcaoTexto: {
    color: '#9A9DB8',
    fontSize: 15,
    letterSpacing: -0.1,
  },
  opcaoTextoSelecionado: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  checkmark: {
    color: '#FF5A28',
    fontSize: 16,
    fontWeight: '900',
  },
});

// =============================================================================
// COMPONENTE: Cabeçalho reutilizável
// =============================================================================

const Header = ({ titulo, onVoltar, onCadastro }) => (
  <View style={styles.header}>
    {onVoltar ? (
      <TouchableOpacity onPress={onVoltar} style={styles.headerBotaoVoltar}>
        <Text style={styles.headerIcone}>←</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.headerBotaoVoltar} />
    )}
    <Text style={styles.headerTitulo}>{titulo}</Text>
    {onCadastro ? (
      <TouchableOpacity onPress={onCadastro} style={styles.headerBotaoVoltar}>
        <Text style={styles.headerIcone}>＋</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.headerBotaoVoltar} />
    )}
  </View>
);

// =============================================================================
// PARTE 1 — Tela de Lista de Modalidades
// =============================================================================

const ListaScreen = ({ onSelecionarModalidade, onIrCadastro }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <Header titulo="FitShare" onCadastro={onIrCadastro} />

      {/* Banner superior */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerTitulo}>Modalidades</Text>
        <Text style={styles.bannerSubtitulo}>Escolha seu treino de hoje 💪</Text>
      </View>

      <FlatList
        data={MODALIDADES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelecionarModalidade(item)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.imagem }} style={styles.cardImagem} />
            <View style={styles.cardOverlay} />
            <View style={styles.cardConteudo}>
              <View style={styles.cardBadge}>
                <Text style={styles.cardBadgeTexto}>{item.categoria}</Text>
              </View>
              <Text style={styles.cardNome}>{item.nome}</Text>
              <Text style={styles.cardDescricao}>{item.descricaoCurta}</Text>
              <View style={styles.cardRodape}>
                <Text style={styles.cardInfo}>⏱ {item.duracao}</Text>
                <Text style={styles.cardInfo}>🔥 {item.calorias}</Text>
                <Text style={styles.cardInfo}>📊 {item.nivel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

// =============================================================================
// PARTE 2 — Tela de Detalhe da Modalidade
// =============================================================================

const DetalheScreen = ({ modalidade, onVoltar }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <Header titulo={modalidade.nome} onVoltar={onVoltar} />

      <ScrollView contentContainerStyle={styles.detalheScroll}>
        {/* Imagem principal */}
        <Image source={{ uri: modalidade.imagem }} style={styles.detalheImagem} />

        {/* Informações gerais */}
        <View style={styles.detalheInfoContainer}>
          <Text style={styles.detalheCategoria}>{modalidade.categoria}</Text>
          <Text style={styles.detalheNome}>{modalidade.nome}</Text>
          <Text style={styles.detalheDescricao}>{modalidade.descricaoLonga}</Text>

          <View style={styles.detalheMetricas}>
            <View style={styles.metricaItem}>
              <Text style={styles.metricaValor}>{modalidade.duracao}</Text>
              <Text style={styles.metricaLabel}>Duração</Text>
            </View>
            <View style={styles.metricaDivisor} />
            <View style={styles.metricaItem}>
              <Text style={styles.metricaValor}>{modalidade.nivel}</Text>
              <Text style={styles.metricaLabel}>Nível</Text>
            </View>
            <View style={styles.metricaDivisor} />
            <View style={styles.metricaItem}>
              <Text style={styles.metricaValor}>{modalidade.calorias}</Text>
              <Text style={styles.metricaLabel}>Calorias</Text>
            </View>
          </View>
        </View>

        {/* Lista de exercícios */}
        <View style={styles.secaoContainer}>
          <Text style={styles.secaoTitulo}>Exercícios do Treino</Text>

          {modalidade.exercicios.map((ex) => (
            <View key={ex.id} style={styles.exercicioItem}>
              <Image source={{ uri: ex.imagem }} style={styles.exercicioImagem} />
              <View style={styles.exercicioTexto}>
                <Text style={styles.exercicioNome}>{ex.nome}</Text>
                <Text style={styles.exercicioDetalhe}>{ex.detalhe}</Text>
              </View>
              <Text style={styles.exercicioSeta}>›</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// PARTE 3 — Tela de Cadastro de Treino
// =============================================================================

const CadastroScreen = ({ onVoltar }) => {
  // Estados dos 4 TextInputs
  const [nomeTreino, setNomeTreino] = useState('');
  const [descricao, setDescricao] = useState('');
  const [metaCalorias, setMetaCalorias] = useState('');
  const [observacoes, setObservacoes] = useState('');

  // Estados dos 2 Pickers
  const [esporte, setEsporte] = useState('musculacao');
  const [nivel, setNivel] = useState('iniciante');

  // Estados dos 2 Sliders
  const [intensidade, setIntensidade] = useState(5);
  const [duracaoMin, setDuracaoMin] = useState(30);

  // Estados dos 2 Switches
  const [comParceiro, setComParceiro] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);

  // Salvar treino
  const handleSalvar = () => {
    if (!nomeTreino.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, informe o nome do treino.');
      return;
    }
    Alert.alert(
      '✅ Treino Salvo!',
      `"${nomeTreino}" foi cadastrado com sucesso!\n\n` +
        `Esporte: ${esporte}\nNível: ${nivel}\n` +
        `Intensidade: ${intensidade}/10\nDuração: ${duracaoMin} min\n` +
        `Com parceiro: ${comParceiro ? 'Sim' : 'Não'}`,
    );
  };

  // Limpar formulário
  const handleLimpar = () => {
    Alert.alert('Limpar formulário', 'Tem certeza que deseja apagar todos os dados?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        style: 'destructive',
        onPress: () => {
          setNomeTreino('');
          setDescricao('');
          setMetaCalorias('');
          setObservacoes('');
          setEsporte('musculacao');
          setNivel('iniciante');
          setIntensidade(5);
          setDuracaoMin(30);
          setComParceiro(false);
          setNotificacoes(true);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <Header titulo="Novo Treino" onVoltar={onVoltar} />

      <ScrollView contentContainerStyle={styles.formulario}>
        {/* Título da seção */}
        <Text style={styles.formTitulo}>Cadastrar Estrutura de Treino</Text>
        <Text style={styles.formSubtitulo}>
          Preencha os detalhes e compartilhe com a comunidade
        </Text>

        {/* ── 4 INPUTS DE TEXTO ─────────────────────────────── */}
        <View style={styles.secaoForm}>
          <Text style={styles.secaoFormTitulo}>📝 Informações Básicas</Text>

          <Text style={styles.rotulo}>Nome do Treino *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Treino A – Peito e Tríceps"
            placeholderTextColor="#666"
            value={nomeTreino}
            onChangeText={setNomeTreino}
          />

          <Text style={styles.rotulo}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            placeholder="Descreva o objetivo do treino..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.rotulo}>Meta de Calorias (kcal)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 500"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={metaCalorias}
            onChangeText={setMetaCalorias}
          />

          <Text style={styles.rotulo}>Observações</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Levar corda, usar tênis de corrida..."
            placeholderTextColor="#666"
            value={observacoes}
            onChangeText={setObservacoes}
          />
        </View>

        {/* ── 2 PICKERS ─────────────────────────────────────── */}
        <View style={styles.secaoForm}>
          <Text style={styles.secaoFormTitulo}>🏅 Classificação</Text>

          <Text style={styles.rotulo}>Modalidade Esportiva</Text>
          <CustomPicker
            label="Modalidade Esportiva"
            value={esporte}
            onChange={setEsporte}
            options={[
              { label: 'Academia / Musculação', value: 'musculacao' },
              { label: 'Corrida', value: 'corrida' },
              { label: 'Ciclismo', value: 'ciclismo' },
              { label: 'Futebol', value: 'futebol' },
              { label: 'Vôlei', value: 'volei' },
              { label: 'Natação', value: 'natacao' },
            ]}
          />

          <Text style={styles.rotulo}>Nível de Dificuldade</Text>
          <CustomPicker
            label="Nível de Dificuldade"
            value={nivel}
            onChange={setNivel}
            options={[
              { label: '● Iniciante', value: 'iniciante' },
              { label: '● Intermediário', value: 'intermediario' },
              { label: '● Avançado', value: 'avancado' },
              { label: '● Elite', value: 'elite' },
            ]}
          />
        </View>

        {/* ── 2 SLIDERS ─────────────────────────────────────── */}
        <View style={styles.secaoForm}>
          <Text style={styles.secaoFormTitulo}>⚙️ Parâmetros</Text>

          <Text style={styles.rotulo}>
            Intensidade: <Text style={styles.sliderValor}>{intensidade}/10</Text>
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={intensidade}
            onValueChange={setIntensidade}
            minimumTrackTintColor="#f97316"
            maximumTrackTintColor="#333"
            thumbTintColor="#f97316"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>Leve</Text>
            <Text style={styles.sliderLabel}>Moderado</Text>
            <Text style={styles.sliderLabel}>Intenso</Text>
          </View>

          <Text style={[styles.rotulo, { marginTop: 16 }]}>
            Duração: <Text style={styles.sliderValor}>{duracaoMin} min</Text>
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={120}
            step={5}
            value={duracaoMin}
            onValueChange={setDuracaoMin}
            minimumTrackTintColor="#f97316"
            maximumTrackTintColor="#333"
            thumbTintColor="#f97316"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>10 min</Text>
            <Text style={styles.sliderLabel}>60 min</Text>
            <Text style={styles.sliderLabel}>120 min</Text>
          </View>
        </View>

        {/* ── 2 SWITCHES ────────────────────────────────────── */}
        <View style={styles.secaoForm}>
          <Text style={styles.secaoFormTitulo}>🔧 Preferências</Text>

          <View style={styles.switchRow}>
            <View style={styles.switchTexto}>
              <Text style={styles.switchLabel}>Treino com Parceiro</Text>
              <Text style={styles.switchDescricao}>
                Permite que outros usuários solicitem participar
              </Text>
            </View>
            <CustomSwitch
              value={comParceiro}
              onValueChange={setComParceiro}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchTexto}>
              <Text style={styles.switchLabel}>Notificações de Treino</Text>
              <Text style={styles.switchDescricao}>
                Receber lembretes para executar este treino
              </Text>
            </View>
            <CustomSwitch
              value={notificacoes}
              onValueChange={setNotificacoes}
            />
          </View>
        </View>

        {/* ── 2 BOTÕES ──────────────────────────────────────── */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
            <Text style={styles.botaoSalvarTexto}>💾 Salvar Treino</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoLimpar} onPress={handleLimpar}>
            <Text style={styles.botaoLimparTexto}>🗑 Limpar Formulário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// COMPONENTE PRINCIPAL — Controla a navegação entre telas
// =============================================================================

export default function App() {
  const [tela, setTela] = useState('lista');       // 'lista' | 'detalhe' | 'cadastro'
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState(null);

  const abrirDetalhe = (modalidade) => {
    setModalidadeSelecionada(modalidade);
    setTela('detalhe');
  };

  const irParaLista = () => setTela('lista');
  const irParaCadastro = () => setTela('cadastro');

  if (tela === 'detalhe' && modalidadeSelecionada) {
    return <DetalheScreen modalidade={modalidadeSelecionada} onVoltar={irParaLista} />;
  }

  if (tela === 'cadastro') {
    return <CadastroScreen onVoltar={irParaLista} />;
  }

  return <ListaScreen onSelecionarModalidade={abrirDetalhe} onIrCadastro={irParaCadastro} />;
}

// =============================================================================
// PALETA — Tokens de design centralizados
// =============================================================================
// bg:        #08080F  ← fundo profundo
// surface:   #0F1022  ← cards e painéis
// elevated:  #161830  ← elementos elevados (inputs, picker)
// accent:    #FF5A28  ← laranja vivo principal
// accentDim: rgba(255,90,40,0.14) ← laranja translúcido
// border:    rgba(255,90,40,0.22) ← bordas com tom de acento
// borderSub: rgba(255,255,255,0.07) ← bordas sutis
// text1:     #FFFFFF  ← títulos
// text2:     #9A9DB8  ← corpo / descrições
// text3:     #4E5070  ← terciário / labels

// =============================================================================
// ESTILOS
// =============================================================================

const styles = StyleSheet.create({

  // ── Base ──────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },

  // ── Header ────────────────────────────────────────────────
  header: {
    backgroundColor: '#08080F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,90,40,0.25)',
  },
  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  headerBotaoVoltar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0F1022',
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcone: {
    color: '#FF5A28',
    fontSize: 17,
    fontWeight: '700',
  },

  // ── Parte 1 – Banner ──────────────────────────────────────
  bannerContainer: {
    backgroundColor: '#08080F',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },
  bannerTitulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  bannerSubtitulo: {
    color: '#9A9DB8',
    fontSize: 13,
    marginTop: 4,
    letterSpacing: 0.2,
  },

  // ── Parte 1 – Lista / Cards ───────────────────────────────
  lista: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 36,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
    height: 190,
    backgroundColor: '#0F1022',
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.18)',
  },
  cardImagem: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    // ⚠️ Substitua a URL pela ilustração flat gerada (veja prompts_imagens.md)
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8,8,15,0.62)',
  },
  cardConteudo: {
    flex: 1,
    padding: 18,
    justifyContent: 'space-between',
  },
  cardBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FF5A28',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  cardBadgeTexto: {
    color: '#FF5A28',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  cardNome: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 'auto',
  },
  cardDescricao: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
  cardRodape: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 14,
  },
  cardInfo: {
    color: '#FF5A28',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // ── Parte 2 – Detalhe ─────────────────────────────────────
  detalheScroll: {
    paddingBottom: 48,
  },
  detalheImagem: {
    width: '100%',
    height: 260,
    // ⚠️ Substitua a URL pela ilustração flat gerada (veja prompts_imagens.md)
  },
  detalheInfoContainer: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#08080F',
    padding: 24,
    zIndex: 1,
  },
  detalheCategoria: {
    color: '#FF5A28',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  detalheNome: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginTop: 6,
  },
  detalheDescricao: {
    color: '#9A9DB8',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 14,
  },
  detalheMetricas: {
    flexDirection: 'row',
    marginTop: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.22)',
    padding: 16,
  },
  metricaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricaValor: {
    color: '#FF5A28',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  metricaLabel: {
    color: '#4E5070',
    fontSize: 11,
    marginTop: 5,
    letterSpacing: 0.3,
  },
  metricaDivisor: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginHorizontal: 8,
  },

  // ── Parte 2 – Exercícios ──────────────────────────────────
  secaoContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  secaoTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  exercicioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderLeftWidth: 3,
    borderLeftColor: '#FF5A28',
    backgroundColor: '#0F1022',
  },
  exercicioImagem: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#161830',
    // ⚠️ Substitua a URL pela ilustração flat gerada (veja prompts_imagens.md)
  },
  exercicioTexto: {
    flex: 1,
    marginLeft: 14,
  },
  exercicioNome: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  exercicioDetalhe: {
    color: '#4E5070',
    fontSize: 12,
    marginTop: 3,
  },
  exercicioSeta: {
    color: '#FF5A28',
    fontSize: 22,
    opacity: 0.8,
  },

  // ── Parte 3 – Formulário ──────────────────────────────────
  formulario: {
    padding: 20,
    paddingBottom: 48,
  },
  formTitulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginBottom: 4,
  },
  formSubtitulo: {
    color: '#9A9DB8',
    fontSize: 13,
    marginBottom: 24,
    lineHeight: 19,
  },
  secaoForm: {
    backgroundColor: '#0F1022',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 18,
    marginBottom: 14,
  },
  secaoFormTitulo: {
    color: '#FF5A28',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 18,
  },
  rotulo: {
    color: '#9A9DB8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: '#161830',
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.2)',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    marginBottom: 14,
  },
  inputMultilinha: {
    height: 82,
    textAlignVertical: 'top',
  },
  // pickerContainer e picker removidos — substituídos por CustomPicker
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValor: {
    color: '#FF5A28',
    fontWeight: '700',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  sliderLabel: {
    color: '#4E5070',
    fontSize: 11,
    letterSpacing: 0.2,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  switchTexto: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  switchDescricao: {
    color: '#4E5070',
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
  botoesContainer: {
    gap: 12,
    marginTop: 10,
  },
  botaoSalvar: {
    backgroundColor: '#FF5A28',
    borderRadius: 100,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#FF5A28',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },
  botaoSalvarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  botaoLimpar: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,90,40,0.45)',
  },
  botaoLimparTexto: {
    color: '#FF5A28',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
