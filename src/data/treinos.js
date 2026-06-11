import CiclismIcon from '../Icons/CiclismIcon.svg';
import CustumizeIcon from '../Icons/CustumizeIcon.svg';
import DumbellIcon from '../Icons/DumbellIcon.svg';
import RunningIcon from '../Icons/RunningIcon.svg';
import SoccerIcon from '../Icons/SoccerIcon.svg';
import SwimmingIcon from '../Icons/SwimmingIcon.svg';
import VolleyballIcon from '../Icons/VolleyballIcon.svg';

export const treinos = [
  {
    id: '1',
    titulo: 'MUSCULAÇÃO',
    descricao: 'Treino com pesos, focado na hipertrofia e força muscular.',
    tags: [{ label: 'HIPERTROFIA', bg: '#E6F0FF', text: '#005CEE' }],
    mainColor: '#005CEE',
    Icone: DumbellIcon,
    imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    textoBotao: 'SELECIONAR'
  },
  {
    id: '2',
    titulo: 'CICLISMO',
    descricao: 'Atividade de baixo impacto que auxilia na criação de resistência.',
    tags: [{ label: 'BAIXO IMPACTO', bg: '#FFF0E6', text: '#FF6B22' }],
    mainColor: '#FF6B22',
    Icone: CiclismIcon,
    imagem: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400&auto=format&fit=crop',
    textoBotao: 'SELECIONAR'
  },
  {
    id: '3',
    titulo: 'CORRIDA',
    descricao: 'Atividade aeróbica, ajuda a criar resistência e queimar calorias.',
    tags: [{ label: 'RESISTÊNCIA', bg: '#F2FCE8', text: '#74D333' }],
    mainColor: '#82E53A',
    Icone: RunningIcon,
    imagem: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=400&auto=format&fit=crop',
    textoBotao: 'SELECIONAR'
  },
  {
    id: '4',
    titulo: 'FUTEBOL',
    descricao: 'Esporte coletivo que exige resistência e trabalho em equipe.',
    tags: [{ label: 'COLETIVO', bg: '#E6F0FF', text: '#005CEE' }],
    mainColor: '#005CEE',
    Icone: SoccerIcon,
    imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&auto=format&fit=crop',
    textoBotao: 'SELECIONAR'
  },
  {
    id: '5',
    titulo: 'VOLEIBOL',
    descricao: 'Esporte que exige precisão, explosão e sinergia entre os jogadores.',
    tags: [
      { label: 'COLETIVO', bg: '#FFF0E6', text: '#FF6B22' },
      { label: 'EXPLOSÃO', bg: '#FFF0E6', text: '#FF6B22' }
    ],
    mainColor: '#FF6B22',
    Icone: VolleyballIcon,
    imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400&auto=format&fit=crop',
    textoBotao: 'SELECIONAR'
  },
  {
    id: '6',
    titulo: 'NATAÇÃO',
    descricao: 'Modalidade que trabalha o corpo como um todo.',
    tags: [{ label: 'FULLBODY', bg: '#F2FCE8', text: '#74D333' }],
    mainColor: '#82E53A',
    Icone: SwimmingIcon,
    imagem: 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80',
    textoBotao: 'SELECIONAR'
  },
  {
    id: '7',
    titulo: 'CUSTOMIZADO',
    descricao: 'Crie seu treino do zero, defina suas prioridades e preferências.',
    tags: [],
    mainColor: '#FFB300',
    Icone: CustumizeIcon,
    imagem: null,
    textoBotao: 'CRIE'
  }
];
