import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EyeIcon from '../Icons/EyeIcon.svg';
import EyeOffIcon from '../Icons/EyeOffIcon.svg';

import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async () => {
    setErro('');

    if (!email || !senha) {
      setErro('Preencha email e senha para continuar.');
      return;
    }

    setCarregando(true);
    try {
      if (modoRegistro) {
        if (!nome) {
          setErro('Por favor, informe seu nome.');
          setCarregando(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, senha);
      } else {
        await signInWithEmailAndPassword(auth, email, senha);
      }
      // Não precisamos navegar manualmente. O onAuthStateChanged do App.js vai detectar o login e redirecionar!
    } catch (error) {
      console.error(error);
      let mensagem = 'Ocorreu um erro ao tentar autenticar.';
      if (error.code === 'auth/invalid-email') mensagem = 'E-mail inválido.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') mensagem = 'Usuário não encontrado ou senha incorreta.';
      if (error.code === 'auth/email-already-in-use') mensagem = 'Este e-mail já está em uso.';
      if (error.code === 'auth/weak-password') mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  const toggleModo = () => {
    setModoRegistro(!modoRegistro);
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* HEADER / LOGO */}
          <Text style={styles.logoKinetic}>KINETIC</Text>

          {/* TÍTULOS */}
          <View style={styles.headerTitles}>
            <Text style={styles.mainTitle}>
              {modoRegistro ? 'CRIAR\nCONTA' : 'BEM-VINDO'}
            </Text>
            <Text style={styles.subtitle}>
              {modoRegistro 
                ? 'Comece sua jornada fitness agora' 
                : 'Entre na sua conta para continuar seus treinos'}
            </Text>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.formContainer}>
            {modoRegistro && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>NOME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome completo"
                  placeholderTextColor="#9CA3AF"
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>SENHA</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.eyeButton}>
                  {mostrarSenha ? (
                    <EyeIcon width={20} height={20} color="#9CA3AF" />
                  ) : (
                    <EyeOffIcon width={20} height={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {!modoRegistro && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            )}
          </View>

        </ScrollView>

        {/* RODAPÉ E BOTÃO (Fixo embaixo) */}
        <View style={styles.footer}>
          {erro !== '' && (
            <View style={styles.erroContainer}>
              <Text style={styles.erroText}>{erro}</Text>
            </View>
          )}
          <TouchableOpacity 
            style={[styles.mainButton, carregando && styles.mainButtonDisabled]} 
            onPress={handleSubmit}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.mainButtonText}>
                {modoRegistro ? 'REGISTRAR' : 'ENTRAR'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {modoRegistro ? 'Já tem conta? ' : 'Não tem conta? '}
            </Text>
            <TouchableOpacity onPress={toggleModo}>
              <Text style={styles.toggleActionText}>
                {modoRegistro ? 'Entrar' : 'Criar conta'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.legalText}>
            {modoRegistro 
              ? 'Ao se registrar, você concorda com nossos\nTermos de Uso e Política de Privacidade.'
              : 'Ao entrar, você concorda com nossos\nTermos de Uso e Política de Privacidade.'}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
  },
  logoKinetic: {
    fontFamily: 'Lexend_900Black',
    fontSize: 20,
    color: '#005CEE',
    letterSpacing: 1,
    alignSelf: 'center',
    marginBottom: 40,
  },
  headerTitles: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainTitle: {
    fontFamily: 'Lexend_900Black',
    fontSize: 40,
    color: '#1A1C29',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    fontFamily: 'Lexend_400Regular',
    fontSize: 15,
    color: '#1A1C29',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Lexend_400Regular',
    fontSize: 15,
    color: '#1A1C29',
    height: '100%',
  },
  eyeButton: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  forgotPasswordText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 13,
    color: '#9CA3AF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 10,
  },
  mainButton: {
    backgroundColor: '#005CEE',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#005CEE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 24,
  },
  mainButtonDisabled: {
    opacity: 0.7,
  },
  mainButtonText: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  toggleText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  toggleActionText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 14,
    color: '#005CEE',
  },
  legalText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
  erroContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  erroText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 13,
    color: '#DC2626',
    textAlign: 'center',
  },
});
