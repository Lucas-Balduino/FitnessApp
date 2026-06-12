import { useState, useEffect } from 'react';
import { fetchExercises, fetchCategories } from '../utils/wgerApi';

/**
 * Custom Hook para buscar exercícios e categorias da API Wger.
 * Retorna { exercicios, categorias, carregando, erro, recarregar }
 */
export function useWgerExercises() {
  const [exercicios, setExercicios] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = async () => {
    console.log('[useWgerExercises] Iniciando carregamento...');
    setCarregando(true);
    setErro(null);
    try {
      const [listaExercicios, mapaCategorias] = await Promise.all([
        fetchExercises(),
        fetchCategories(),
      ]);
      console.log('[useWgerExercises] Exercícios:', listaExercicios.length, 'Categorias:', Object.keys(mapaCategorias).length);
      setExercicios(listaExercicios);
      setCategorias(mapaCategorias);
    } catch (error) {
      console.error('[useWgerExercises] ERRO:', error.message || error);
      setErro('Não foi possível carregar os exercícios. Verifique sua conexão.');
    } finally {
      setCarregando(false);
      console.log('[useWgerExercises] Carregamento finalizado.');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return { exercicios, categorias, carregando, erro, recarregar: carregar };
}
