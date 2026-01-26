// Utility functions for cookie management

export const cookieUtils = {
  // Set a cookie with optional expiration (defaults to 7 days)
  setCookie: (name, value, days = 7) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    
    // Para desenvolvimento local, usar configuração mais simples
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // Configuração simples para localhost
      document.cookie = `${name}=${value || ''}${expires}; path=/`;
      console.log(`🍪 Cookie ${name} criado para localhost`);
    } else {
      // Configuração completa para produção
      const isSecure = window.location.protocol === 'https:';
      const secureFlag = isSecure ? '; Secure' : '';
      document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Strict${secureFlag}`;
      console.log(`🍪 Cookie ${name} criado para produção`);
    }
  },

  // Get a cookie value by name
  getCookie: (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  // Delete a cookie
  deleteCookie: (name) => {
    console.log(`🗑️ Deletando cookie ${name}`);
    
    // Para desenvolvimento local, usar configuração mais simples
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // Configuração simples para localhost
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    } else {
      // Configuração completa para produção
      const isSecure = window.location.protocol === 'https:';
      const secureFlag = isSecure ? '; Secure' : '';
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict${secureFlag}`;
    }
  },

  // Check if cookies are enabled
  areCookiesEnabled: () => {
    try {
      document.cookie = 'testcookie=1; SameSite=Strict';
      const cookiesEnabled = document.cookie.indexOf('testcookie=') !== -1;
      // Delete test cookie
      document.cookie = 'testcookie=; expires=Thu, 01-Jan-70 00:00:01 GMT; SameSite=Strict';
      return cookiesEnabled;
    } catch (e) {
      return false;
    }
  },

  // Debug function to show all cookies
  debugCookies: () => {
    console.log('🍪 Todos os cookies:', document.cookie);
    console.log('🌐 Protocolo:', window.location.protocol);
    console.log('🔒 Secure será usado?', window.location.protocol === 'https:');
    return document.cookie;
  }
};

// Storage utility that uses cookies as primary and localStorage as fallback
export const secureStorage = {
  setItem: (key, value) => {
    console.log(`🍪 Tentando salvar ${key}:`, value);
    try {
      // Try cookies first
      if (cookieUtils.areCookiesEnabled()) {
        cookieUtils.setCookie(key, value, 7); // 7 days expiration
        console.log(`✅ Cookie ${key} salvo com sucesso`);
        
        // Verificar se realmente foi salvo
        const savedValue = cookieUtils.getCookie(key);
        console.log(`🔍 Verificação do cookie ${key}:`, savedValue);
      } else {
        console.log(`⚠️ Cookies não habilitados, usando localStorage para ${key}`);
        // Fallback to localStorage
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error storing data:', error);
      // Last resort: try localStorage
      try {
        localStorage.setItem(key, value);
        console.log(`📦 Fallback localStorage usado para ${key}`);
      } catch (localError) {
        console.error('Error storing data in localStorage:', localError);
      }
    }
  },

  getItem: (key) => {
    try {
      // Try cookies first
      let value = cookieUtils.getCookie(key);
      console.log(`🔍 Buscando ${key} no cookie:`, value);
      
      if (value) {
        return value;
      }
      
      // Fallback to localStorage
      value = localStorage.getItem(key);
      console.log(`📦 Buscando ${key} no localStorage:`, value);
      return value;
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  },

  removeItem: (key) => {
    console.log(`🗑️ Removendo ${key}`);
    try {
      // Remove from both cookies and localStorage
      cookieUtils.deleteCookie(key);
      localStorage.removeItem(key);
      console.log(`✅ ${key} removido com sucesso`);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },

  clear: () => {
    console.log(`🧹 Limpando todos os dados de autenticação`);
    try {
      // Clear specific app cookies
      cookieUtils.deleteCookie('token');
      cookieUtils.deleteCookie('user');
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log(`✅ Dados limpos com sucesso`);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Debug function
  debug: () => {
    console.log('=== DEBUG SECURE STORAGE ===');
    cookieUtils.debugCookies();
    console.log('📦 localStorage token:', localStorage.getItem('token'));
    console.log('📦 localStorage user:', localStorage.getItem('user'));
    console.log('🍪 Cookie token:', cookieUtils.getCookie('token'));
    console.log('🍪 Cookie user:', cookieUtils.getCookie('user'));
    console.log('============================');
  }
};

export default secureStorage;