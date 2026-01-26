import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const PageTitle = styled(motion.h1)`
  color: ${({ theme }) => theme.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 2rem;
`;

export const ContentContainer = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.text};
  overflow-y: auto;
  max-height: 600px;

  /* Os estilos específicos do EducaMobile agora vêm do arquivo CSS dedicado */
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background: ${({ theme }) => `${theme.error}11`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

// Styled Components para o menu acadêmico
export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 32px;
  padding: 20px 0;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 16px;
  }
`;

export const MenuButton = styled(motion.button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, ${props => props.$gradient});
  color: white;
  cursor: pointer;
  padding: 16px;
  transition: all 0.05s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    padding: 14px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    padding: 12px;
    border-radius: 12px;
  }
`;

export const MenuItemContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    
  }
`;

export const ButtonLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  color: ${({ theme }) => theme.text};
  margin-top: 4px;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const WelcomeText = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SubtitleText = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 16px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ComingSoonBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: rgba(255, 255, 255, 0.95);
  color: #666;
  font-size: 9px;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;

  @media (max-width: 768px) {
    top: -6px;
    right: -6px;
    font-size: 8px;
    padding: 2px 5px;
  }
`;