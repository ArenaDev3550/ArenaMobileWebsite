import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBar,
  ArrowLeft,
  BookOpen,
  TrendUp,
  TrendDown,
  Calendar,
  Clock,
  User,
  GraduationCap,
  Star,
  Warning,
  CaretDown,
  CaretRight
} from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingAnimation from '../../components/animations/LoadingAnimation';
import { apiService } from '../../services/apiService';
import {
  PageContainer,
  PageTitle,
  BackButton,
  ContentContainer,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  StudentInfo,
  StudentName,
  StudentDetails,
  DisciplinesContainer,
  DisciplineCard,
  DisciplineHeader,
  DisciplineName,
  DisciplineStatus,
  BimestresContainer,
  BimestreColumn,
  BimestreTitle,
  BimestreGrade,
  GradeLabel,
  GradeValue,
  FinalResultCard,
  MediaFinal,
  StatusBadge,
  EmptyState,
  ErrorMessage,
  LoadingContainer,
  FilterSection,
  FilterSelect,
  SummaryCard,
  ProgressBar,
  ProgressFill,
  ExpandButton,
  CollapsedView,
  ExpandedView
} from './Boletim.styles';

function Boletim({ onBack }) {
  const { user } = useAuth();
  const [bulletin, setBulletin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('todas'); // todas, aprovado, reprovado, recuperacao
  const [expandedDisciplines, setExpandedDisciplines] = useState(new Set());

  useEffect(() => {
    fetchBulletin();
  }, []);

  const fetchBulletin = async () => {
    if (!user?.ra) {
      setError('RA do usuário não encontrado para buscar o boletim');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.getStudentBulletin(
        '2025', // ano letivo
        user.ra
      );

      if (response?.disciplinas) {
        setBulletin(response);
      } else {
        setBulletin(null);
        setError('Boletim não encontrado');
      }
    } catch (err) {
      console.error('Erro ao buscar boletim:', err);
      if (err.message.includes('404')) {
        setError('Boletim não encontrado para este período letivo');
      } else {
        setError('Erro ao carregar boletim. Tente novamente.');
      }
      setBulletin(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 7.0) return '#10B981'; // Verde - Aprovado
    if (grade >= 5.0) return '#F59E0B'; // Amarelo - Recuperação
    return '#EF4444'; // Vermelho - Reprovado
  };

  const getGradeStatus = (mediaFinal) => {
    if (mediaFinal >= 7.0) return { status: 'aprovado', color: '#10B981' };
    if (mediaFinal >= 5.0) return { status: 'recuperacao', color: '#F59E0B' };
    return { status: 'reprovado', color: '#EF4444' };
  };

  const filteredDisciplines = bulletin?.disciplinas?.filter(disciplina => {
    if (filterStatus === 'todas') return true;
    const status = getGradeStatus(disciplina.resultado_final.media_final).status;
    return status === filterStatus;
  }) || [];

  const calculateStats = () => {
    if (!bulletin?.disciplinas) return { aprovadas: 0, recuperacao: 0, reprovadas: 0, mediaGeral: 0 };

    let aprovadas = 0;
    let recuperacao = 0;
    let reprovadas = 0;
    let somaMedias = 0;

    bulletin.disciplinas.forEach(disciplina => {
      const media = disciplina.resultado_final.media_final;
      somaMedias += media;
      
      if (media >= 7.0) aprovadas++;
      else if (media >= 5.0) recuperacao++;
      else reprovadas++;
    });

    return {
      aprovadas,
      recuperacao,
      reprovadas,
      mediaGeral: somaMedias / bulletin.disciplinas.length
    };
  };

  const toggleDisciplineExpansion = (disciplineId) => {
    const newExpanded = new Set(expandedDisciplines);
    if (newExpanded.has(disciplineId)) {
      newExpanded.delete(disciplineId);
    } else {
      newExpanded.add(disciplineId);
    }
    setExpandedDisciplines(newExpanded);
  };

  const stats = calculateStats();

  if (isLoading) {
    return (
      <PageContainer>
        <PageTitle>
          <BackButton onClick={onBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <ChartBar size={32} />
          Boletim Escolar
        </PageTitle>
        <LoadingContainer>
          <LoadingAnimation />
          <p>Carregando boletim...</p>
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
        <ChartBar size={32} />
        Boletim Escolar
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
            {/* Informações do Estudante */}
            {bulletin?.aluno && (
              <StudentInfo>
                <StudentName>
                  <User size={20} />
                  {bulletin.aluno.nome}
                </StudentName>
                <StudentDetails>
                  <span><GraduationCap size={16} /> Turma: {bulletin.aluno.turma}</span>
                  <span><BookOpen size={16} /> RA: {bulletin.aluno.ra}</span>
                  <span><Calendar size={16} /> Ano: {bulletin.consulta.periodo_letivo}</span>
                  <StatusBadge $color="#10B981">{bulletin.aluno.situacao}</StatusBadge>
                </StudentDetails>
              </StudentInfo>
            )}

            {/* Estatísticas */}
            <StatsContainer>
              <StatCard>
                <StatNumber $color="#10B981">{stats.aprovadas}</StatNumber>
                <StatLabel>Média ≥ 7.0</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber $color="#F59E0B">{stats.recuperacao}</StatNumber>
                <StatLabel>Média 5.0 - 6.9</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber $color="#EF4444">{stats.reprovadas}</StatNumber>
                <StatLabel>Média &lt; 5.0</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber $color={getGradeColor(stats.mediaGeral)}>
                  {stats.mediaGeral.toFixed(1)}
                </StatNumber>
                <StatLabel>Média Geral</StatLabel>
              </StatCard>
            </StatsContainer>

            {/* Resumo Visual */}
            <SummaryCard>
              <h3>Progresso Acadêmico</h3>
              <ProgressBar>
                <ProgressFill 
                  $width={`${(stats.aprovadas / bulletin.disciplinas.length) * 100}%`}
                  $color="#10B981"
                />
              </ProgressBar>
              <p>{stats.aprovadas} de {bulletin.disciplinas.length} disciplinas com média ≥ 7.0 
                ({((stats.aprovadas / bulletin.disciplinas.length) * 100).toFixed(1)}%)</p>
            </SummaryCard>

            {/* Filtros */}
            <FilterSection>
              <label>Filtrar por situação:</label>
              <FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="todas">Todas as disciplinas</option>
                <option value="aprovado">Média ≥ 7.0</option>
                <option value="recuperacao">Média 5.0 - 6.9</option>
                <option value="reprovado">Média &lt; 5.0</option>
              </FilterSelect>
            </FilterSection>

            {/* Lista de Disciplinas */}
            {filteredDisciplines.length === 0 ? (
              <EmptyState>
                <BookOpen size={64} />
                <h3>Nenhuma disciplina encontrada</h3>
                <p>Não há disciplinas que correspondam ao filtro selecionado.</p>
              </EmptyState>
            ) : (
              <DisciplinesContainer>
                {filteredDisciplines.map((disciplina, index) => {
                  const status = getGradeStatus(disciplina.resultado_final.media_final);
                  const isExpanded = expandedDisciplines.has(disciplina.id_turma_disciplina);

                  return (
                    <DisciplineCard
                      key={disciplina.id_turma_disciplina}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      $statusColor={status.color}
                    >
                      <DisciplineHeader onClick={() => toggleDisciplineExpansion(disciplina.id_turma_disciplina)}>
                        <div>
                          <DisciplineName>{disciplina.nome}</DisciplineName>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <MediaFinal $color={status.color}>
                            {disciplina.resultado_final.media_final.toFixed(1)}
                          </MediaFinal>
                          <ExpandButton>
                            {isExpanded ? <CaretDown size={20} /> : <CaretRight size={20} />}
                          </ExpandButton>
                        </div>
                      </DisciplineHeader>

                      {!isExpanded ? (
                        <CollapsedView>
                          <span>Média Final: <strong>{disciplina.resultado_final.media_final.toFixed(1)}</strong></span>
                          <span>Clique para ver detalhes dos bimestres</span>
                        </CollapsedView>
                      ) : (
                        <ExpandedView>
                          <BimestresContainer>
                            {/* Primeiro Bimestre */}
                            <BimestreColumn>
                              <BimestreTitle>1º Bimestre</BimestreTitle>
                              {disciplina.primeiro_bimestre && (
                                <>
                                  <BimestreGrade>
                                    <GradeLabel>Prova:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.primeiro_bimestre.prova_10)}>
                                      {disciplina.primeiro_bimestre.prova_10.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  <BimestreGrade>
                                    <GradeLabel>Média:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.primeiro_bimestre.media_bimestral)}>
                                      {disciplina.primeiro_bimestre.media_bimestral.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  {disciplina.primeiro_bimestre.faltas_bimestral > 0 && (
                                    <BimestreGrade>
                                      <GradeLabel>Faltas:</GradeLabel>
                                      <GradeValue $color="#EF4444">
                                        {disciplina.primeiro_bimestre.faltas_bimestral}
                                      </GradeValue>
                                    </BimestreGrade>
                                  )}
                                </>
                              )}
                            </BimestreColumn>

                            {/* Segundo Bimestre */}
                            <BimestreColumn>
                              <BimestreTitle>2º Bimestre</BimestreTitle>
                              {disciplina.segundo_bimestre && (
                                <>
                                  <BimestreGrade>
                                    <GradeLabel>Prova:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.segundo_bimestre.prova_10)}>
                                      {disciplina.segundo_bimestre.prova_10.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  <BimestreGrade>
                                    <GradeLabel>Média:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.segundo_bimestre.media_bimestral)}>
                                      {disciplina.segundo_bimestre.media_bimestral.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  {disciplina.segundo_bimestre.faltas_bimestral > 0 && (
                                    <BimestreGrade>
                                      <GradeLabel>Faltas:</GradeLabel>
                                      <GradeValue $color="#EF4444">
                                        {disciplina.segundo_bimestre.faltas_bimestral}
                                      </GradeValue>
                                    </BimestreGrade>
                                  )}
                                </>
                              )}
                            </BimestreColumn>

                            {/* Terceiro Bimestre */}
                            <BimestreColumn>
                              <BimestreTitle>3º Bimestre</BimestreTitle>
                              {disciplina.terceiro_bimestre && (
                                <>
                                  <BimestreGrade>
                                    <GradeLabel>Prova:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.terceiro_bimestre.prova_10)}>
                                      {disciplina.terceiro_bimestre.prova_10.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  <BimestreGrade>
                                    <GradeLabel>Média:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.terceiro_bimestre.media_bimestral)}>
                                      {disciplina.terceiro_bimestre.media_bimestral.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  {disciplina.terceiro_bimestre.faltas_bimestral > 0 && (
                                    <BimestreGrade>
                                      <GradeLabel>Faltas:</GradeLabel>
                                      <GradeValue $color="#EF4444">
                                        {disciplina.terceiro_bimestre.faltas_bimestral}
                                      </GradeValue>
                                    </BimestreGrade>
                                  )}
                                </>
                              )}
                            </BimestreColumn>

                            {/* Quarto Bimestre */}
                            <BimestreColumn>
                              <BimestreTitle>4º Bimestre</BimestreTitle>
                              {disciplina.quarto_bimestre && (
                                <>
                                  <BimestreGrade>
                                    <GradeLabel>Prova:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.quarto_bimestre.prova_10)}>
                                      {disciplina.quarto_bimestre.prova_10.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  <BimestreGrade>
                                    <GradeLabel>Média:</GradeLabel>
                                    <GradeValue $color={getGradeColor(disciplina.quarto_bimestre.media_bimestral)}>
                                      {disciplina.quarto_bimestre.media_bimestral.toFixed(1)}
                                    </GradeValue>
                                  </BimestreGrade>
                                  {disciplina.quarto_bimestre.faltas_bimestral > 0 && (
                                    <BimestreGrade>
                                      <GradeLabel>Faltas:</GradeLabel>
                                      <GradeValue $color="#EF4444">
                                        {disciplina.quarto_bimestre.faltas_bimestral}
                                      </GradeValue>
                                    </BimestreGrade>
                                  )}
                                </>
                              )}
                            </BimestreColumn>
                          </BimestresContainer>

                          <FinalResultCard>
                            <h4>Resultado Final</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                              <BimestreGrade>
                                <GradeLabel>Média Anual:</GradeLabel>
                                <GradeValue $color={getGradeColor(disciplina.resultado_final.media_anual)}>
                                  {disciplina.resultado_final.media_anual.toFixed(1)}
                                </GradeValue>
                              </BimestreGrade>
                              <BimestreGrade>
                                <GradeLabel>Média Final:</GradeLabel>
                                <GradeValue $color={getGradeColor(disciplina.resultado_final.media_final)}>
                                  {disciplina.resultado_final.media_final.toFixed(1)}
                                </GradeValue>
                              </BimestreGrade>
                              {disciplina.resultado_final.recuperacao_final > 0 && (
                                <BimestreGrade>
                                  <GradeLabel>Recuperação:</GradeLabel>
                                  <GradeValue $color={getGradeColor(disciplina.resultado_final.recuperacao_final)}>
                                    {disciplina.resultado_final.recuperacao_final.toFixed(1)}
                                  </GradeValue>
                                </BimestreGrade>
                              )}
                            </div>
                          </FinalResultCard>
                        </ExpandedView>
                      )}
                    </DisciplineCard>
                  );
                })}
              </DisciplinesContainer>
            )}
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
}

export default Boletim;