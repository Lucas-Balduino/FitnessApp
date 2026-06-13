/**
 * Serviço de Firestore.
 * Centraliza operações de banco de dados para uso nas telas.
 */
import { db } from '../../firebaseConfig';
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Carrega dados do perfil do usuário.
 * @param {string} uid - ID do usuário
 * @returns {Promise<Object|null>}
 */
export async function carregarPerfil(uid) {
  const docRef = doc(db, 'usuarios', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

/**
 * Salva/atualiza dados do perfil do usuário (merge).
 * @param {string} uid - ID do usuário
 * @param {Object} dados - Dados a salvar
 */
export async function salvarPerfil(uid, dados) {
  const docRef = doc(db, 'usuarios', uid);
  return setDoc(docRef, dados, { merge: true });
}

/**
 * Cria documento inicial do usuário ao registrar.
 * @param {string} uid
 * @param {string} nome
 */
export async function criarPerfilInicial(uid, nome) {
  return setDoc(doc(db, 'usuarios', uid), {
    nome,
    nivel: 'Iniciante',
    notificacoes: true,
    criadoEm: serverTimestamp(),
  });
}

/**
 * Salva um treino customizado.
 * @param {Object} treino - Dados do treino
 * @returns {Promise<import('firebase/firestore').DocumentReference>}
 */
export async function salvarTreino(treino) {
  return addDoc(collection(db, 'treinos_customizados'), {
    ...treino,
    criadoEm: serverTimestamp(),
  });
}

/**
 * Carrega treinos customizados do usuário.
 * @param {string} uid - ID do usuário
 * @returns {Promise<Array>}
 */
export async function carregarTreinos(uid) {
  const q = query(
    collection(db, 'treinos_customizados'),
    where('userId', '==', uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
