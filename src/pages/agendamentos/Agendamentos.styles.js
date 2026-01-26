import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  padding: 20px;
`;

export const PageTitle = styled(motion.h1)`
  color: var(--text-primary);
  font-size: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ContentContainer = styled.div`
  display: grid;
  gap: 24px;
`;

export const CalendarSection = styled.div`
  background: var(--card-background);
  padding: 24px;
  border-radius: 16px;
`;

export const DateSelector = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;

export const GoogleAuthButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: ${props => props.$connected ? '#dc3545' : '#4285f4'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
`;

export const TimeSlot = styled.div`
  padding: 12px 8px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: ${props => props.$occupied ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  background: ${props => props.$occupied ? 'rgba(255, 71, 87, 0.1)' : 'var(--card-background)'};
  color: ${props => props.$occupied ? '#ff4757' : 'var(--text-primary)'};
  transition: all 0.3s ease;

  &:hover {
    ${props => !props.$occupied && `
      background: var(--primary-color);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `}
  }
`;

export const EventsSection = styled.div`
  background: var(--card-background);
  padding: 24px;
  border-radius: 16px;
`;

export const EventCard = styled.div`
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const EventTitle = styled.h4`
  margin: 0;
  color: var(--text-primary);
`;

export const EventTime = styled.div`
  color: var(--text-light);
  font-size: 14px;
`;

export const EventDescription = styled.p`
  color: var(--text-light);
  font-size: 14px;
`;

export const EventActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  transition: all 0.3s ease;
  color: ${props => props.$danger ? '#ff4757' : 'var(--text-primary)'};

  &:hover {
    background: ${props => props.$danger ? 'rgba(255, 71, 87, 0.1)' : 'var(--primary-color)'};
    color: ${props => props.$danger ? '#ff4757' : 'white'};
    border-color: ${props => props.$danger ? '#ff4757' : 'var(--primary-color)'};
  }
`;

export const FloatingAddButton = styled.button`
  position: fixed;
  bottom: 44px;
  right: 24px;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: var(--card-background);
  padding: 24px;
  border-radius: 16px;
  width: 500px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: var(--text-primary);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const SuccessMessage = styled.div`
  background: rgba(46, 213, 115, 0.1);
  color: #2ed573;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
