// Função para processar HTML mantendo links funcionais
export const processAnnouncementHTML = (htmlString) => {
  if (!htmlString) return '';
  
  // Primeiro, substituir entidades HTML
  let processedHTML = htmlString
    .replace(/&nbsp;/gi, ' ')
    .replace(/&aacute;/gi, 'á')
    .replace(/&agrave;/gi, 'à')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&acirc;/gi, 'â')
    .replace(/&ecirc;/gi, 'ê')
    .replace(/&ocirc;/gi, 'ô')
    .replace(/&atilde;/gi, 'ã')
    .replace(/&otilde;/gi, 'õ')
    .replace(/&ccedil;/gi, 'ç')
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&deg;/gi, '°');

  // Remover tags <body>, <style> e CSS inline
  processedHTML = processedHTML
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gis, '')
    // Remover CSS no final do conteúdo (padrão dos comunicados)
    .replace(/\.[A-Z]{1,3}\{[^}]*\}/g, '')
    .replace(/p\{[^}]*\}/g, '')
    .replace(/\.\w+\{[^}]*\}/g, '');

  // Processar links para manter apenas o texto e URL
  processedHTML = processedHTML.replace(
    /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
  );

  // Remover todas as outras tags HTML exceto links e br
  processedHTML = processedHTML
    .replace(/<(?!\/?(?:a|br)\b)[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '<br/>');

  // Limpar espaços e quebras de linha excessivos
  processedHTML = processedHTML
    .replace(/\s+/g, ' ')
    .replace(/\s*<br\/>\s*/g, '<br/>')
    .replace(/(<br\/>)+/g, '<br/>')
    .trim();

  return processedHTML;
};

// Função para limpar e processar HTML dos comunicados
export const cleanAnnouncementHTML = (htmlString) => {
  if (!htmlString) return '';
  
  // Remove tags <body> e <style>
  let cleanText = htmlString
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gis, '');
  
  // Converte algumas tags HTML básicas para texto limpo
  cleanText = cleanText
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&aacute;/gi, 'á')
    .replace(/&agrave;/gi, 'à')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&acirc;/gi, 'â')
    .replace(/&ecirc;/gi, 'ê')
    .replace(/&ocirc;/gi, 'ô')
    .replace(/&atilde;/gi, 'ã')
    .replace(/&otilde;/gi, 'õ')
    .replace(/&ccedil;/gi, 'ç')
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&deg;/gi, '°');
  
  // Remove múltiplas quebras de linha
  cleanText = cleanText
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
  
  return cleanText;
};

// Função para extrair links do HTML
export const extractLinksFromHTML = (htmlString) => {
  if (!htmlString) return [];
  
  const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(htmlString)) !== null) {
    links.push({
      url: match[1],
      text: match[2].replace(/&[^;]+;/g, '')
    });
  }
  
  return links;
};

// Função para extrair apenas o texto limpo (sem HTML) para preview
export const extractCleanTextForPreview = (htmlString) => {
  if (!htmlString) return '';
  
  // Remover CSS e estilos primeiro
  let cleanText = htmlString
    .replace(/<style[^>]*>.*?<\/style>/gis, '')
    .replace(/\.[A-Z]{1,3}\{[^}]*\}/g, '')
    .replace(/p\{[^}]*\}/g, '')
    .replace(/\.\w+\{[^}]*\}/g, '')
    // Remover todas as tags HTML
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&aacute;/gi, 'á')
    .replace(/&agrave;/gi, 'à')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&acirc;/gi, 'â')
    .replace(/&ecirc;/gi, 'ê')
    .replace(/&ocirc;/gi, 'ô')
    .replace(/&atilde;/gi, 'ã')
    .replace(/&otilde;/gi, 'õ')
    .replace(/&ccedil;/gi, 'ç')
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&deg;/gi, '°');

  // Remove espaços múltiplos e quebras de linha
  cleanText = cleanText
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, ' ')
    .trim();

  return cleanText;
};

// Função para truncar texto
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};