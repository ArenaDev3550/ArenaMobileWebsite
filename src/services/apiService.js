import secureStorage from '../utils/secureStorage';

// Usar variável de ambiente ou fallback para desenvolvimento local
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/* Dados de exemplo do usuário retornados pela API
{'ra': '243694', 'nome_completo': 'SOFIA DE CASTRO SOUSA GUALBERTO', 'email': 'SOFIAGUALBERTO@ICLOUD.COM', 'cod_turma': '1B', 'nome_turma': '1ª SÉRIE B', 'sexo': 'F', 'tel_1': '6232811571', 'tel_2': '62996135409', 'data_nascimento': datetime.date(2009, 7, 24), 'cod_tipo_aluno': 1, 'tipo_aluno': 'ATIVO'}
*/

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token de autenticação se existir
    const token = secureStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Se for erro 401, limpar dados de autenticação
        if (response.status === 401) {
          secureStorage.removeItem('token');
          secureStorage.removeItem('user');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro na requisição ${endpoint}:`, error);
      throw error;
    }
  }

  // Método específico para login
  async login(username, password) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Método para login com Google
  async loginWithGoogle(googleToken) {
    return this.request('/login/google', {
      method: 'POST',
      body: JSON.stringify({ google_token: googleToken }),
    });
  }

  // Método para verificar se o token é válido e buscar dados do usuário
  async verifyToken() {
    return this.request('/user', {
      method: 'GET'
    });
  }

  // Metodo para buscar a imagem do aluno
  async fetchStudentImage(studentId) {
    return this.request(`/student/image-base64/${studentId}`, {
      method: 'GET'
    });
  }

  // Método para logout
  async logout() {
    return this.request('/logout', {
      method: 'POST',
    });
  }

  // Método para alterar senha
  async changePassword(currentPassword, newPassword) {
    return this.request('/change-password', {
      method: 'POST',
      body: JSON.stringify({ 
        current_password: currentPassword, 
        new_password: newPassword 
      }),
    });
  }

  // Método para buscar disciplinas com professores por série e turma
  async getDisciplinasComProfessores(serie, turma) {
    const params = new URLSearchParams();
    //if (serie) params.append('serie', serie);
    if (turma) params.append('turma', turma);

    return this.request(`/disciplinas/com-professores?${params.toString()}`, {
      method: 'GET'
    });
  }

  // Método para buscar avaliações do estudante
  async getStudentGrades(periodoLetivo, codTurma, ra) {
    return this.request(`/student/grades?pletivo=${periodoLetivo}&codturma=${codTurma}&ra=${ra}`, {
      method: 'GET'
    });
  }

  // Método para buscar horários semanais do estudante
  async getWeeklySchedule(periodoLetivo, codTurma) {
    return this.request(`/student/weekly-schedule?pletivo=${periodoLetivo}&codturma=${codTurma}`, {
      method: 'GET'
    });
  }

  // Método para buscar disponibilidade de um professor em uma data específica
  async getProfessorDisponibilidade(professorId, data) {
    return this.request(`/agendamentos/professor/${professorId}/disponibilidade-data/${data}`, {
      method: 'GET'
    });
  }

  // Método para buscar ocorrências acadêmicas do estudante
  async getStudentOccurrences(periodoLetivo, codTurma, ra, dataInicio, dataFim) {
    const params = new URLSearchParams({
      pletivo: periodoLetivo,
      codturma: codTurma,
      ra: ra,
      data_inicio: dataInicio,
      data_fim: dataFim
    });

    return this.request(`/student/occurrences?${params.toString()}`, {
      method: 'GET'
    });
  }

  // Método para buscar boletim escolar do estudante
  async getStudentBulletin(periodoLetivo, ra) {
    const params = new URLSearchParams({
      pletivo: periodoLetivo,
      ra: ra
    });

    return this.request(`/student/bulletin?${params.toString()}`, {
      method: 'GET'
    });
  }

  // Método para buscar comunicados do estudante
  async getStudentAnnouncements(dataInicio, dataFim, page, perPage, codTurma) {
    const params = new URLSearchParams({
      data_inicio: dataInicio,
      data_fim: dataFim,
      page: page.toString(),
      per_page: perPage.toString(),
      codturma: codTurma
    });

    return this.request(`/student/announcements?${params.toString()}`, {
      method: 'GET'
    });
  }

  // Método para buscar imagem de comunicado
  async getAnnouncementImage(idImagem) {
    return this.request(`/student/announcement/image/${idImagem}`, {
      method: 'GET'
    });
  }
}

//http://localhost:8000/student/image-base64/230608

export const apiService = new ApiService();
export default apiService;