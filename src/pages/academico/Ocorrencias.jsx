import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Warning,
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  FileText,
  ClockCounterClockwise,
  UserCircle,
  MagnifyingGlass,
  Funnel,
  X
} from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingAnimation from '../../components/animations/LoadingAnimation';
import { apiService } from '../../services/apiService';
import {
  PageContainer,
  PageTitle,
  BackButton,
  ContentContainer,
  FilterSection,
  FilterRow,
  FilterSelect,
  FilterInput,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  OccurrencesList,
  OccurrenceCard,
  OccurrenceHeader,
  OccurrenceDate,
  OccurrenceType,
  OccurrenceGroup,
  OccurrenceContent,
  OccurrenceDiscipline,
  OccurrenceDescription,
  OccurrenceFooter,
  OccurrenceUser,
  OccurrenceId,
  EmptyState,
  ErrorMessage,
  LoadingContainer,
  FilterButtons,
  FilterButton
} from './Ocorrencias.styles';

function Ocorrencias({ onBack }) {
  const { user } = useAuth();
  const [occurrences, setOccurrences] = useState([]);
  const [filteredOccurrences, setFilteredOccurrences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Filtros
  const [dateRange, setDateRange] = useState({
    start: '01/01/2025',
    end: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  });
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchText, setSearchText] = useState('');

  // Obter grupos e tipos únicos para filtros
  const uniqueGroups = [...new Set(occurrences.map(occ => occ.grupo_ocorrencia.descricao))];
  const uniqueTypes = [...new Set(occurrences.map(occ => occ.tipo_ocorrencia.descricao))];

  useEffect(() => {
    fetchOccurrences();
  }, [dateRange]);

  useEffect(() => {
    applyFilters();
  }, [occurrences, selectedGroup, selectedType, searchText]);

  const fetchOccurrences = async () => {
    if (!user?.ra || !user?.turma) {
      setError('Dados do usuário incompletos para buscar ocorrências');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.getStudentOccurrences(
        '2025', // ano letivo
        user.turma,
        user.ra,
        dateRange.start,
        dateRange.end
      );

      if (response?.ocorrencias) {
        const sortedOccurrences = response.ocorrencias
          .filter(occ => occ.disponivel_pais) // Apenas ocorrências disponíveis para os pais
          .sort((a, b) => new Date(b.data_ocorrencia) - new Date(a.data_ocorrencia));

        setOccurrences(sortedOccurrences);
        setStats(response.consulta);
      } else {
        setOccurrences([]);
        setStats(null);
      }
    } catch (err) {
      console.error('Erro ao buscar ocorrências:', err);
      if (err.message.includes('404')) {
        setError('Nenhuma ocorrência encontrada para o período selecionado');
        setOccurrences([]);
      } else {
        setError('Erro ao carregar ocorrências. Tente novamente.');
      }
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...occurrences];

    // Filtro por grupo
    if (selectedGroup) {
      filtered = filtered.filter(occ => occ.grupo_ocorrencia.descricao === selectedGroup);
    }

    // Filtro por tipo
    if (selectedType) {
      filtered = filtered.filter(occ => occ.tipo_ocorrencia.descricao === selectedType);
    }

    // Filtro por texto (observações, disciplina)
    if (searchText) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(occ => 
        occ.observacoes.toLowerCase().includes(search) ||
        occ.disciplina.toLowerCase().includes(search) ||
        occ.tipo_ocorrencia.descricao.toLowerCase().includes(search)
      );
    }

    setFilteredOccurrences(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getGroupColor = (groupCode) => {
    const colors = {
      19: '#3B82F6', // AEE - Azul
      31: '#EF4444', // PROFESSOR - Vermelho
      30: '#F59E0B', // COORDENAÇÃO - Amarelo
      20: '#10B981', // DIREÇÃO - Verde
      default: '#6B7280' // Cinza
    };
    return colors[groupCode] || colors.default;
  };

  const clearFilters = () => {
    setSelectedGroup('');
    setSelectedType('');
    setSearchText('');
  };

  if (isLoading) {
    return (
      <PageContainer>
        <PageTitle>
          <BackButton onClick={onBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <Warning size={32} />
          Ocorrências Acadêmicas
        </PageTitle>
        <LoadingContainer>
          <LoadingAnimation />
          <p>Carregando ocorrências...</p>
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
        <Warning size={32} />
        Ocorrências Acadêmicas
      </PageTitle>

      <ContentContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {error ? (
          <ErrorMessage>
            <Warning size={20} />
            {error}
          </ErrorMessage>
        ) : (
          <>
            {/* Estatísticas */}
            {stats && (
              <StatsContainer>
                <StatCard>
                  <StatNumber>{stats.total_ocorrencias || filteredOccurrences.length}</StatNumber>
                  <StatLabel>Total de Ocorrências</StatLabel>
                </StatCard>
                <StatCard>
                  <StatNumber>{filteredOccurrences.length}</StatNumber>
                  <StatLabel>Ocorrências Filtradas</StatLabel>
                </StatCard>
                <StatCard>
                  <StatNumber>{uniqueGroups.length}</StatNumber>
                  <StatLabel>Grupos Diferentes</StatLabel>
                </StatCard>
              </StatsContainer>
            )}

            {/* Filtros */}
            <FilterSection>
              <h3>Filtros</h3>
              
              <FilterRow>
                <div>
                  <label>Data Inicial</label>
                  <FilterInput
                    type="date"
                    value={dateRange.start.split('/').reverse().join('-')}
                    onChange={(e) => {
                      const [year, month, day] = e.target.value.split('-');
                      setDateRange(prev => ({ ...prev, start: `${day}/${month}/${year}` }));
                    }}
                  />
                </div>
                
                <div>
                  <label>Data Final</label>
                  <FilterInput
                    type="date"
                    value={dateRange.end.split('/').reverse().join('-')}
                    onChange={(e) => {
                      const [year, month, day] = e.target.value.split('-');
                      setDateRange(prev => ({ ...prev, end: `${day}/${month}/${year}` }));
                    }}
                  />
                </div>
              </FilterRow>

              <FilterRow>
                <div>
                  <label>Grupo</label>
                  <FilterSelect
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <option value="">Todos os grupos</option>
                    {uniqueGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </FilterSelect>
                </div>

                <div>
                  <label>Tipo</label>
                  <FilterSelect
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Todos os tipos</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </FilterSelect>
                </div>
              </FilterRow>

              <FilterRow>
                <div style={{ flex: 1 }}>
                  <label>Buscar em observações/disciplina</label>
                  <FilterInput
                    type="text"
                    placeholder="Digite para buscar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </FilterRow>

              <FilterButtons>
                <FilterButton onClick={clearFilters}>
                  <X size={16} />
                  Limpar Filtros
                </FilterButton>
              </FilterButtons>
            </FilterSection>

            {/* Lista de Ocorrências */}
            {filteredOccurrences.length === 0 ? (
              <EmptyState>
                <Warning size={64} />
                <h3>Nenhuma ocorrência encontrada</h3>
                <p>
                  {occurrences.length === 0 
                    ? 'Não há ocorrências registradas para este período.'
                    : 'Nenhuma ocorrência corresponde aos filtros aplicados.'}
                </p>
              </EmptyState>
            ) : (
              <OccurrencesList>
                {filteredOccurrences.map((occurrence, index) => (
                  <OccurrenceCard
                    key={occurrence.id_ocorrencia}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    $groupColor={getGroupColor(occurrence.grupo_ocorrencia.codigo)}
                  >
                    <OccurrenceHeader>
                      <OccurrenceDate>
                        <Calendar size={16} />
                        {formatDate(occurrence.data_ocorrencia)}
                      </OccurrenceDate>
                      <OccurrenceId>#{occurrence.id_ocorrencia}</OccurrenceId>
                    </OccurrenceHeader>

                    <OccurrenceGroup $color={getGroupColor(occurrence.grupo_ocorrencia.codigo)}>
                      <User size={16} />
                      {occurrence.grupo_ocorrencia.descricao}
                    </OccurrenceGroup>

                    <OccurrenceType>
                      <FileText size={16} />
                      {occurrence.tipo_ocorrencia.descricao}
                    </OccurrenceType>

                    {occurrence.disciplina && (
                      <OccurrenceDiscipline>
                        <BookOpen size={16} />
                        {occurrence.disciplina}
                      </OccurrenceDiscipline>
                    )}

                    {occurrence.observacoes && (
                      <OccurrenceContent>
                        <OccurrenceDescription>
                          {occurrence.observacoes}
                        </OccurrenceDescription>
                      </OccurrenceContent>
                    )}

                    <OccurrenceFooter>
                      <OccurrenceUser>
                        <UserCircle size={14} />
                        {occurrence.usuario_cadastro}
                      </OccurrenceUser>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        <ClockCounterClockwise size={14} />
                        Alterado em {occurrence.data_alteracao}
                      </div>
                    </OccurrenceFooter>
                  </OccurrenceCard>
                ))}
              </OccurrencesList>
            )}
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
}

export default Ocorrencias;