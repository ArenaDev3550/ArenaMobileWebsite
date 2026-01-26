// Utilitário para decodificar strings com caracteres especiais da API
// A API retorna strings com encoding especial que precisam ser convertidas

export const decodeApiString = (str) => {
  if (!str || typeof str !== 'string') {
    return str;
  }

  try {
    // Primeiro, converter sequências Unicode (\u codes)
    let decoded = str.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => 
      String.fromCharCode(parseInt(grp, 16))
    );
    
    // Converter códigos HTML/URL comuns
    const htmlEntities = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
      '%20': ' ',
      '%21': '!',
      '%22': '"',
      '%23': '#',
      '%24': '$',
      '%25': '%',
      '%26': '&',
      '%27': "'",
      '%28': '(',
      '%29': ')',
      '%2A': '*',
      '%2B': '+',
      '%2C': ',',
      '%2D': '-',
      '%2E': '.',
      '%2F': '/',
      '%3A': ':',
      '%3B': ';',
      '%3C': '<',
      '%3D': '=',
      '%3E': '>',
      '%3F': '?',
      '%40': '@',
      '%5B': '[',
      '%5C': '\\',
      '%5D': ']',
      '%5E': '^',
      '%5F': '_',
      '%60': '`',
      '%7B': '{',
      '%7C': '|',
      '%7D': '}',
      '%7E': '~'
    };

    // Aplicar decodificação de entidades HTML/URL
    Object.keys(htmlEntities).forEach(entity => {
      decoded = decoded.replace(new RegExp(entity, 'g'), htmlEntities[entity]);
    });

    // Tentar decodificar URL encoding geral
    try {
      decoded = decodeURIComponent(decoded);
    } catch (e) {
      // Se der erro, manter a string parcialmente decodificada
      console.warn('Erro ao decodificar URI:', e);
    }

    return decoded;
  } catch (error) {
    console.warn('Erro ao decodificar string da API:', error);
    return str; // Retornar string original se houver erro
  }
};

// Decodificar objeto inteiro recursivamente
export const decodeApiObject = (obj) => {
  if (!obj) return obj;
  
  if (typeof obj === 'string') {
    return decodeApiString(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => decodeApiObject(item));
  }
  
  if (typeof obj === 'object') {
    const decoded = {};
    Object.keys(obj).forEach(key => {
      decoded[key] = decodeApiObject(obj[key]);
    });
    return decoded;
  }
  
  return obj;
};

// Função específica para formatar nomes de professores
export const formatProfessorName = (name) => {
  if (!name) return '';
  
  const decoded = decodeApiString(name);
  
  // Converter para title case (primeira letra maiúscula)
  return decoded
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Função específica para formatar nomes de disciplinas
export const formatDisciplinaName = (name) => {
  if (!name) return '';
  
  const decoded = decodeApiString(name);
  
  // Manter maiúsculas para disciplinas específicas
  const specialCases = {
    'QUIMICA': 'Química',
    'FISICA': 'Física',
    'MATEMATICA': 'Matemática',
    'PORTUGUES': 'Português',
    'HISTORIA': 'História',
    'GEOGRAFIA': 'Geografia',
    'BIOLOGIA': 'Biologia',
    'REDACAO': 'Redação',
    'INGLES': 'Inglês',
    'EDUCACAO FISICA': 'Educação Física',
    'ARTES': 'Artes'
  };
  
  const upperDecoded = decoded.toUpperCase();
  
  // Verificar casos especiais
  for (const [key, value] of Object.entries(specialCases)) {
    if (upperDecoded.includes(key)) {
      return decoded.replace(new RegExp(key, 'gi'), value);
    }
  }
  
  // Converter para title case por padrão
  return decoded
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default {
  decodeApiString,
  decodeApiObject,
  formatProfessorName,
  formatDisciplinaName
};