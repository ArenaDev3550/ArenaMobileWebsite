import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LoginContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const LoginCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Logo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  img {
    max-width: 150px;
    height: auto;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 2rem;
`;

export const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};