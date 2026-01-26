import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ClipboardText, 
  CaretDown,
  CaretRight,
  Warning,
  CheckCircle,
  Clock,
  X,
  BookOpen
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
  ControlButtons,
  ControlButton,
  SubjectCard,
  SubjectHeader,
  SubjectName,
  SubjectToggle,
  SubjectContent,
  BimesterTabs,
  BimesterTab,
  GradesGrid,
  GradeItem,
  GradeLabel,
  GradeValue,
  SummaryCard,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  EmptyState,
  ErrorMessage,
  LoadingContainer
} from './Avaliacoes.styles';

function Avaliacoes({ onBack }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gradesData, setGradesData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedBimester, setSelectedBimester] = useState('todos');
  const [selectedSubject, setSelectedSubject] = useState('todas');
  const [expandedSubjects, setExpandedSubjects] = useState(new Set()); // Estado para controlar accordion

  // Opções de anos (últimos 3 anos + atual)
  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 4; i++) {
    yearOptions.push(currentYear - i);
  }

  const bimesterOptions = [
    { value: 'todos', label: 'Todos os Bimestres' },
    { value: '1', label: '1º Bimestre' },
    { value: '2', label: '2º Bimestre' },
    { value: '3', label: '3º Bimestre' },
    { value: '4', label: '4º Bimestre' }
  ];

  // Função para alternar expansão de uma matéria
  const toggleSubjectExpansion = (subjectName) => {
    setExpandedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subjectName)) {
        newSet.delete(subjectName);
      } else {
        newSet.add(subjectName);
      }
      return newSet;
    });
  };

  // Expandir todas as matérias
  const expandAllSubjects = () => {
    const allSubjectNames = filteredSubjects.map(subject => subject.nome);
    setExpandedSubjects(new Set(allSubjectNames));
  };

  // Recolher todas as matérias
  const collapseAllSubjects = () => {
    setExpandedSubjects(new Set());
  };

  // Verificar se uma matéria tem pelo menos uma nota
  const hasAnyGrades = (subject) => {
    const bimesterKeys = ['primeiro_bimestre', 'segundo_bimestre', 'terceiro_bimestre', 'quarto_bimestre'];
    
    for (const bimesterKey of bimesterKeys) {
      const bimester = subject[bimesterKey];
      if (bimester) {
        // Verificar se há provas com notas
        if (bimester.provas) {
          const hasProvas = Object.values(bimester.provas).some(nota => nota !== null && nota !== undefined);
          if (hasProvas) return true;
        }
        
        // Verificar se há média bimestral
        if (bimester.media_bimestral !== null && bimester.media_bimestral !== undefined) {
          return true;
        }
        
        // Verificar se há recuperação
        if (bimester.recuperacao_bimestral !== null && bimester.recuperacao_bimestral !== undefined) {
          return true;
        }
      }
    }
    
    // Verificar resultado final
    if (subject.resultado_final) {
      if (subject.resultado_final.media_anual !== null && subject.resultado_final.media_anual !== undefined) {
        return true;
      }
      if (subject.resultado_final.media_final !== null && subject.resultado_final.media_final !== undefined) {
        return true;
      }
    }
    
    return false;
  };

  // Buscar dados das avaliações
  const fetchGrades = async () => {
    if (!user?.id || !user?.turma) {
      setError('Dados do usuário incompletos');
      console.log(user)
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await apiService.getStudentGrades(selectedYear, user.turma, user.id);
      setGradesData(data);
    } catch (err) {
      console.error('Erro ao buscar avaliações:', err);
      setError(err.message || 'Erro ao carregar avaliações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, [selectedYear, user]);

  // Filtrar disciplinas
  const filteredSubjects = gradesData?.disciplinas?.filter(subject => {
    // Filtrar por matéria selecionada
    if (selectedSubject !== 'todas' && subject.nome !== selectedSubject) {
      return false;
    }
    
    // Ocultar matérias sem notas
    if (!hasAnyGrades(subject)) {
      return false;
    }
    
    return true;
  }) || [];

  // Obter lista de matérias para o filtro (apenas as que têm notas)
  const subjectOptions = [
    { value: 'todas', label: 'Todas as Matérias' },
    ...(gradesData?.disciplinas?.filter(subject => hasAnyGrades(subject)).map(subject => ({
      value: subject.nome,
      label: subject.nome
    })) || [])
  ];

  // Renderizar notas de um bimestre
  const renderBimesterGrades = (bimesterData, bimesterNumber) => {
    if (!bimesterData) return null;

    const { provas, media_bimestral, faltas_bimestral, recuperacao_bimestral } = bimesterData;
    
    return (
      <motion.div
        key={bimesterNumber}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GradesGrid>
          {Object.entries(provas || {}).map(([prova, nota]) => {
            if (nota === null) return null;
            
            return (
              <GradeItem key={prova} $hasGrade={nota !== null}>
                <GradeLabel>{prova.toUpperCase()}</GradeLabel>
                <GradeValue $grade={nota}>
                  {typeof nota === 'number' ? nota.toFixed(1) : '-'}
                </GradeValue>
              </GradeItem>
            );
          })}
        </GradesGrid>

        <SummaryCard>
          <SummaryRow>
            <SummaryLabel>Média Bimestral:</SummaryLabel>
            <SummaryValue $grade={media_bimestral}>
              {media_bimestral !== null ? media_bimestral.toFixed(1) : '-'}
            </SummaryValue>
          </SummaryRow>
          
          {faltas_bimestral !== null && (
            <SummaryRow>
              <SummaryLabel>Faltas:</SummaryLabel>
              <SummaryValue>{faltas_bimestral}</SummaryValue>
            </SummaryRow>
          )}

          {recuperacao_bimestral !== null && (
            <SummaryRow>
              <SummaryLabel>Recuperação:</SummaryLabel>
              <SummaryValue $grade={recuperacao_bimestral}>
                {recuperacao_bimestral?.toFixed(1)}
              </SummaryValue>
            </SummaryRow>
          )}
        </SummaryCard>
      </motion.div>
    );
  };

  // Renderizar uma disciplina
  const renderSubject = (subject, index) => {
    const bimesterKeys = ['primeiro_bimestre', 'segundo_bimestre', 'terceiro_bimestre', 'quarto_bimestre'];
    const bimesterNames = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];
    const isExpanded = expandedSubjects.has(subject.nome);
    
    return (
      <SubjectCard
        key={subject.nome}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <SubjectHeader>
          <SubjectToggle 
            onClick={() => toggleSubjectExpansion(subject.nome)}
            $isExpanded={isExpanded}
          >
            <SubjectName>
              <BookOpen size={20} />
              {subject.nome}
            </SubjectName>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <CaretRight size={20} />
            </motion.div>
          </SubjectToggle>
        </SubjectHeader>

        <SubjectContent
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          style={{ overflow: "hidden" }}
        >
          <div style={{ padding: isExpanded ? "16px 0" : "0" }}>
            <BimesterTabs>
              {bimesterNames.map((name, bimIndex) => {
                const key = bimesterKeys[bimIndex];
                const bimesterNumber = bimIndex + 1;
                
                // Pular se o filtro de bimestre específico não corresponder
                if (selectedBimester !== 'todos' && parseInt(selectedBimester) !== bimesterNumber) {
                  return null;
                }

                return (
                  <BimesterTab key={key}>
                    <h4>{name}</h4>
                    {renderBimesterGrades(subject[key], bimesterNumber)}
                  </BimesterTab>
                );
              })}
            </BimesterTabs>

            {/* Resultado Final */}
            {subject.resultado_final && (
              <SummaryCard>
                <h4>Resultado Final</h4>
                <SummaryRow>
                  <SummaryLabel>Média Anual:</SummaryLabel>
                  <SummaryValue $grade={subject.resultado_final.media_anual}>
                    {subject.resultado_final.media_anual !== null 
                      ? subject.resultado_final.media_anual.toFixed(1) 
                      : '-'
                    }
                  </SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Média Final:</SummaryLabel>
                  <SummaryValue $grade={subject.resultado_final.media_final}>
                    {subject.resultado_final.media_final !== null 
                      ? subject.resultado_final.media_final.toFixed(1) 
                      : '-'
                    }
                  </SummaryValue>
                </SummaryRow>
              </SummaryCard>
            )}
          </div>
        </SubjectContent>
      </SubjectCard>
    );
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingAnimation />
          <p>Carregando avaliações...</p>
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
        <ClipboardText size={32} />
        Avaliações
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

            <div>
              <label>Bimestre:</label>
              <FilterSelect
                value={selectedBimester}
                onChange={(e) => setSelectedBimester(e.target.value)}
              >
                {bimesterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FilterSelect>
            </div>

            <div>
              <label>Matéria:</label>
              <FilterSelect
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FilterSelect>
            </div>
          </FilterRow>

          <ControlButtons>
            <div style={{ 
              fontSize: '14px', 
              color: 'var(--text-light)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}>
              📊 Exibindo {filteredSubjects.length} de {gradesData?.disciplinas?.length || 0} matérias
              {gradesData?.disciplinas && (
                <span style={{ fontSize: '12px' }}>
                  ({gradesData.disciplinas.length - filteredSubjects.length} sem notas)
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <ControlButton onClick={expandAllSubjects}>
                <CaretDown size={16} />
                Expandir Todas
              </ControlButton>
              <ControlButton className="secondary" onClick={collapseAllSubjects}>
                <CaretRight size={16} />
                Recolher Todas
              </ControlButton>
            </div>
          </ControlButtons>
        </FilterSection>

        {error && (
          <ErrorMessage>
            <Warning size={20} />
            {error}
          </ErrorMessage>
        )}

        {!error && gradesData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => renderSubject(subject, index))
            ) : (
              <EmptyState>
                <ClipboardText size={48} />
                <h3>Nenhuma avaliação encontrada</h3>
                <p>
                  {gradesData?.disciplinas?.length > 0 
                    ? 'Não há avaliações com notas para os filtros selecionados.'
                    : 'Não há avaliações disponíveis para este período.'
                  }
                </p>
                {gradesData?.disciplinas?.length > 0 && filteredSubjects.length === 0 && (
                  <p style={{ fontSize: '14px', marginTop: '8px', opacity: 0.7 }}>
                    💡 Dica: As matérias sem notas foram ocultadas automaticamente
                  </p>
                )}
              </EmptyState>
            )}
          </motion.div>
        )}
      </ContentContainer>
    </PageContainer>
  );
}

export default Avaliacoes;