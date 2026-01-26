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

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
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
  color: ${({ theme }) => theme.primary};
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

export const FilterSection = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.border};

  h3 {
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: 600;
  }
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
    gap: 12px;
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
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
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 12px 16px;
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

  &::placeholder {
    color: ${({ theme }) => theme.textLight};
  }
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

export const OccurrencesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OccurrenceCard = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  border-left: 4px solid ${props => props.$groupColor};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const OccurrenceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const OccurrenceDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const OccurrenceId = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textLight};
  font-weight: 500;
`;

export const OccurrenceGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$color};
  margin-bottom: 8px;
  padding: 8px 12px;
  background: ${props => `${props.$color}15`};
  border-radius: 8px;
  border: 1px solid ${props => `${props.$color}30`};
`;

export const OccurrenceType = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
`;

export const OccurrenceDiscipline = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
  padding: 6px 12px;
  background: ${({ theme }) => `${theme.primary}15`};
  border-radius: 6px;
  display: inline-flex;
  width: fit-content;
`;

export const OccurrenceContent = styled.div`
  margin: 12px 0;
`;

export const OccurrenceDescription = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
  white-space: pre-wrap;
`;

export const OccurrenceFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const OccurrenceUser = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.textLight};
  font-weight: 500;
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