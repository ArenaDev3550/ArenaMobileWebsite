// Google Calendar Integration Service V2 - Usando Google Identity Services
// Esta versão utiliza a nova Google Identity Services API que evita problemas de CORS
import CookieManager from '../utils/cookieManager.js';

const GOOGLE_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '133543641415-gvrg7ql4h0jkmul9od8nnmc4igajlid1.apps.googleusercontent.com',
  API_KEY: import.meta.env.VITE_GOOGLE_API_KEY || 'AIzaSyDV-zGFcWBBPYfa-Nfw_tA4nHgRI6hXSrg',
  SCOPES: 'https://www.googleapis.com/auth/calendar.events'
};

class GoogleCalendarServiceV2 {
  constructor() {
    this.isInitialized = false;
    this.isSignedIn = false;
    this.accessToken = null;
    this.tokenClient = null;
    this.userInfo = null;
    
    // Tentar restaurar autenticação dos cookies ao inicializar
    this.restoreFromCookies();
  }

  // Restaurar autenticação dos cookies OU do login
  restoreFromCookies() {
    try {
      // PRIORIDADE 1: Verificar se tem token do login com Google (localStorage)
      const googleAccessToken = localStorage.getItem('google_access_token');
      const googleUserInfo = localStorage.getItem('google_user_info');
      
      if (googleAccessToken) {
        this.accessToken = googleAccessToken;
        this.isSignedIn = true;
        if (googleUserInfo) {
          this.userInfo = JSON.parse(googleUserInfo);
        }
        console.log('✅ Autenticação restaurada do login com Google');
        console.log('📅 Token do Calendar já está disponível (do login)');
        return;
      }
      
      // PRIORIDADE 2: Tentar restaurar dos cookies (método antigo)
      const authData = CookieManager.getGoogleAuth();
      const userInfo = CookieManager.getGoogleUserInfo();
      
      if (authData && authData.access_token) {
        this.accessToken = authData.access_token;
        this.isSignedIn = true;
        this.userInfo = userInfo;
        console.log('✅ Autenticação restaurada dos cookies');
        console.log(`🕒 Token válido por mais ${CookieManager.getTokenTimeRemaining()} minutos`);
      } else {
        console.log('ℹ️ Nenhuma autenticação válida encontrada');
      }
    } catch (error) {
      console.error('❌ Erro ao restaurar autenticação:', error);
    }
  }

  // Carregar e inicializar a Google Identity Services API
  async initialize() {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Carregar Google Identity Services
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        try {
          // Inicializar token client
          this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CONFIG.CLIENT_ID,
            scope: GOOGLE_CONFIG.SCOPES,
            callback: (response) => {
              if (response.error) {
                console.error('❌ Erro no token:', response.error);
                return;
              }
              
              // Salvar dados nos cookies
              this.accessToken = response.access_token;
              this.isSignedIn = true;
              
              // Salvar autenticação nos cookies
              CookieManager.saveGoogleAuth(response);
              
              // Buscar e salvar informações do usuário
              this.fetchAndSaveUserInfo();
              
              console.log('✅ Token obtido e salvo nos cookies');
            },
          });

          this.isInitialized = true;
          console.log('✅ Google Identity Services inicializada');
          
          // Se já temos autenticação dos cookies, não precisamos fazer login novamente
          if (this.isSignedIn) {
            console.log('✅ Usando autenticação dos cookies');
          }
          
