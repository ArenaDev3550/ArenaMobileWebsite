import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LegalContainer = styled(motion.div)`
  min-height: 100vh;
  height: auto;
  padding: 40px 20px;
  background: ${({ theme }) => theme.background};
`;

export const LegalContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 8px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 24px;

  &:hover {
    background: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

export const Header = styled.header`
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.border};
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const LastUpdated = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textLight};
  font-style: italic;
`;

export const Section = styled.section`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 16px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
  text-align: justify;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`;

export const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
  padding-left: 24px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 8px;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }

  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const Highlight = styled.span`
  display: block;
  background: ${({ theme }) => theme.background};
  border-left: 4px solid ${({ theme }) => theme.primary};
  padding: 16px 20px;
  border-radius: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;
