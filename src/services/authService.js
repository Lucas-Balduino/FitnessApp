/**
 * Serviço de autenticação Firebase.
 * Centraliza operações de auth para uso nas telas.
 */
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

/**
 * Realiza login com email e senha.
 * @param {string} email
 * @param {string} senha
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function loginComEmail(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

/**
 * Registra novo usuário com email e senha.
 * @param {string} email
 * @param {string} senha
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function registrarComEmail(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

/**
 * Realiza logout do usuário atual.
 * @returns {Promise<void>}
 */
export async function logout() {
  return signOut(auth);
}

/**
 * Retorna o usuário autenticado atual ou null.
 * @returns {import('firebase/auth').User | null}
 */
export function getUsuarioAtual() {
  return auth.currentUser;
}
