import styled from "styled-components";
import { motion } from "framer-motion";

export const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xs};
  max-width: 1200px;
  margin: 0;
`;

export const Title = styled(motion.h1)`
  color: ${({ theme }) => theme.primary};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Subtitle = styled(motion.p)`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Emoji = styled(motion.span)`
  display: inline-block;
  font-size: 1.5em;
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

// Novos estilos para comunicados
export const AnnouncementsSection = styled.section`
  width: 90%;
  max-width: 800px;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: left;
`;

export const AnnouncementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const AnnouncementCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  text-align: left;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.primary};
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const AnnouncementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const AnnouncementSubject = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

export const AnnouncementDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const AnnouncementContent = styled.div`
  margin-bottom: 12px;
`;

export const AnnouncementImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 8px;
  margin-bottom: 12px;
  object-fit: cover;
`;

export const AnnouncementText = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
  margin: 0 0 12px 0;
  font-size: 0.95rem;
`;

export const AnnouncementLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const AnnouncementLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 12px;
  background: ${({ theme }) => `${theme.primary}15`};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.primary}25`};
    border-color: ${({ theme }) => `${theme.primary}50`};
    transform: translateX(2px);
  }
`;

export const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => `${theme.primary}dd`});
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  
  p {
    margin-top: 16px;
    color: ${({ theme }) => theme.textLight};
    font-size: 16px;
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

export const EmptyAnnouncements = styled.div`
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

// Estilos do Modal
export const ModalOverlay = styled(motion.div)`
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
  padding: 20px;
`;

export const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  gap: 16px;
`;

export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  line-height: 1.3;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textLight};
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ModalImageContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 300px;
  border-radius: 8px;
  object-fit: contain;
`;

export const ModalText = styled.div`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 20px;
  word-wrap: break-word;
  
  /* Estilos para links dentro do conteúdo */
  a {
    color: ${({ theme }) => theme.primary} !important;
    text-decoration: underline !important;
    cursor: pointer !important;
    transition: color 0.2s ease;
    font-weight: 500;
    
    &:hover {
      color: ${({ theme }) => theme.accent} !important;
      text-decoration: underline !important;
    }
  }
  
  /* Estilos para quebras de linha */
  br {
    line-height: 1.6;
  }
  
  /* Garantir que não há espaçamento extra */
  margin: 0;
  padding: 0;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

export const ModalUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.textLight};
  font-size: 14px;
`;

export const ModalDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.textLight};
  font-size: 14px;
`;

export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const emojiVariants = {
  animate: {
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

// Componentes para carregar mais
export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

export const LoadMoreButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LoadingMore = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.textLight};
  font-size: 14px;
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.cardBackground};
    border-top: 2px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;