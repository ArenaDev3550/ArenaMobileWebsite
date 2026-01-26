import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
`;

export const PageTitle = styled(motion.h1)`
  color: ${({ theme }) => theme.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ProfileCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    text-align: left;
  }
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.spacing.lg};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const UserName = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
`;
export const UserInfoContent = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
`;

export const UserEmail = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 1.1rem;
  margin: 0;
`;

export const ConfigSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FieldLabel = styled.label`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FieldValue = styled.div`
  color: ${({ theme }) => theme.textLight};
  font-size: 1.1rem;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.backgroundText};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.border};
`;

export const PasswordField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.backgroundText};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.border};
`;

export const PasswordText = styled.span`
  color: ${({ theme }) => theme.textLight};
  font-size: 1.1rem;
`;

export const ChangePasswordButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.textDark};
  border: 1px solid ${({ theme }) => theme.textDark};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.textLightH};
    color: ${({ theme }) => theme.textDarkH};
  }
`;

export const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const LogoutButton = styled.button`
  background: ${({ theme }) => theme.error};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.error}dd;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1.5rem;
  text-align: center;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const CancelButton = styled.button`
  flex: 1;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  background: ${({ theme }) => theme.error};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${({ theme }) => theme.error}dd;
  }
`;