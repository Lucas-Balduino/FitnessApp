export const exerciciosPorEsporte = {
  '1': {
    titulo: 'MUSCULAÇÃO',
    cor: '#005CEE',
    imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    aquecimento: [
      { numero: '01', numeroColor: '#82E53A', nome: 'Contração escapular', detalhe: '2 Sets x 15 Reps' },
      { numero: '02', numeroColor: '#F26522', nome: 'Alongamento dinâmico de peito', detalhe: '60 Seconds' },
    ],
    exercicios: [
      { id: '1', nome: 'SUPINO INCLINADO', tag1: 'EXERCÍCIO LIVRE', tag2: 'PEITORAL SUPERIOR', series: 4, reps: '8-10', descanso: '90s', imagem: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop' },
      { id: '2', nome: 'CRUCIFIXO NA POLIA', tag1: 'POLIA', tag2: 'PEITORAL', series: 3, reps: '12-15', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop' },
      { id: '3', nome: 'TRÍCEPS POLIA', tag1: 'POLIA', tag2: 'TRÍCEPS MUSCULARES', series: 3, reps: '15+', descanso: '0s', imagem: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop' },
      { id: '4', nome: 'TRÍCEPS TESTA', tag1: 'BARRA', tag2: 'TRÍCEPS', series: 3, reps: '10-12', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop' },
      { id: '5', nome: 'DESENVOLVIMENTO COM HALTERES', tag1: 'HALTERES', tag2: 'OMBROS', series: 3, reps: '10-12', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  '2': {
    titulo: 'CICLISMO',
    cor: '#FF6B22',
    imagem: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    aquecimento: [
      { numero: '01', numeroColor: '#82E53A', nome: 'Alongamento de isquiotibiais', detalhe: '60 Seconds' },
      { numero: '02', numeroColor: '#F26522', nome: 'Pedalada leve', detalhe: '10 Minutes' },
    ],
    exercicios: [
      { id: '1', nome: 'TIROS CURTOS', tag1: 'PISTA', tag2: 'INTENSO', series: 8, reps: '30s', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop' },
      { id: '2', nome: 'SUBIDA ÍNGREME', tag1: 'ROTA', tag2: 'FORÇA', series: 4, reps: '5m', descanso: '2m', imagem: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop' },
      { id: '3', nome: 'PEDALADA CONTÍNUA', tag1: 'ESTRADA', tag2: 'RESISTÊNCIA', series: 1, reps: '45m', descanso: '0s', imagem: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=800&auto=format&fit=crop' },
      { id: '4', nome: 'SPRINT EM PÉ', tag1: 'VELOCIDADE', tag2: 'EXPLOSÃO', series: 5, reps: '45s', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800&auto=format&fit=crop' },
      { id: '5', nome: 'CADÊNCIA ALTA', tag1: 'GIRO', tag2: 'CONTROLE', series: 3, reps: '10m', descanso: '3m', imagem: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  '3': {
    titulo: 'CORRIDA',
    cor: '#82E53A',
    imagem: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop',
    aquecimento: [
      { numero: '01', numeroColor: '#82E53A', nome: 'Caminhada rápida', detalhe: '5 Minutes' },
      { numero: '02', numeroColor: '#F26522', nome: 'Alongamento dinâmico', detalhe: '3 Minutes' },
    ],
    exercicios: [
      { id: '1', nome: 'SPRINT', tag1: 'PISTA', tag2: 'VELOCIDADE', series: 6, reps: '100m', descanso: '90s', imagem: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop' },
      { id: '2', nome: 'TROTE MODERADO', tag1: 'PARQUE', tag2: 'RESISTÊNCIA', series: 1, reps: '30m', descanso: '0s', imagem: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop' },
      { id: '3', nome: 'CORRIDA EM LADEIRA', tag1: 'RUA', tag2: 'FORÇA', series: 5, reps: '1m', descanso: '2m', imagem: 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=800&auto=format&fit=crop' },
      { id: '4', nome: 'FARTLEK', tag1: 'MISTO', tag2: 'INTERVALADO', series: 4, reps: '5m', descanso: '2m', imagem: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop' },
      { id: '5', nome: 'CORRIDA LONGA', tag1: 'ESTRADA', tag2: 'ENDURANCE', series: 1, reps: '60m', descanso: '0s', imagem: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  '4': {
    titulo: 'FUTEBOL',
    cor: '#005CEE',
    imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop',
    aquecimento: [
      { numero: '01', numeroColor: '#82E53A', nome: 'Bobinho', detalhe: '10 Minutes' },
      { numero: '02', numeroColor: '#F26522', nome: 'Piques curtos', detalhe: '5 Minutes' },
    ],
    exercicios: [
      { id: '1', nome: 'DRIBLE ENTRE CONES', tag1: 'CAMPO', tag2: 'AGILIDADE', series: 4, reps: '2m', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop' },
      { id: '2', nome: 'FINALIZAÇÃO', tag1: 'GOL', tag2: 'PRECISÃO', series: 5, reps: '10', descanso: '90s', imagem: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=800&auto=format&fit=crop' },
      { id: '3', nome: 'COLETIVO TÁTICO', tag1: 'JOGO', tag2: 'ESTRATÉGIA', series: 2, reps: '20m', descanso: '5m', imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop' },
      { id: '4', nome: 'PASSE LONGO', tag1: 'CAMPO', tag2: 'VISÃO', series: 4, reps: '15', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop' },
      { id: '5', nome: 'CRUZAMENTO E CABECEIO', tag1: 'ÁREA', tag2: 'AÉREO', series: 5, reps: '12', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  '5': {
    titulo: 'VOLEIBOL',
    cor: '#FF6B22',
    imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
    aquecimento: [
      { numero: '01', numeroColor: '#82E53A', nome: 'Rotação de braços', detalhe: '3 Minutes' },
      { numero: '02', numeroColor: '#F26522', nome: 'Toque em duplas', detalhe: '10 Minutes' },
    ],
    exercicios: [
      { id: '1', nome: 'MANCHETE', tag1: 'QUADRA', tag2: 'DEFESA', series: 4, reps: '15', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop' },
      { id: '2', nome: 'ATAQUE NA REDE', tag1: 'REDE', tag2: 'EXPLOSÃO', series: 5, reps: '10', descanso: '90s', imagem: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop' },
      { id: '3', nome: 'SAQUE VIAGEM', tag1: 'FUNDO', tag2: 'PRECISÃO', series: 3, reps: '15', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop' },
      { id: '4', nome: 'BLOQUEIO DUPLO', tag1: 'REDE', tag2: 'TIMING', series: 4, reps: '12', descanso: '45s', imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop' },
      { id: '5', nome: 'LEVANTAMENTO', tag1: 'REDE', tag2: 'TOQUE', series: 4, reps: '20', descanso: '30s', imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  '6': {
    titulo: 'NATAÇÃO',
    cor: '#82E53A',
    imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=800&auto=format&fit=crop',
    aquecimento: [
      { numero: '01', numeroColor: '#82E53A', nome: 'Nado livre leve', detalhe: '200m' },
      { numero: '02', numeroColor: '#F26522', nome: 'Prancha de perna', detalhe: '100m' },
    ],
    exercicios: [
      { id: '1', nome: 'NADO CRAWL INTENSO', tag1: 'PISCINA', tag2: 'VELOCIDADE', series: 8, reps: '50m', descanso: '30s', imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=800&auto=format&fit=crop' },
      { id: '2', nome: 'NADO COSTAS', tag1: 'PISCINA', tag2: 'RESISTÊNCIA', series: 4, reps: '100m', descanso: '45s', imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=800&auto=format&fit=crop' },
      { id: '3', nome: 'BORBOLETA', tag1: 'PISCINA', tag2: 'FORÇA', series: 4, reps: '25m', descanso: '60s', imagem: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop' },
      { id: '4', nome: 'NADO PEITO', tag1: 'PISCINA', tag2: 'TÉCNICA', series: 5, reps: '50m', descanso: '45s', imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=800&auto=format&fit=crop' },
      { id: '5', nome: 'TIRO LIVRE (CRAWL)', tag1: 'PISCINA', tag2: 'FINALIZAÇÃO', series: 6, reps: '25m', descanso: '30s', imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=800&auto=format&fit=crop' },
    ]
  }
};
