const BASE_URL = 'https://wger.de/api/v2';

/**
 * Busca lista de exercícios com suas traduções.
 * @param {number} limit - Quantidade de exercícios (padrão 50)
 */
export async function fetchExercises(limit = 50) {
  const url = BASE_URL + '/exerciseinfo/?limit=' + limit + '&format=json';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro HTTP ' + response.status);
  }

  const text = await response.text();
  const data = JSON.parse(text);
  const results = data.results || [];

  const exercicios = [];
  for (let i = 0; i < results.length; i++) {
    const ex = results[i];
    const translations = ex.translations || [];
    const category = ex.category || {};
    const equipment = ex.equipment || [];
    const muscles = ex.muscles || [];

    // Pega o primeiro nome disponível
    let nome = '';
    if (translations.length > 0 && translations[0].name) {
      nome = translations[0].name;
    }
    if (!nome || nome.trim() === '') continue;

    exercicios.push({
      id: ex.id,
      name: nome,
      category: category.id || 0,
      categoryName: category.name || 'Outro',
      equipment: equipment.map(function(eq) { return eq.name; }),
      muscles: muscles.map(function(m) { return m.name_en || m.name; }),
    });
  }

  return exercicios;
}

/**
 * Busca informações detalhadas de um exercício.
 * @param {number} exerciseId
 */
export async function fetchExerciseInfo(exerciseId) {
  const response = await fetch(BASE_URL + '/exerciseinfo/' + exerciseId + '/?format=json');
  if (!response.ok) throw new Error('Erro HTTP ' + response.status);
  const text = await response.text();
  return JSON.parse(text);
}

/**
 * Busca todas as categorias de exercícios.
 * Retorna um mapa { id: nome }.
 */
export async function fetchCategories() {
  const response = await fetch(BASE_URL + '/exercisecategory/?format=json');
  if (!response.ok) throw new Error('Erro HTTP ' + response.status);
  const text = await response.text();
  const data = JSON.parse(text);
  const mapa = {};
  var results = data.results || [];
  for (let i = 0; i < results.length; i++) {
    mapa[results[i].id] = results[i].name;
  }
  return mapa;
}
