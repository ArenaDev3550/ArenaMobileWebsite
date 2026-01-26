import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Clock, Users, BookOpen, GoogleLogo, CheckCircle, X, Pencil, Trash } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import googleCalendarService from '../../services/googleCalendarServiceV2';
import apiService from '../../services/apiService';
import TimeSlotList from '../../components/TimeSlotList';
import { formatDisciplinaName, formatProfessorName } from '../../utils/stringDecoder';
import {
  PageContainer,
  PageTitle,
  ContentContainer,
  CalendarSection,
  EventsSection,
  EventCard,
  EventTitle,
  EventTime,
  EventDescription,
  GoogleAuthButton,
  FloatingAddButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  ModalActions,
  CancelButton,
  SaveButton,
  ErrorMessage,
  SuccessMessage,
  LoadingOverlay,
  EventActions,
  ActionButton,
  DateSelector
} from './Agendamentos.styles';

function Agendamentos() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  
  // Estados para série e turma (derivados dos dados do usuário)
  const [userSerie, setUserSerie] = useState('');
  const [userTurma, setUserTurma] = useState('');
  
  // Estados para filtro de disciplina e professor
  const [selectedFilterDisciplina, setSelectedFilterDisciplina] = useState('');
  const [selectedFilterProfessor, setSelectedFilterProfessor] = useState('');
  const [filteredProfessores, setFilteredProfessores] = useState([]);
  const [professorDisponibilidade, setProfessorDisponibilidade] = useState(null);
  const [loadingDisponibilidade, setLoadingDisponibilidade] = useState(false);
  const [viewMode, setViewMode] = useState('todos'); // 'todos', 'professor', 'meus-agendamentos'
  
  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProfessorModal, setShowProfessorModal] = useState(false);
  const [selectedProfessorInfo, setSelectedProfessorInfo] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    disciplina: '',
    professor: '',
    date: '',
    time: '',
    duration: 30,
    description: ''
  });
  
  // Message states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Gerar slots de horário baseados na disponibilidade do professor ou horários padrão
  const getTimeSlotsForDisplay = () => {
    if (viewMode === 'professor' && selectedFilterProfessor && professorDisponibilidade) {
      // Se há um professor selecionado e sua disponibilidade foi carregada
      if (!professorDisponibilidade.aceita_agendamentos) {
        return []; // Professor não aceita agendamentos neste dia
      }
      
      // Usar apenas os horários disponíveis do professor
      return professorDisponibilidade.horarios_disponiveis
        .filter(slot => slot.disponivel)
        .map(slot => slot.horario_inicio);
    } else if (viewMode === 'meus-agendamentos') {
      // Para "Meus Agendamentos", usar horários padrão (Google Calendar vai filtrar os eventos)
      return googleCalendarService.getAvailableTimeSlots(selectedDate);
    } else {
      // Usar horários padrão do Google Calendar
      return googleCalendarService.getAvailableTimeSlots(selectedDate);
    }
  };

  // Função para atualizar timeSlots
  const updateTimeSlots = () => {
    const slots = getTimeSlotsForDisplay();
    setTimeSlots(slots);
  };

  // Inicializar Google Calendar e carregar dados
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        
        // Inicializar Google Calendar
        await googleCalendarService.initialize();
        
        // Verificar se está autenticado (incluindo cookies)
        const isAuthenticated = googleCalendarService.isUserSignedIn();
        setIsGoogleConnected(isAuthenticated);
        
        if (isAuthenticated) {
          console.log('✅ Autenticação encontrada - usuário já está logado');
          const userInfo = googleCalendarService.getUserInfo();
          if (userInfo) {
            setSuccess(`Bem-vindo de volta, ${userInfo.name}!`);
          }
        }
        
        // Usar dados do usuário logado para série e turma
        if (user) {
          setUserSerie(user.serie || '');
          setUserTurma(user.turma || '');
        }
        
        // Gerar slots de horário
        updateTimeSlots();
        
        // Carregar eventos se conectado
        if (isAuthenticated) {
          await loadEvents();
        }
      } catch (error) {
        console.error('Erro ao inicializar:', error);
        setError('Erro ao inicializar aplicação');
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Carregar disciplinas quando dados do usuário estiverem disponíveis
  useEffect(() => {
    if (userSerie && userTurma) {
      loadDisciplinasComProfessores();
      // Reset filtros quando usuário muda
      setViewMode('todos');
      setSelectedFilterDisciplina('');
      setSelectedFilterProfessor('');
      setFilteredProfessores([]);
      setProfessorDisponibilidade(null);
    }
  }, [userSerie, userTurma]);

  // Carregar eventos quando a data mudar
  useEffect(() => {
    if (isGoogleConnected) {
      loadEvents();
    }
    
    // Recarregar disponibilidade do professor se há um selecionado
    if (selectedFilterProfessor && viewMode === 'professor') {
      loadProfessorDisponibilidade(selectedFilterProfessor, selectedDate);
    } else {
      // Atualizar slots apenas quando necessário
      updateTimeSlots();
    }
  }, [selectedDate, isGoogleConnected]);

  // Carregar disponibilidade quando professor filtrado mudar
  useEffect(() => {
    if (selectedFilterProfessor && selectedDate && viewMode === 'professor') {
      loadProfessorDisponibilidade(selectedFilterProfessor, selectedDate);
    } else {
      setProfessorDisponibilidade(null);
      updateTimeSlots();
    }
  }, [selectedFilterProfessor, viewMode]);

  // Atualizar timeSlots quando disponibilidade do professor mudar
  useEffect(() => {
    updateTimeSlots();
  }, [professorDisponibilidade]);

  // Carregar disciplinas com professores da API
  const loadDisciplinasComProfessores = async () => {
    try {
      if (!userSerie || !userTurma) {
        setDisciplinas([]);
        setProfessores([]);
        return;
      }

      setLoading(true);
      console.log('🔄 Carregando disciplinas para:', userSerie, userTurma);
      
      const response = await apiService.getDisciplinasComProfessores(userSerie, userTurma);
      
      if (response && response.disciplinas) {
        // Processar disciplinas e remover duplicatas
        const disciplinasUnicas = [];
        const disciplinasMap = new Map();
        
        response.disciplinas.forEach(disc => {
          // Decodificar e formatar nome da disciplina
          const disciplinaNome = formatDisciplinaName(disc.disciplina);
          
          if (!disciplinasMap.has(disc.codigo_disciplina)) {
            disciplinasMap.set(disc.codigo_disciplina, {
              id: disc.codigo_disciplina,
              nome: disciplinaNome,
              codigo: disc.codigo_disciplina,
              professores: disc.professores || []
            });
          }
        });
        
        const disciplinasArray = Array.from(disciplinasMap.values());
        setDisciplinas(disciplinasArray);
        
        console.log('✅ Disciplinas carregadas:', disciplinasArray.length);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar disciplinas:', error);
      setError('Erro ao carregar disciplinas. Verifique série e turma.');
    } finally {
      setLoading(false);
    }
  };

  // Atualizar professores quando disciplina for selecionada (para o modal de eventos)
  const handleDisciplinaChange = (codigoDisciplina) => {
    const disciplinaSelecionada = disciplinas.find(d => d.codigo === codigoDisciplina);
    
    if (disciplinaSelecionada && disciplinaSelecionada.professores) {
      // Decodificar e formatar nomes dos professores
      const professoresFormatados = disciplinaSelecionada.professores.map(prof => ({
        id: prof.id,
        codprof: prof.codprof,
        nome: formatProfessorName(prof.nome),
        email: prof.email
      }));
      
      setProfessores(professoresFormatados);
      
      // Se há apenas um professor, selecionar automaticamente no formulário
      if (professoresFormatados.length === 1) {
        setEventFormData(prev => ({ ...prev, professor: professoresFormatados[0].nome }));
      }
      
      console.log("Professore: ", disciplinaSelecionada)
      console.log('📋 Professores disponíveis:', professoresFormatados.length);
    } else {
      setProfessores([]);
    }
  };

  // Atualizar professores quando disciplina de filtro for selecionada
  const handleFilterDisciplinaChange = (codigoDisciplina) => {
    setSelectedFilterDisciplina(codigoDisciplina);
    setSelectedFilterProfessor('');
    setProfessorDisponibilidade(null); // Reset disponibilidade
    
    if (codigoDisciplina) {
      setViewMode('professor'); // Mudar para modo professor quando disciplina é selecionada
      const disciplinaSelecionada = disciplinas.find(d => d.codigo === codigoDisciplina);
      
      if (disciplinaSelecionada && disciplinaSelecionada.professores) {
        // Decodificar e formatar nomes dos professores
        const professoresFormatados = disciplinaSelecionada.professores.map(prof => ({
          ...prof,
          nome: formatProfessorName(prof.nome)
        }));
        
        setFilteredProfessores(professoresFormatados);
        
        // Se há apenas um professor, selecionar automaticamente e carregar disponibilidade
        if (professoresFormatados.length === 1) {
          setSelectedFilterProfessor(professoresFormatados[0].codprof);
          loadProfessorDisponibilidade(professoresFormatados[0].codprof, selectedDate);
        } else {
          updateTimeSlots(); // Atualizar para horários padrão se há múltiplos professores
        }
        
        console.log('🔍 Professores para filtro:', professoresFormatados.length);
        console.log('🔍 Disciplina:', disciplinaSelecionada);
      } else {
        setFilteredProfessores([]);
        updateTimeSlots();
      }
    } else {
      setViewMode('todos'); // Voltar para modo todos quando disciplina é desmarcada
      setFilteredProfessores([]);
      updateTimeSlots();
    }
  };

  // Abrir modal com informações do professor
  const handleProfessorInfoClick = (professor) => {
    setSelectedProfessorInfo(professor);
    setShowProfessorModal(true);
  };

  // Carregar disponibilidade do professor para a data selecionada
  const loadProfessorDisponibilidade = async (professorId, data) => {
    try {
      setLoadingDisponibilidade(true);
      console.log('🔄 Carregando disponibilidade do professor:', professorId, 'para data:', data);
      
      const response = await apiService.getProfessorDisponibilidade(professorId, data);
      setProfessorDisponibilidade(response);
      
      console.log('✅ Disponibilidade carregada:', response);
      return response;
    } catch (error) {
      console.error('❌ Erro ao carregar disponibilidade do professor:', error);
      setError('Erro ao carregar disponibilidade do professor');
      setProfessorDisponibilidade(null);
      return null;
    } finally {
      setLoadingDisponibilidade(false);
    }
  };

  // Carregar eventos do Google Calendar
  const loadEvents = async () => {
    try {
      setLoading(true);
      const googleEvents = await googleCalendarService.getEvents(selectedDate);
      setEvents(googleEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      setError('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  // Conectar com Google Calendar
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Debug info
      console.log('🔧 Debug info:', googleCalendarService.getDebugInfo());
      
      if (!isGoogleConnected) {
        console.log('🔑 Iniciando processo de login...');
        await googleCalendarService.signIn();
        setIsGoogleConnected(true);
        
        const userInfo = googleCalendarService.getUserInfo();
        const successMessage = userInfo 
          ? `Conectado ao Google Calendar como ${userInfo.name}!`
          : 'Conectado ao Google Calendar!';
        
        setSuccess(successMessage);
        await loadEvents();
      } else {
        console.log('🔓 Fazendo logout...');
        await googleCalendarService.signOut();
        setIsGoogleConnected(false);
        setEvents([]);
        setSuccess('Desconectado do Google Calendar e cookies limpos');
      }
    } catch (error) {
      console.error('❌ Erro na autenticação:', error);
      setError(`Erro ao conectar com Google Calendar: ${error.message || error.error || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal para novo evento com horário específico
  const handleTimeSlotClick = (time) => {
    setEditingEvent(null);
    
    // Pré-selecionar disciplina e professor se há filtros ativos
    let disciplinaNome = '';
    let professorNome = '';
    
    if (selectedFilterDisciplina) {
      const disciplinaSelecionada = disciplinas.find(d => d.codigo === selectedFilterDisciplina);
      if (disciplinaSelecionada) {
        disciplinaNome = disciplinaSelecionada.nome;
        
        // Se há um professor filtrado ou apenas um disponível
        if (filteredProfessores.length === 1) {
          professorNome = filteredProfessores[0].nome;
        } else if (selectedFilterProfessor) {
          const professorSelecionado = filteredProfessores.find(p => p.codprof === selectedFilterProfessor);
          if (professorSelecionado) {
            professorNome = professorSelecionado.nome;
          }
        }
      }
    }
    
    setEventFormData({
      disciplina: disciplinaNome,
      professor: professorNome,
      date: selectedDate,
      time: time,
      duration: 30,
      description: ''
    });
    
    // Atualizar professores para o modal após definir o form data
    if (selectedFilterDisciplina) {
      handleDisciplinaChange(selectedFilterDisciplina);
    } else {
      setProfessores([]);
    }
    
    setShowEventModal(true);
  };

  // Abrir modal para novo evento (botão flutuante)
  const handleNewEvent = () => {
    setEditingEvent(null);
    
    // Pré-selecionar disciplina e professor se há filtros ativos
    let disciplinaNome = '';
    let professorNome = '';
    
    if (selectedFilterDisciplina) {
      const disciplinaSelecionada = disciplinas.find(d => d.codigo === selectedFilterDisciplina);
      if (disciplinaSelecionada) {
        disciplinaNome = disciplinaSelecionada.nome;
        
        // Se há um professor filtrado ou apenas um disponível
        if (filteredProfessores.length === 1) {
          professorNome = filteredProfessores[0].nome;
        } else if (selectedFilterProfessor) {
          const professorSelecionado = filteredProfessores.find(p => p.codprof === selectedFilterProfessor);
          if (professorSelecionado) {
            professorNome = professorSelecionado.nome;
          }
        }
      }
    }
    
    setEventFormData({
      disciplina: disciplinaNome,
      professor: professorNome,
      date: selectedDate,
      time: '',
      duration: 30,
      description: ''
    });
    
    // Atualizar professores para o modal após definir o form data
    if (selectedFilterDisciplina) {
      handleDisciplinaChange(selectedFilterDisciplina);
    } else {
      setProfessores([]);
    }
    
    setShowEventModal(true);
  };

  // Abrir modal para editar evento
  const handleEditEvent = (event) => {
    const startDate = new Date(event.start.dateTime);
    setEditingEvent(event);
    
    // Extrair disciplina e professor do summary ou description
    const summary = event.summary.replace('ARENA - ', '');
    const disciplinaNome = summary.split(' - ')[0] || summary;
    const professorNome = summary.split(' - ')[1] || '';
    
    setEventFormData({
      disciplina: disciplinaNome,
      professor: professorNome,
      date: startDate.toISOString().split('T')[0],
      time: startDate.toTimeString().slice(0, 5),
      duration: Math.round((new Date(event.end.dateTime) - startDate) / 60000),
      description: event.description || ''
    });
    
    // Carregar professores para a disciplina do evento sendo editado
    const disciplinaEncontrada = disciplinas.find(d => d.nome === disciplinaNome);
    if (disciplinaEncontrada) {
      handleDisciplinaChange(disciplinaEncontrada.codigo);
    } else {
      setProfessores([]);
    }
    
    setShowEventModal(true);
  };

  // Salvar evento (criar ou editar)
  const handleSaveEvent = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!eventFormData.disciplina || !eventFormData.professor || !eventFormData.date || !eventFormData.time) {
        setError('Preencha todos os campos obrigatórios (disciplina, professor, data e horário)');
        return;
      }

      // Validar se há filtro de disciplina com múltiplos professores mas nenhum selecionado
      if (selectedFilterDisciplina && filteredProfessores.length > 1 && !selectedFilterProfessor) {
        setError('Selecione um professor específico quando há múltiplos professores disponíveis para a disciplina');
        return;
      }

      if (editingEvent) {
        // Editar evento existente
        await googleCalendarService.updateEvent(editingEvent.id, eventFormData);
        setSuccess('Evento atualizado com sucesso!');
      } else {
        // Criar novo evento
        await googleCalendarService.createEvent(eventFormData);
        setSuccess('Evento criado com sucesso!');
      }

      setShowEventModal(false);
      await loadEvents();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      setError(error.message || 'Erro ao salvar evento');
    } finally {
      setLoading(false);
    }
  };

  // Deletar evento
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Tem certeza que deseja deletar este evento?')) {
      return;
    }

    try {
      setLoading(true);
      await googleCalendarService.deleteEvent(eventId);
      setSuccess('Evento deletado com sucesso!');
      await loadEvents();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      setError('Erro ao deletar evento');
    } finally {
      setLoading(false);
    }
  };

  // Verificar renovação automática do token
  useEffect(() => {
    if (isGoogleConnected) {
      const checkTokenInterval = setInterval(async () => {
        try {
          await googleCalendarService.autoRenewToken();
        } catch (error) {
          console.error('❌ Erro na renovação automática:', error);
          setIsGoogleConnected(false);
          setError('Sessão expirada. Faça login novamente.');
        }
      }, 2 * 60 * 1000); // Verificar a cada 2 minutos

      return () => clearInterval(checkTokenInterval);
    }
  }, [isGoogleConnected]);

  // Atualizar horários a cada minuto se for o dia atual
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate === today && viewMode !== 'professor') {
      const updateSlotsInterval = setInterval(() => {
        updateTimeSlots();
      }, 60 * 1000); // Atualizar a cada minuto

      return () => clearInterval(updateSlotsInterval);
    }
  }, [selectedDate, viewMode]);

  // Atualizar professores quando disciplina do form mudar
  useEffect(() => {
    if (showEventModal && eventFormData.disciplina) {
      const disciplinaEncontrada = disciplinas.find(d => d.nome === eventFormData.disciplina);
      if (disciplinaEncontrada) {
        const professoresDaDisciplina = disciplinaEncontrada.professores || [];
        const professoresFormatados = professoresDaDisciplina.map(prof => ({
          codprof: prof.codprof,
          nome: formatProfessorName(prof.nome),
          email: prof.email
        }));
        setProfessores(professoresFormatados);
        
        // Se já há um professor selecionado, verificar se ainda está na lista
        if (eventFormData.professor) {
          const professorValido = professoresFormatados.find(p => p.nome === eventFormData.professor);
          if (!professorValido) {
            // Se o professor não é válido para esta disciplina, limpar
            setEventFormData(prev => ({ ...prev, professor: '' }));
          }
        }
      }
    }
  }, [showEventModal, eventFormData.disciplina, disciplinas]);

  // Limpar mensagens após 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <PageContainer>
      {loading && <LoadingOverlay>Carregando...</LoadingOverlay>}
      
      <PageTitle
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Calendar size={32} />
        Agendamentos
      </PageTitle>

      {error && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </ErrorMessage>
      )}

      {success && (
        <SuccessMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {success}
        </SuccessMessage>
      )}

      <ContentContainer>
        <CalendarSection>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <Label>Série</Label>
                <Input
                  type="text"
                  value={userSerie || 'Carregando...'}
                  readOnly
                  style={{ 
                    backgroundColor: '#fff', 
                    cursor: 'not-allowed',
                    opacity: 0.7
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Label>Turma</Label>
                <Input
                  type="text"
                  value={userTurma || 'Carregando...'}
                  readOnly
                  style={{ 
                    backgroundColor: '#fff', 
                    cursor: 'not-allowed',
                    opacity: 0.7
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Label>Data</Label>
                <DateSelector
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            {/* Filtros de Disciplina e Professor */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', padding: '16px', backgroundColor: 'rgba(0, 0, 0, 0.02)', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <div style={{ flex: 1 }}>
                <Label>Modo de Visualização</Label>
                <Select
                  value={viewMode}
                  onChange={(e) => {
                    const newMode = e.target.value;
                    setViewMode(newMode);
                    
                    if (newMode === 'todos' || newMode === 'meus-agendamentos') {
                      // Reset filtros quando mudar para "todos" ou "meus agendamentos"
                      setSelectedFilterDisciplina('');
                      setSelectedFilterProfessor('');
                      setFilteredProfessores([]);
                      setProfessorDisponibilidade(null);
                    }
                    
                    updateTimeSlots();
                  }}
                  disabled={loadingDisponibilidade}
                >
                  <option value="todos">Todos os horários</option>
                  <option value="professor">Filtrar por professor</option>
                  <option value="meus-agendamentos">Meus agendamentos</option>
                </Select>
              </div>
              
              {viewMode === 'professor' && (
                <>
                  <div style={{ flex: 1 }}>
                    <Label>Filtrar por Disciplina</Label>
                    <Select
                      value={selectedFilterDisciplina}
                      onChange={(e) => handleFilterDisciplinaChange(e.target.value)}
                      disabled={loadingDisponibilidade}
                    >
                      <option value="">Selecione uma disciplina</option>
                      {disciplinas.map((disciplina) => (
                        <option key={disciplina.codigo} value={disciplina.codigo}>
                          {disciplina.nome}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                  {selectedFilterDisciplina && (
                    <div style={{ flex: 1 }}>
                      <Label>
                        Professor
                        {loadingDisponibilidade && (
                          <span style={{ marginLeft: '8px', fontSize: '12px', color: '#007bff' }}>
                            Carregando horários...
                          </span>
                        )}
                      </Label>
                  {filteredProfessores.length === 1 ? (
                    // Se há apenas um professor, mostrar como campo não editável clicável
                    <div style={{ position: 'relative' }}>
                      <Input
                        type="text"
                        value={filteredProfessores[0].nome}
                        readOnly
                        onClick={() => handleProfessorInfoClick(filteredProfessores[0])}
                        style={{ 
                          backgroundColor: '#f8f9fa', 
                          cursor: 'pointer',
                          border: '1px solid #007bff',
                          color: '#007bff'
                        }}
                        title="Clique para ver informações do professor"
                      />
                      <Users 
                        size={16} 
                        style={{ 
                          position: 'absolute', 
                          right: '8px', 
                          top: '50%', 
                          transform: 'translateY(-50%)', 
                          color: '#007bff',
                          pointerEvents: 'none'
                        }} 
                      />
                    </div>
                  ) : filteredProfessores.length > 1 ? (
                    // Se há múltiplos professores, mostrar select obrigatório
                    <Select
                      value={selectedFilterProfessor}
                      onChange={(e) => {
                        const professorId = e.target.value;
                        setSelectedFilterProfessor(professorId);
                        if (professorId) {
                          loadProfessorDisponibilidade(professorId, selectedDate);
                        } else {
                          setProfessorDisponibilidade(null);
                        }
                      }}
                      style={{ 
                        borderColor: !selectedFilterProfessor ? '#dc3545' : undefined 
                      }}
                    >
                      <option value="">Selecione um professor *</option>
                      {filteredProfessores.map((professor) => (
                        <option key={professor.codprof} value={professor.codprof}>
                          {professor.nome}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      type="text"
                      value="Nenhum professor encontrado"
                      readOnly
                      style={{ 
                        backgroundColor: '#f8f8f8', 
                        cursor: 'not-allowed',
                        opacity: 0.7
                      }}
                    />
                  )}
                  
                  {/* Botão para ver info do professor quando há múltiplos */}
                  {filteredProfessores.length > 1 && selectedFilterProfessor && (
                    <div style={{ marginTop: '8px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const prof = filteredProfessores.find(p => p.codprof === selectedFilterProfessor);
                          if (prof) handleProfessorInfoClick(prof);
                        }}
                        style={{
                          background: 'none',
                          border: '1px solid #007bff',
                          color: '#007bff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Users size={14} />
                        Ver informações
                      </button>
                    </div>
                  )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Informações sobre disponibilidade do professor */}
            {viewMode === 'professor' && selectedFilterProfessor && professorDisponibilidade && (
              <div style={{ 
                marginBottom: '16px', 
                padding: '12px', 
                backgroundColor: professorDisponibilidade.aceita_agendamentos ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)', 
                border: `1px solid ${professorDisponibilidade.aceita_agendamentos ? '#2ed573' : '#ff4757'}`, 
                borderRadius: '6px',
                fontSize: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Users size={16} />
                  <strong>{professorDisponibilidade.professor_nome}</strong>
                  <span style={{ color: 'var(--text-light)' }}>
                    - {professorDisponibilidade.dia_semana_nome}
                  </span>
                </div>
                
                {professorDisponibilidade.aceita_agendamentos ? (
                  <div style={{ color: '#2ed573' }}>
                    ✅ <strong>{professorDisponibilidade.total_horarios_disponiveis}</strong> horários disponíveis
                    {professorDisponibilidade.agendamentos_existentes > 0 && (
                      <span style={{ marginLeft: '12px', color: 'var(--text-light)' }}>
                        ({professorDisponibilidade.agendamentos_existentes} já agendados)
                      </span>
                    )}
                  </div>
                ) : (
                  <div style={{ color: '#ff4757' }}>
                    ❌ Professor não aceita agendamentos neste dia
                  </div>
                )}
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
              {isGoogleConnected && (
                <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                  {(() => {
                    const userInfo = googleCalendarService.getUserInfo();
                    return userInfo ? `${userInfo.name}` : 'Conectado';
                  })()}
                </div>
              )}
              <GoogleAuthButton onClick={handleGoogleAuth} $connected={isGoogleConnected}>
                <GoogleLogo size={20} />
                {isGoogleConnected ? 'Desconectar' : 'Conectar Google Calendar'}
              </GoogleAuthButton>
            </div>
          </div>

          {isGoogleConnected ? (
            <div>
              <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
                {viewMode === 'professor' && selectedFilterProfessor && professorDisponibilidade ? (
                  `Horários de ${professorDisponibilidade.professor_nome} - ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}`
                ) : viewMode === 'meus-agendamentos' ? (
                  `Meus Agendamentos - ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}`
                ) : (
                  `Horários Disponíveis - ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}`
                )}
              </h3>
              <TimeSlotList
                timeSlots={timeSlots}
                events={events}
                selectedDate={selectedDate}
                onTimeSlotClick={handleTimeSlotClick}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                currentTime={new Date()}
                filteredDisciplina={selectedFilterDisciplina}
                filteredProfessor={selectedFilterProfessor}
                disciplinas={disciplinas}
                professores={filteredProfessores}
                viewMode={viewMode}
              />
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px', 
              color: 'var(--text-light)' 
            }}>
              <Calendar size={64} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
              <h3 style={{ margin: '0 0 12px', color: 'var(--text-primary)' }}>
                Conecte-se ao Google Calendar
              </h3>
              <p style={{ margin: 0 }}>
                Para visualizar e gerenciar seus agendamentos, conecte-se à sua conta do Google Calendar.
              </p>
            </div>
          )}
        </CalendarSection>
      </ContentContainer>

      {isGoogleConnected && (
        <FloatingAddButton onClick={handleNewEvent}>
          <Plus size={24} />
        </FloatingAddButton>
      )}

      {/* Modal de Informações do Professor */}
      {showProfessorModal && selectedProfessorInfo && (
        <Modal onClick={() => setShowProfessorModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <ModalHeader>
              <ModalTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={24} />
                Informações do Professor
              </ModalTitle>
              <CloseButton onClick={() => setShowProfessorModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <div style={{ padding: '20px 0' }}>
              <FormGroup>
                <Label>Nome Completo</Label>
                <Input
                  type="text"
                  value={selectedProfessorInfo.nome}
                  readOnly
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </FormGroup>

              <FormGroup>
                <Label>Código do Professor</Label>
                <Input
                  type="text"
                  value={selectedProfessorInfo.codprof}
                  readOnly
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </FormGroup>

              {selectedProfessorInfo.email && (
                <FormGroup>
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    value={selectedProfessorInfo.email}
                    readOnly
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </FormGroup>
              )}

              {selectedFilterDisciplina && (
                <FormGroup>
                  <Label>Disciplina</Label>
                  <Input
                    type="text"
                    value={disciplinas.find(d => d.codigo === selectedFilterDisciplina)?.nome || ''}
                    readOnly
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </FormGroup>
              )}
            </div>

            <ModalActions>
              <CancelButton onClick={() => setShowProfessorModal(false)}>
                Fechar
              </CancelButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Evento */}
      {showEventModal && (
        <Modal onClick={() => setShowEventModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingEvent ? 'Editar Evento' : 'Novo Evento'}
              </ModalTitle>
              <CloseButton onClick={() => setShowEventModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <FormGroup>
              <Label>Disciplina *</Label>
              <Select
                value={eventFormData.disciplina}
                onChange={(e) => {
                  const disciplinaNome = e.target.value;
                  setEventFormData(prev => ({ ...prev, disciplina: disciplinaNome, professor: '' }));
                  
                  // Encontrar disciplina pelo nome para obter o código
                  const disciplinaEncontrada = disciplinas.find(d => d.nome === disciplinaNome);
                  if (disciplinaEncontrada) {
                    handleDisciplinaChange(disciplinaEncontrada.codigo);
                  } else {
                    setProfessores([]);
                  }
                }}
              >
                <option value="">Selecione uma disciplina</option>
                {disciplinas.map((disciplina) => (
                  <option key={disciplina.codigo} value={disciplina.nome}>
                    {disciplina.nome}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Professor *</Label>
              <Select
                value={eventFormData.professor}
                onChange={(e) => setEventFormData(prev => ({ ...prev, professor: e.target.value }))}
                disabled={professores.length === 0}
              >
                <option value="">
                  {professores.length === 0 ? 'Selecione uma disciplina primeiro' : 'Selecione um professor'}
                </option>
                {professores.map((professor) => (
                  <option key={professor.codprof} value={professor.nome}>
                    {professor.nome}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Data *</Label>
              <Input
                type="date"
                value={eventFormData.date}
                onChange={(e) => setEventFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Horário *</Label>
              <Input
                type="time"
                value={eventFormData.time}
                onChange={(e) => setEventFormData(prev => ({ ...prev, time: e.target.value }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Duração (minutos)</Label>
              <Input
                type="number"
                min="30"
                max="60"
                step="30"
                value={eventFormData.duration}
                onChange={(e) => setEventFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Descrição</Label>
              <TextArea
                rows="3"
                value={eventFormData.description}
                onChange={(e) => setEventFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição opcional do evento..."
              />
            </FormGroup>

            <ModalActions>
              <CancelButton onClick={() => setShowEventModal(false)}>
                Cancelar
              </CancelButton>
              <SaveButton onClick={handleSaveEvent}>
                {editingEvent ? 'Atualizar' : 'Criar'} Evento
              </SaveButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
}

export default Agendamentos;