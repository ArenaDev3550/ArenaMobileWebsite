import axios from 'axios';
import educamobileStyles from '../styles/EducaMobile.css?raw';

const BASE_URL = 'https://educamobile.colegioarena.com.br';

// CSS inline para o EducaMobile
const EDUCAMOBILE_CSS = `<style>${educamobileStyles}</style>`;

/**
 * Extrai o path relativo de uma URL do EducaMobile 
 */
function extractPath(url) {
  try {
    if (!url) return '';
    if (url.startsWith('#')) return '';
    
    // Remove o domínio base se existir
    let path = url.replace(BASE_URL, '');
    
    // Remove a primeira barra se existir
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    
    console.log('Path extraído:', { url, path });
    return path;
  } catch (error) {
    console.error('Erro ao extrair path:', error);
    return '';
  }
}

/**
 * Transforma URLs relativas em absolutas no HTML
 */
function transformHtml(html) {
  if (!html) return '';
  console.log('Iniciando transformação do HTML');

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Injeta estilos customizados diretamente no body
  const styleContainer = doc.createElement('div');
  styleContainer.innerHTML = EDUCAMOBILE_CSS;
  doc.body.insertBefore(styleContainer.firstElementChild, doc.body.firstChild);

  // Adiciona classe container ao body
  doc.body.classList.add('educamobile-container');

  // Copia a div de perfil e insere após o h1
  const profileDiv = doc.querySelector('#profile');
  const titleH1 = doc.querySelector('h1');

  if (profileDiv && titleH1) {
    console.log('Encontrados: div profile e h1, fazendo cópia...');
    const profileClone = profileDiv.cloneNode(true);
    // Remove o id da cópia para evitar duplicação
    profileClone.removeAttribute('id');
    // Adiciona classe para identificar como cópia
    profileClone.classList.add('profile-clone');

    // Insere após o h1
    titleH1.parentNode.insertBefore(profileClone, titleH1.nextSibling);
    console.log('Cópia da div profile inserida após o h1');
  } else {
    console.log('Div profile ou h1 não encontrados:', {
      profileFound: !!profileDiv,
      h1Found: !!titleH1
    });
  }

  console.log('CSS injetado no HTML:', {
    hasStyleTag: !!doc.querySelector('style'),
    bodyClasses: doc.body.className,
    styleContentLength: doc.querySelector('style')?.textContent?.length
  });

  // Transforma hrefs em links e adiciona onclick
  doc.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    console.log('Processando link:', href);
    
    const path = extractPath(href);
    
    // Se for um link interno do EducaMobile
    if (path) {
      console.log('Configurando link interno:', path);
      
      // Remove qualquer onclick existente
      const originalOnClick = a.getAttribute('onclick');
      if (originalOnClick) {
        console.log('Removendo onclick:', originalOnClick);
        a.removeAttribute('onclick');
      }
      
      // Configura o link para navegação interna
      a.setAttribute('data-path', path);
      a.classList.add('educamobile-link');
      a.setAttribute('href', '#');
      a.setAttribute('onclick', `
        (function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Click direto no link:', '${path}');
          window.dispatchEvent(new CustomEvent('educamobile-navigate', { 
            detail: { path: '${path}' } 
          }));
          return false;
        })(event)
      `);

      console.log('Link configurado:', {
        path,
        newHref: a.getAttribute('href'),
        classes: a.className
      });
    }
  });

  // Transforma srcs em imagens
  doc.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src');
    // Não transforma URLs de dados (data:image/) - mantém imagens em base64
    if (!src.startsWith('data:image/')) {
      img.setAttribute('src', transformUrl(src));
    }
  });

  // Transforma backgrounds em elementos com style
  doc.querySelectorAll('[style*="background"]').forEach(el => {
    const style = el.getAttribute('style');
    if (style) {
      const newStyle = style.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
        return `url('${transformUrl(url)}')`;
      });
      el.setAttribute('style', newStyle);
    }
  });

  // Nenhum script adicional necessário pois os links já têm onclick

  return doc.body.innerHTML;
}

/**
 * Transforma URLs relativas em absolutas
 */
function transformUrl(url) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')) {
    return url;
  }
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * Função para fazer a requisição ao EducaMobile
 */
export async function fetchEducaMobileContent(cookies, path = 'EducaMobile/Home/Index') {
  try {
    console.log('Buscando conteúdo:', { path, cookies });
    
    const response = await axios.get('http://localhost:3000/api/educamobile/proxy', {
      params: {
        ...cookies,
        path
      },
      withCredentials: true,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3'
      }
    });

    console.log('Resposta recebida:', {
      status: response.status,
      contentLength: response.data?.length
    });

    const transformedHtml = transformHtml(response.data);
    
    console.log('HTML transformado:', {
      originalLength: response.data?.length,
      transformedLength: transformedHtml?.length
    });

    return transformedHtml;
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    throw error;
  }
}