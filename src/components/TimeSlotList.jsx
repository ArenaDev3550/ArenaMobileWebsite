import React from 'react';
import { Clock, User, Book, Pencil, Trash } from 'phosphor-react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components para o TimeSlotList
const TimeSlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;

  /* Scrollbar customizada */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--card-background);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
    
    &:hover {
      background: var(--primary-color);
    }
  }
`;

const TimeSlotItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: ${props => {
    if (props.$hasEvent) return 'rgba(46, 213, 115, 0.1)';
    if (props.$isPast) return 'rgba(128, 128, 128, 0.1)';
    return 'var(--card-background)';
  }};
  cursor: ${props => props.$isPast || props.$hasEvent ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.$isPast ? 0.6 : 1};
  border-left: ${props => {
    if (props.$hasEvent) return '4px solid #2ed573';
    if (props.$isPast) return '4px solid #ddd';
    return '4px solid transparent';
  }};

  &:hover {
    ${props => !props.$isPast && !props.$hasEvent && `
      background: var(--primary-color);
      color: white;
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      
      .time-text {
        color: white;
      }
      
      .add-icon {
        opacity: 1;
      }
    `}
  }
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 80px;
`;

const TimeText = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: var(--text-primary);
  
  .time-text {
    transition: color 0.3s ease;
  }
`;

const EventInfo = styled.div`
  flex: 1;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EventTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
`;

const EventSubtitle = styled.div`
  font-size: 12px;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EventDuration = styled.span`
  background: rgba(46, 213, 115, 0.2);
  color: #2ed573;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const AddEventHint = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 12px;
  color: inherit;
  
  .add-icon {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const EventActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const ActionButton = styled.button`
  padding: 6px 8px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  transition: all 0.3s ease;
  color: ${props => props.$danger ? '#ff4757' : 'var(--text-primary)'};

  &:hover {
    background: ${props => props.$danger ? 'rgba(255, 71, 87, 0.1)' : 'var(--primary-color)'};
    color: ${props => props.$danger ? '#ff4757' : 'white'};
    border-color: ${props => props.$danger ? '#ff4757' : 'var(--primary-color)'};
  }
`;

const PastIndicator = styled.div`
  margin-left: auto;
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.7;
`;

function TimeSlotList({ 
  timeSlots, 
  events, 
  selectedDate, 
  onTimeSlotClick,
  onEditEvent,
  onDeleteEvent,
  currentTime,
  filteredDisciplina,
  filteredProfessor,
  disciplinas,
  professores,
  viewMode = 'todos'
}) {
  
  // Função para verificar se um horário já passou
  const isTimePast = (time) => {
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate !== today) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = hours * 60 + minutes;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    return slotTime < currentMinutes;
  };

  // Função para encontrar evento em um horário específico
  const getEventForTime = (time) => {
    return events.find(event => {
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      const slotTime = new Date(`${selectedDate}T${time}`);
      
      return slotTime >= eventStart && slotTime < eventEnd;
    });
  };

  // Função para verificar se um evento deve ser exibido baseado nos filtros
  const shouldShowEvent = (event) => {
    if (viewMode === 'meus-agendamentos') {
      // No modo "Meus Agendamentos", mostrar todos os eventos
      return true;
    }
    
    if (viewMode === 'todos') {
      // No modo "Todos", mostrar todos os eventos
      return true;
    }
    
    if (viewMode === 'professor' && !filteredDisciplina) {
      // Se está no modo professor mas não há disciplina selecionada, mostrar todos
      return true;
    }

    // Modo professor com disciplina selecionada - aplicar filtros
    // Extrair disciplina do título do evento
    const eventTitle = event.summary.replace('ARENA - ', '');
    const disciplinaNome = eventTitle.split(' - ')[0];
    const professorNome = eventTitle.split(' - ')[1];

    // Encontrar disciplina correspondente
    const disciplina = disciplinas.find(d => d.nome === disciplinaNome);
    if (!disciplina || disciplina.codigo !== filteredDisciplina) return false;

    // Se há filtro de professor, verificar também
    if (filteredProfessor && professores.length > 1) {
      const professor = professores.find(p => p.codprof === filteredProfessor);
      if (!professor || professor.nome !== professorNome) return false;
    }

    return true;
  };

  // Função para calcular duração do evento
  const getEventDuration = (event) => {
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);
    const durationMs = end - start;
    const minutes = Math.round(durationMs / 60000);
    
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <TimeSlotContainer>
      {timeSlots.map((time, index) => {
        const isPast = isTimePast(time);
        const event = getEventForTime(time);
        const hasEvent = !!event;
        const shouldShowThisEvent = hasEvent ? shouldShowEvent(event) : true;

        // Se há filtros ativos e o evento não deve ser mostrado, não renderizar o slot com evento
        const displayEvent = hasEvent && shouldShowThisEvent ? event : null;
        const showAsAvailable = !isPast && !displayEvent;

        return (
          <TimeSlotItem
            key={time}
            $isPast={isPast}
            $hasEvent={!!displayEvent}
            onClick={() => {
              if (showAsAvailable) {
                onTimeSlotClick(time);
              }
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02, duration: 0.3 }}
          >
            <TimeInfo>
              <Clock size={18} />
              <TimeText className="time-text">{time}</TimeText>
            </TimeInfo>

            {displayEvent ? (
              <EventInfo>
                <EventTitle>
                  {displayEvent.summary}
                </EventTitle>
                <EventSubtitle>
                  <Book size={12} />
                  <span>{displayEvent.description || 'Aula agendada'}</span>
                  <EventDuration>
                    {getEventDuration(displayEvent)}
                  </EventDuration>
                </EventSubtitle>
              </EventInfo>
            ) : isPast ? (
              <PastIndicator>
                Horário passou
              </PastIndicator>
            ) : hasEvent && !shouldShowThisEvent ? (
              <EventInfo>
                <EventTitle style={{ opacity: 0.5, fontStyle: 'italic' }}>
                  {viewMode === 'professor' ? 'Evento oculto pelo filtro' : 'Evento filtrado'}
                </EventTitle>
                <EventSubtitle style={{ opacity: 0.5 }}>
                  <Book size={12} />
                  <span>
                    {viewMode === 'professor' ? 'Altere os filtros para visualizar' : 'Use filtros para focar em eventos específicos'}
                  </span>
                </EventSubtitle>
              </EventInfo>
            ) : viewMode === 'meus-agendamentos' && !hasEvent ? (
              <AddEventHint style={{ opacity: 0.6 }}>
                Nenhum agendamento neste horário
              </AddEventHint>
            ) : (
              <AddEventHint className="add-icon">
                Clique para agendar
                <span style={{ fontSize: '14px' }}>+</span>
              </AddEventHint>
            )}

            {displayEvent && (
              <EventActions>
                <ActionButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditEvent(displayEvent);
                  }}
                >
                  <Pencil size={12} />
                  Editar
                </ActionButton>
                <ActionButton 
                  $danger
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvent(displayEvent.id);
                  }}
                >
                  <Trash size={12} />
                  Excluir
                </ActionButton>
              </EventActions>
            )}
          </TimeSlotItem>
        );
      })}
    </TimeSlotContainer>
  );
}

export default TimeSlotList;