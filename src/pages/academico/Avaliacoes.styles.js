import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 100vh;
  background: ${({ theme }) => theme.surface};
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
    background: var(--bg-secondary);
    transform: translateX(-2px);
  }
`;

export const ContentContainer = styled(motion.div)`
  background: var(--bg-secondary);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.text};
`;

export const FilterSection = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid var(--border-light);
`;

export const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

export const ControlButton = styled.button`
  background: var(--primary);
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &.secondary {
    background: var(--bg-secondary);
    color: ${({ theme }) => theme.text};
    border: 1px solid var(--border-light);

    &:hover {
      background: var(--bg-disabled);
    }
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  option {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;

export const SubjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid var(--border-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

export const SubjectHeader = styled.div`
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
`;

export const SubjectToggle = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }

  svg:last-child {
    color: ${({ theme }) => theme.text};
    transition: all 0.2s ease;
  }

  &:hover svg:last-child {
    color: ${({ theme }) => theme.text};
  }
`;

export const SubjectName = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--primary);
  }
`;

export const SubjectContent = styled(motion.div)`
  overflow: hidden;
`;

export const BimesterTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BimesterTab = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-light);

  h4 {
    color: var(--text-primary);
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 16px 0;
    text-align: center;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-light);
  }
`;

export const GradesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

export const GradeItem = styled.div`
  background: ${props => props.$hasGrade ? 'var(--bg-primary)' : 'var(--bg-disabled)'};
  border-radius: 8px;
  padding: 12px 8px;
  text-align: center;
  border: 1px solid var(--border-light);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const GradeLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const GradeValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${props => {
    if (props.$grade === null || props.$grade === undefined) return 'var(--text-light)';
    if (props.$grade >= 7) return '#22c55e'; // Verde para notas boas
    if (props.$grade >= 5) return '#f59e0b'; // Amarelo para notas médias
    return '#ef4444'; // Vermelho para notas baixas
  }};
`;

export const SummaryCard = styled.div`
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-light);
  margin-top: 16px;

  h4 {
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 12px 0;
    text-align: center;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SummaryLabel = styled.span`
  font-size: 14px;
  color: var(--text-light);
  font-weight: 500;
`;

export const SummaryValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${props => {
    if (props.$grade === null || props.$grade === undefined) return 'var(--text-light)';
    if (props.$grade >= 7) return '#22c55e';
    if (props.$grade >= 5) return '#f59e0b';
    return '#ef4444';
  }};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);

  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--text-primary);
  }

  p {
    font-size: 14px;
    margin: 0;
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
    color: var(--text-light);
    font-size: 16px;
  }
`;