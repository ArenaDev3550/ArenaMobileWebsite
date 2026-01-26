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

export const FilterSection = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const FilterRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: end;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FilterSelect = styled.select`
  width: 200px;
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 4px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  overflow-x: auto;
  
  /* Scroll suave no mobile */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 4px;
    padding: 2px;
  }
`;

export const TabButton = styled.button`
  flex: 1;
  min-width: 100px;
  background: ${props => props.$isActive ? props.theme.primary : 'transparent'};
  color: ${props => props.$isActive ? 'white' : props.theme.text};
  border: none;
  border-bottom: ${props => props.$isActive ? `3px solid ${props.theme.primary}` : '3px solid transparent'};
  padding: 12px 8px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  position: relative;
  
  .tab-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .tab-subtitle {
    font-size: 11px;
    opacity: 0.8;
    font-weight: 500;
  }
  
  &:hover {
    background: ${props => props.$isActive ? props.theme.primary : props.theme.surface};
    transform: translateY(-1px);
    border-bottom-color: ${props => props.$isActive ? props.theme.primary : props.theme.border};
  }
  
  /* Indicador para dias sem aulas */
  ${props => !props.$hasClasses && !props.$isActive && `
    opacity: 0.6;
    .tab-subtitle {
      color: ${props.theme.textLight};
    }
  `}
  
  /* Destaque para o dia atual */
  ${props => props.$isToday && !props.$isActive && `
    border: 2px solid ${props.theme.primary};
    background: rgba(102, 126, 234, 0.1);
    border-bottom: 3px solid ${props.theme.primary};
  `}

  @media (max-width: 768px) {
    min-width: 80px;
    padding: 10px 6px;
    
    .tab-title {
      font-size: 12px;
    }
    
    .tab-subtitle {
      font-size: 10px;
    }
  }
`;

export const DayContent = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 300px;
`;

export const WeekContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const DayCard = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-height: 200px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  ${props => !props.$hasClasses && `
    opacity: 0.7;
    border-style: dashed;
  `}
`;

export const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.border};
`;

export const DayTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: ${({ theme }) => theme.primary};
  }
`;

export const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 4px;
  font-size: 14px;

  span:first-child {
    color: ${({ theme }) => theme.textLight};
    font-weight: 600;
  }

  .class-count {
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    font-size: 12px;
  }
`;

export const ClassesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ClassItem = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.background};
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const TimeSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;

  svg {
    flex-shrink: 0;
  }
`;

export const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SubjectCode = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};

  svg {
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
  }

  .subject-name {
    font-weight: 400;
    color: ${({ theme }) => theme.textLight};
    font-size: 14px;
  }
`;

export const ProfessorName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.textLight};
  font-weight: 500;

  svg {
    flex-shrink: 0;
  }

  .multiple-teachers {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    font-style: italic;
  }
`;

export const EmptyDay = styled.div`
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
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.textLight};

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
    color: ${({ theme }) => theme.textLight};
    font-size: 16px;
  }
`;