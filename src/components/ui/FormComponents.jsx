import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme, variant }) =>
    variant === 'outline' ? 'transparent' : theme.primary};
  color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.primary : 'white'};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'outline' ? theme.primary : theme.accent};
    color: white;
    border-color: ${({ theme, variant }) =>
      variant === 'outline' ? theme.primary : theme.accent};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textLight};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-weight: 600;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.error};
  font-size: 0.85rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;