          resolve();
        } catch (error) {
          console.error('❌ Erro ao inicializar:', error);
          reject(error);
        }
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Fazer login e obter token
  async signIn() {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (this.isSignedIn && this.accessToken) {
        console.log('✅ Usuário já está logado');
        return true;
      }

      return new Promise((resolve, reject) => {
        // Configurar callback temporário
        const originalCallback = this.tokenClient.callback;
        this.tokenClient.callback = (response) => {
          if (response.error) {
            reject(response);
            return;
          }
          this.accessToken = response.access_token;
          this.isSignedIn = true;
          // Restaurar callback original
          this.tokenClient.callback = originalCallback;
          resolve(response);
        };

        // Solicitar token
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      });
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  }

  // Buscar e salvar informações do usuário
  async fetchAndSaveUserInfo() {
    try {
      if (!this.accessToken) return;
      
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      
      if (response.ok) {
        const userInfo = await response.json();
        this.userInfo = userInfo;
        CookieManager.saveGoogleUserInfo(userInfo);
        console.log('✅ Informações do usuário salvas:', userInfo.name);
      }
    } catch (error) {
      console.error('❌ Erro ao buscar informações do usuário:', error);
    }
  }

  // Fazer logout
  async signOut() {
    try {
      if (this.accessToken) {
        // Revogar token no Google
        try {
          google.accounts.oauth2.revoke(this.accessToken);
        } catch (revokeError) {
          console.warn('⚠️ Erro ao revogar token no Google (pode já estar expirado):', revokeError);
        }
        
        // Limpar dados locais
        this.accessToken = null;
        this.isSignedIn = false;
        this.userInfo = null;
        
        // Limpar cookies
        CookieManager.clearGoogleAuth();
        
        console.log('✅ Logout realizado e cookies limpos');
      }
    } catch (error) {
      console.error('❌ Erro no logout:', error);
      throw error;
    }
  }

  // Verificar se está autenticado
  isAuthenticated() {
    // Verificar se temos token válido
    const hasValidToken = this.isSignedIn && !!this.accessToken;
    
    // Se não temos token localmente, tentar restaurar
    if (!hasValidToken) {
      this.restoreFromCookies();
      return this.isSignedIn && !!this.accessToken;
    }
    
    return hasValidToken;
  }

  // Verificar se já tem permissões do Calendar (feito no login)
  hasCalendarPermissions() {
    const googleAccessToken = localStorage.getItem('google_access_token');
    if (googleAccessToken) {
      console.log('✅ Permissões do Calendar já foram concedidas no login');
      return true;
    }
    return false;
  }

  // Fazer chamadas para a API do Google Calendar
  async makeApiCall(endpoint, options = {}) {
    if (!this.isAuthenticated()) {
      throw new Error('Usuário não está autenticado');
    }

    const url = `https://www.googleapis.com/calendar/v3/${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erro na API');
    }

    return response.json();
  }

  // Buscar eventos do calendário
  async getEvents(date = null) {
    try {
      const timeMin = date 
        ? new Date(date).toISOString()
        : new Date().toISOString();
        
      const timeMax = date
        ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString()
        : new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

      const params = new URLSearchParams({
        calendarId: 'primary',
        timeMin: timeMin,
        timeMax: timeMax,
        showDeleted: 'false',
        singleEvents: 'true',
        orderBy: 'startTime',
        q: 'ARENA'
      });

      const response = await this.makeApiCall(`calendars/primary/events?${params}`);
      
      console.log('📅 Eventos encontrados:', response.items?.length || 0);
      return response.items || [];
    } catch (error) {
      console.error('❌ Erro ao listar eventos:', error);
      throw error;
    }
  }

  // Criar um novo evento
  async createEvent(eventData) {
    try {
      // Verificar conflitos
      const existingEvents = await this.getEvents(eventData.date);
      const conflictingEvent = existingEvents.find(event => {
        const eventStart = new Date(event.start.dateTime);
        const newEventStart = new Date(`${eventData.date}T${eventData.time}`);
        return Math.abs(eventStart.getTime() - newEventStart.getTime()) < 60000;
      });

      if (conflictingEvent) {
        throw new Error('Já existe um evento neste horário');
      }

      const startDateTime = new Date(`${eventData.date}T${eventData.time}`);
      const endDateTime = new Date(startDateTime.getTime() + (eventData.duration || 60) * 60000);

      // Incluir professor no título se fornecido
      const titulo = eventData.professor 
        ? `ARENA - ${eventData.disciplina} - ${eventData.professor}`
        : `ARENA - ${eventData.disciplina}`;
        
      const descricao = eventData.description || 
        (eventData.professor 
          ? `Aula de ${eventData.disciplina} com ${eventData.professor}`
          : `Aula de ${eventData.disciplina}`);

      const event = {
        summary: titulo,
        description: descricao,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        colorId: '9'
      };

      const response = await this.makeApiCall('calendars/primary/events', {
        method: 'POST',
        body: JSON.stringify(event)
      });

      console.log('✅ Evento criado:', response);
      return response;
    } catch (error) {
      console.error('❌ Erro ao criar evento:', error);
      throw error;
    }
  }

  // Atualizar evento
  async updateEvent(eventId, eventData) {
    try {
      const startDateTime = new Date(`${eventData.date}T${eventData.time}`);
      const endDateTime = new Date(startDateTime.getTime() + (eventData.duration || 60) * 60000);

      // Incluir professor no título se fornecido
      const titulo = eventData.professor 
        ? `ARENA - ${eventData.disciplina} - ${eventData.professor}`
        : `ARENA - ${eventData.disciplina}`;
        
      const descricao = eventData.description || 
        (eventData.professor 
          ? `Aula de ${eventData.disciplina} com ${eventData.professor}`
          : `Aula de ${eventData.disciplina}`);

      const event = {
        summary: titulo,
        description: descricao,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        colorId: '9'
      };

      const response = await this.makeApiCall(`calendars/primary/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(event)
      });

      console.log('✅ Evento atualizado:', response);
      return response;
    } catch (error) {
      console.error('❌ Erro ao atualizar evento:', error);
      throw error;
    }
  }

  // Deletar evento
  async deleteEvent(eventId) {
    try {
      await this.makeApiCall(`calendars/primary/events/${eventId}`, {
        method: 'DELETE'
      });

      console.log('✅ Evento deletado');
      return true;
    } catch (error) {
      console.error('❌ Erro ao deletar evento:', error);
      throw error;
    }
  }

  // Gerar slots de horário (07:00 - 19:00)
  generateTimeSlots() {
    const slots = [];
    for (let hour = 7; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) { // Intervalos de 30 minutos
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  }

  // Filtrar horários baseado na data e hora atual
  getAvailableTimeSlots(selectedDate) {
    const allSlots = this.generateTimeSlots();
    const today = new Date().toISOString().split('T')[0];
    
    // Se não é hoje, mostrar todos os horários
    if (selectedDate !== today) {
      return allSlots;
    }
    
    // Se é hoje, filtrar horários que já passaram
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    return allSlots.filter(time => {
      const [hour, minute] = time.split(':').map(Number);
      // Manter horário se for da hora atual ou futura
      if (hour > currentHour) return true;
      if (hour === currentHour) return true; // Mostrar horário atual mesmo que tenha passado alguns minutos
      return false;
    });
  }

  // Verificar disponibilidade
  async checkTimeSlotAvailability(date, time) {
    try {
      const events = await this.getEvents(date);
      const targetDateTime = new Date(`${date}T${time}`);
      
      const isOccupied = events.some(event => {
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        return targetDateTime >= eventStart && targetDateTime < eventEnd;
      });

      return !isOccupied;
    } catch (error) {
      console.error('❌ Erro ao verificar disponibilidade:', error);
      return false;
    }
  }

  // Verificar se está logado
  isUserSignedIn() {
    return this.isAuthenticated();
  }

  // Obter informações do usuário
  getUserInfo() {
    return this.userInfo || CookieManager.getGoogleUserInfo();
  }

  // Verificar se o token está próximo de expirar (menos de 5 minutos)
  isTokenExpiringSoon() {
    const timeRemaining = CookieManager.getTokenTimeRemaining();
    return timeRemaining <= 5;
  }

  // Renovar token automaticamente se necessário
  async autoRenewToken() {
    if (this.isTokenExpiringSoon() && this.tokenClient) {
      console.log('🔄 Token expirando em breve, renovando automaticamente...');
      try {
        await this.signIn();
        console.log('✅ Token renovado automaticamente');
      } catch (error) {
        console.error('❌ Erro ao renovar token:', error);
        // Se falhou, limpar tudo e forçar novo login
        this.signOut();
      }
    }
  }

  // Debug info
  getDebugInfo() {
    const cookieAuth = CookieManager.getGoogleAuth();
    const userInfo = this.getUserInfo();
    
    return {
      isInitialized: this.isInitialized,
      isSignedIn: this.isSignedIn,
      hasToken: !!this.accessToken,
      tokenFromCookies: !!cookieAuth?.access_token,
      tokenTimeRemaining: CookieManager.getTokenTimeRemaining(),
      userInfo: userInfo ? { name: userInfo.name, email: userInfo.email } : null,
      clientId: GOOGLE_CONFIG.CLIENT_ID,
      currentUrl: window.location.origin,
      cookiesDebug: CookieManager.debugGoogleCookies
    };
  }
}

// Instância singleton
const googleCalendarServiceV2 = new GoogleCalendarServiceV2();

export default googleCalendarServiceV2;