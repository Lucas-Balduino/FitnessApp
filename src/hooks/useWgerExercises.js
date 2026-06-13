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
    setCarregando(true);
    setErro(null);
    try {
      const [listaExercicios, mapaCategorias] = await Promise.all([
        fetchExercises(),
        fetchCategories(),
      ]);
      setExercicios(listaExercicios);
      setCategorias(mapaCategorias);
    } catch (error) {
      setErro('Não foi possível carregar os exercícios. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return { exercicios, categorias, carregando, erro, recarregar: carregar };
}
