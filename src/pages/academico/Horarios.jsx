import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Calendar,
  Warning,
  User,
  BookOpen,
  MapPin
} from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/apiService';
import LoadingAnimation from '../../components/animations/LoadingAnimation';
import {
  PageContainer,
  PageTitle,
  ContentContainer,
  BackButton,
  FilterSection,
  FilterRow,
  FilterSelect,
  TabsContainer,
  TabButton,
  DayContent,
  WeekContainer,
  DayCard,
  DayHeader,
  DayTitle,
  DayInfo,
  ClassesList,
  ClassItem,
  TimeSlot,
  ClassInfo,
  SubjectCode,
  ProfessorName,
  EmptyDay,
  EmptyState,
  ErrorMessage,
  LoadingContainer
} from './Horarios.styles';

function Horarios({ onBack }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Estado para controle da aba selecionada (dia atual por padrão)
  const getCurrentDayOfWeek = () => {
    const today = new Date().getDay();
    // Converter domingo (0) para 7, e ajustar para segunda a sábado (2-7)
    // Segunda = 1 -> 2, Terça = 2 -> 3, ..., Sábado = 6 -> 7, Domingo = 0 -> 7
    if (today === 0) return 7; // Domingo
    return today + 1; // Segunda a Sábado
  };
  
  const [selectedDay, setSelectedDay] = useState(() => {
    const currentDay = getCurrentDayOfWeek();
    console.log('Dia atual detectado:', currentDay, 'Data:', new Date().toLocaleDateString());
    // Se for domingo (7), selecionar segunda-feira (2) por padrão
    return currentDay === 7 ? 2 : currentDay;
  });

  // Opções de anos (últimos 3 anos + atual)
  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 4; i++) {
    yearOptions.push(currentYear - i);
  }

  // Buscar dados dos horários
  const fetchSchedule = async () => {
    if (!user?.turma) {
        setError('Código da turma não encontrado');
        setLoading(false);
        return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await apiService.getWeeklySchedule(selectedYear, user.turma);
      setScheduleData(data);
    } catch (err) {
      console.error('Erro ao buscar horários:', err);
      setError(err.message || 'Erro ao carregar horários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [selectedYear, user]);

  // Garantir que um dia válido esteja selecionado quando os dados chegarem
  useEffect(() => {
    if (scheduleData?.cronograma_semanal) {
      const availableDays = scheduleData.cronograma_semanal
        .filter(day => day.dia_semana >= 2 && day.dia_semana <= 7)
        .map(day => day.dia_semana);
      
      // Se o dia selecionado não está disponível, selecionar o primeiro dia disponível
      if (!availableDays.includes(selectedDay) && availableDays.length > 0) {
        const currentDay = getCurrentDayOfWeek();
        const defaultDay = currentDay === 7 ? 2 : currentDay;
        
        if (availableDays.includes(defaultDay)) {
          setSelectedDay(defaultDay);
        } else {
          setSelectedDay(availableDays[0]);
        }
      }
    }
  }, [scheduleData]);

  // Filtrar apenas dias com aulas (segunda a sábado)
  const weekDays = scheduleData?.cronograma_semanal?.filter(day => day.dia_semana >= 2 && day.dia_semana <= 7) || [];
  
  // Encontrar o dia selecionado
  const selectedDayData = weekDays.find(day => day.dia_semana === selectedDay);

  // Renderizar uma aula
  const renderClass = (aula, index) => {
    return (
      <ClassItem
        key={`${aula.hora_inicial}-${aula.disciplina.codigo}-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <TimeSlot>
          <Clock size={16} />
          {aula.hora_inicial} - {aula.hora_final}
        </TimeSlot>
        
        <ClassInfo>
          <SubjectCode>
            <BookOpen size={16} />
            {aula.disciplina.codigo || 'Disciplina'}
            {aula.disciplina.nome && (
              <span className="subject-name"> - {aula.disciplina.nome}</span>
            )}
          </SubjectCode>
          
          <ProfessorName>
            <User size={16} />
            {aula.professor.nome}
            {aula.agrupamento.multiplos_professores && (
              <div className="multiple-teachers">
                <MapPin size={14} />
                Múltiplos professores
              </div>
            )}
          </ProfessorName>
        </ClassInfo>
      </ClassItem>
    );
  };

  // Renderizar um dia da semana
  const renderDay = (day, index) => {
    const hasClasses = day.aulas && day.aulas.length > 0;

    return (
      <DayCard
        key={day.dia_semana}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        $hasClasses={hasClasses}
      >
        <DayHeader>
          <DayTitle>
            <Calendar size={20} />
            {day.nome_dia}
          </DayTitle>
          <DayInfo>
            <span>{day.nome_abreviado}</span>
            <span className="class-count">
              {day.total_aulas} {day.total_aulas === 1 ? 'aula' : 'aulas'}
            </span>
          </DayInfo>
        </DayHeader>

        {hasClasses ? (
          <ClassesList>
            {day.aulas.map((aula, aulaIndex) => renderClass(aula, aulaIndex))}
          </ClassesList>
        ) : (
          <EmptyDay>
            <Clock size={24} />
            <p>Nenhuma aula neste dia</p>
          </EmptyDay>
        )}
      </DayCard>
    );
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingAnimation />
          <p>Carregando horários...</p>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton onClick={onBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <Clock size={32} />
        Horários
      </PageTitle>

      <ContentContainer>
        <FilterSection>
          <FilterRow>
            <div>
              <label>Ano Letivo:</label>
              <FilterSelect
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </FilterSelect>
            </div>

            {scheduleData && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'end', 
                gap: '16px',
                color: 'var(--text-light)',
                fontSize: '14px'
              }}>
                <div>
                  <strong>Turma:</strong> {scheduleData.turma?.codigo}
                </div>
                <div>
                  <strong>Total de aulas:</strong> {scheduleData.consulta?.total_aulas || 0}
                </div>
              </div>
            )}
          </FilterRow>
        </FilterSection>

        {error && (
          <ErrorMessage>
            <Warning size={20} />
            {error}
          </ErrorMessage>
        )}

        {!error && scheduleData && (
          <>
            {/* Abas dos dias da semana */}
            <TabsContainer>
              {weekDays.map((day) => {
                // Verificar se é hoje usando a mesma lógica
                const today = new Date().getDay();
                const todayAdjusted = today === 0 ? 7 : today + 1;
                const isToday = day.dia_semana === todayAdjusted;
                
                return (
                  <TabButton
                    key={day.dia_semana}
                    $isActive={selectedDay === day.dia_semana}
                    $hasClasses={day.aulas && day.aulas.length > 0}
                    $isToday={isToday}
                    onClick={() => setSelectedDay(day.dia_semana)}
                  >
                    <div className="tab-title">
                      {day.nome_abreviado}
                      {isToday && ' 📍'}
                    </div>
                    <div className="tab-subtitle">
                      {day.total_aulas} {day.total_aulas === 1 ? 'aula' : 'aulas'}
                    </div>
                  </TabButton>
                );
              })}
            </TabsContainer>

            {/* Conteúdo do dia selecionado */}
            <DayContent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              key={selectedDay}
            >
              {selectedDayData ? (
                selectedDayData.aulas && selectedDayData.aulas.length > 0 ? (
                  <>
                    <div style={{
                      marginBottom: '20px',
                      textAlign: 'center',
                      color: 'var(--text-light)',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      📅 {selectedDayData.nome_dia} - {selectedDayData.total_aulas} {selectedDayData.total_aulas === 1 ? 'aula' : 'aulas'}
                    </div>
                    
                    <ClassesList>
                      {selectedDayData.aulas.map((aula, aulaIndex) => renderClass(aula, aulaIndex))}
                    </ClassesList>
                  </>
                ) : (
                  <EmptyDay>
                    <Clock size={48} />
                    <h3>Nenhuma aula neste dia</h3>
                    <p>{selectedDayData.nome_dia} não possui aulas programadas.</p>
                  </EmptyDay>
                )
              ) : (
                <EmptyState>
                  <Clock size={48} />
                  <h3>Dia não encontrado</h3>
                  <p>Não foi possível carregar os dados deste dia.</p>
                </EmptyState>
              )}
            </DayContent>
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
}

export default Horarios;