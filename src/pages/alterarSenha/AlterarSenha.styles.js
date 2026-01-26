import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: var(--background);
`;

export const PageHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PageTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
`;

export const FormCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.backgroundText};
  border-radius: 12px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px 50px 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#ff4757' : 'var(--border-color)'};
  border-radius: 12px;
  background: var(--input-background);
  color: var(--text-primary);
  font-size: 16px;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--text-light);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ff4757' : 'var(--primary-color)'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(255, 71, 87, 0.1)' : 'rgba(74, 144, 226, 0.1)'};
  }

  &:disabled {
    background: var(--disabled-background);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary);
  }

  &:focus {
    outline: none;
    color: var(--primary-color);
  }
`;

export const ErrorMessage = styled(motion.div)`
  color: #ff4757;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

export const SuccessMessage = styled(motion.div)`
  color: #2ed573;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(46, 213, 115, 0.1);
  border: 1px solid rgba(46, 213, 115, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const PasswordStrength = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  color: var(--text-primary);
`;

export const StrengthBar = styled.div`
  width: 100%;
  height: 4px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => (props.$strength / 5) * 100}%;
    background: ${props => props.$color};
    transition: all 0.3s ease;
    border-radius: 2px;
  }
`;

export const StrengthText = styled.span`
  font-size: 12px;
  color: ${props => props.$color};
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 48px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: transparent;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--text-light);
    background: var(--hover-background);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: var(--disabled-background);
    cursor: not-allowed;
    transform: none;
  }
`;