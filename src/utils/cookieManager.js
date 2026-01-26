// Cookie Management Utility
// Utilitário para gerenciar cookies de forma segura

export class CookieManager {
  // Definir nomes dos cookies
  static COOKIE_NAMES = {
    GOOGLE_ACCESS_TOKEN: 'google_access_token',
    GOOGLE_TOKEN_EXPIRY: 'google_token_expiry',
    GOOGLE_USER_INFO: 'google_user_info',
    GOOGLE_REFRESH_TOKEN: 'google_refresh_token'
  };

  // Configurações padrão dos cookies
  static COOKIE_OPTIONS = {
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'Lax',
    maxAge: 60 * 60 * 24 * 7 // 7 dias em segundos
  };

  // Salvar cookie
  static setCookie(name, value, options = {}) {
    try {
      const cookieOptions = { ...this.COOKIE_OPTIONS, ...options };
      
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      
      if (cookieOptions.maxAge) {
        cookieString += `; Max-Age=${cookieOptions.maxAge}`;
      }
      
      if (cookieOptions.path) {
        cookieString += `; Path=${cookieOptions.path}`;
      }
      
      if (cookieOptions.secure) {
        cookieString += '; Secure';
      }
      
      if (cookieOptions.sameSite) {
        cookieString += `; SameSite=${cookieOptions.sameSite}`;
      }

      document.cookie = cookieString;
      console.log('✅ Cookie salvo:', name);
    } catch (error) {
      console.error('❌ Erro ao salvar cookie:', error);
    }
  }

  // Obter cookie
  static getCookie(name) {
    try {
      const nameEQ = encodeURIComponent(name) + '=';
      const cookies = document.cookie.split(';');
      
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
          const value = cookie.substring(nameEQ.length);
          return decodeURIComponent(value);
        }
      }
      return null;
    } catch (error) {
      console.error('❌ Erro ao obter cookie:', error);
      return null;
    }
  }

  // Deletar cookie
  static deleteCookie(name) {
    try {
      document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=${this.COOKIE_OPTIONS.path}`;
      console.log('🗑️ Cookie deletado:', name);
    } catch (error) {
      console.error('❌ Erro ao deletar cookie:', error);
    }
  }

  // Verificar se cookie existe
  static hasCookie(name) {
    return this.getCookie(name) !== null;
  }

  // Salvar dados de autenticação do Google
  static saveGoogleAuth(authData) {
    try {
      console.log('💾 Salvando dados de autenticação do Google...');
      
      if (authData.access_token) {
        this.setCookie(this.COOKIE_NAMES.GOOGLE_ACCESS_TOKEN, authData.access_token);
      }
      
      if (authData.expires_in) {
        const expiryTime = Date.now() + (authData.expires_in * 1000);
        this.setCookie(this.COOKIE_NAMES.GOOGLE_TOKEN_EXPIRY, expiryTime.toString());
      }
      
      if (authData.refresh_token) {
        this.setCookie(this.COOKIE_NAMES.GOOGLE_REFRESH_TOKEN, authData.refresh_token);
      }
      
      console.log('✅ Dados de autenticação salvos nos cookies');
    } catch (error) {
      console.error('❌ Erro ao salvar autenticação:', error);
    }
  }

  // Salvar informações do usuário
  static saveGoogleUserInfo(userInfo) {
    try {
      this.setCookie(this.COOKIE_NAMES.GOOGLE_USER_INFO, JSON.stringify(userInfo));
      console.log('✅ Informações do usuário salvas');
    } catch (error) {
      console.error('❌ Erro ao salvar informações do usuário:', error);
    }
  }

  // Obter dados de autenticação salvos
  static getGoogleAuth() {
    try {
      const accessToken = this.getCookie(this.COOKIE_NAMES.GOOGLE_ACCESS_TOKEN);
      const expiryTime = this.getCookie(this.COOKIE_NAMES.GOOGLE_TOKEN_EXPIRY);
      const refreshToken = this.getCookie(this.COOKIE_NAMES.GOOGLE_REFRESH_TOKEN);
      
      if (!accessToken) {
        return null;
      }
      
      // Verificar se o token expirou
      if (expiryTime && Date.now() > parseInt(expiryTime)) {
        console.log('⚠️ Token expirado, removendo cookies...');
        this.clearGoogleAuth();
        return null;
      }
      
      return {
        access_token: accessToken,
        expires_at: expiryTime ? parseInt(expiryTime) : null,
        refresh_token: refreshToken
      };
    } catch (error) {
      console.error('❌ Erro ao obter autenticação:', error);
      return null;
    }
  }

  // Obter informações do usuário salvas
  static getGoogleUserInfo() {
    try {
      const userInfoString = this.getCookie(this.COOKIE_NAMES.GOOGLE_USER_INFO);
      return userInfoString ? JSON.parse(userInfoString) : null;
    } catch (error) {
      console.error('❌ Erro ao obter informações do usuário:', error);
      return null;
    }
  }

  // Verificar se está autenticado (token válido e não expirado)
  static isGoogleAuthenticated() {
    const authData = this.getGoogleAuth();
    return authData !== null && authData.access_token;
  }

  // Limpar todos os dados de autenticação do Google
  static clearGoogleAuth() {
    try {
      console.log('🧹 Limpando dados de autenticação do Google...');
      
      Object.values(this.COOKIE_NAMES).forEach(cookieName => {
        this.deleteCookie(cookieName);
      });
      
      console.log('✅ Todos os cookies do Google foram removidos');
    } catch (error) {
      console.error('❌ Erro ao limpar autenticação:', error);
    }
  }

  // Obter tempo restante até expirar (em minutos)
  static getTokenTimeRemaining() {
    const expiryTime = this.getCookie(this.COOKIE_NAMES.GOOGLE_TOKEN_EXPIRY);
    if (!expiryTime) return 0;
    
    const remaining = parseInt(expiryTime) - Date.now();
    return Math.max(0, Math.floor(remaining / (1000 * 60))); // em minutos
  }

  // Debug: listar todos os cookies relacionados ao Google
  static debugGoogleCookies() {
    console.log('🔍 Debug - Cookies do Google:');
    Object.entries(this.COOKIE_NAMES).forEach(([key, cookieName]) => {
      const value = this.getCookie(cookieName);
      console.log(`  ${key}: ${value ? '✅ Presente' : '❌ Ausente'}`);
    });
    
    const timeRemaining = this.getTokenTimeRemaining();
    console.log(`  Tempo restante: ${timeRemaining} minutos`);
  }
}

export default CookieManager;