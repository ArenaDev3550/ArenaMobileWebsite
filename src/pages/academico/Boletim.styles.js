import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
`;

export const PageTitle = styled(motion.h1)`
  color: ${({ theme }) => theme.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.surface};
    transform: translateX(-2px);
  }
`;

export const ContentContainer = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.text};
`;

export const StudentInfo = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const StudentName = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StudentDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.textLight};
    font-weight: 500;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const StatusBadge = styled.span`
  background: ${props => `${props.$color}20`};
  color: ${props => props.$color};
  border: 1px solid ${props => `${props.$color}40`};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.$color || props.theme.primary};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textLight};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const SummaryCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}15, ${({ theme }) => theme.primary}05);
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;

  h3 {
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin: 12px 0 0 0;
    font-size: 14px;
    color: ${({ theme }) => theme.textLight};
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.border};
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$width};
  background: ${props => props.$color};
  border-radius: 6px;
  transition: width 0.8s ease;
`;

export const FilterSection = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  gap: 16px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const FilterSelect = styled.select`
  flex: 1;
  max-width: 300px;
  padding: 10px 14px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  option {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 768px) {
    max-width: none;
  }
`;

export const DisciplinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DisciplineCard = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-left: 4px solid ${props => props.$statusColor};
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const DisciplineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.surface};
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const DisciplineName = styled.h3`
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const DisciplineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${props => props.$color};
  font-size: 14px;
  font-weight: 600;
`;

export const MediaFinal = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.$color};
  padding: 8px 16px;
  background: ${props => `${props.$color}15`};
  border-radius: 8px;
  border: 1px solid ${props => `${props.$color}30`};

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 6px 12px;
  }
`;

export const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textLight};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
  }
`;

export const CollapsedView = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textLight};
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 0 16px 16px 16px;
  }
`;

export const ExpandedView = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
`;

export const BimestresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const BimestreColumn = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const BimestreTitle = styled.h4`
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const BimestreGrade = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const GradeLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textLight};
  font-weight: 500;
`;

export const GradeValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$color};
  padding: 2px 8px;
  background: ${props => `${props.$color}15`};
  border-radius: 4px;
`;

export const FinalResultCard = styled.div`
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 20px;

  h4 {
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.textLight};
  text-align: center;

  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text};
  }

  p {
    margin: 0;
    font-size: 14px;
    max-width: 400px;
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(239, 68, 68, 0.2);

  svg {
    flex-shrink: 0;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  
  p {
    margin-top: 16px;
    color: ${({ theme }) => theme.textLight};
    font-size: 16px;
  }
`;