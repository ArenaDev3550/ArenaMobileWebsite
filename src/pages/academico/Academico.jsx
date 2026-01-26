import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ClipboardText, 
  Clock, 
  Warning, 
  ChartBar,
  BookOpen
} from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingAnimation from '../../components/animations/LoadingAnimation';
import Avaliacoes from './Avaliacoes';
import Horarios from './Horarios';
import Ocorrencias from './Ocorrencias';
import Boletim from './Boletim';
import {
  PageContainer,
  PageTitle,
  ContentContainer,
  ErrorMessage,
  MenuGrid,
  MenuButton,
  MenuItemContainer,
  IconWrapper,
  ButtonLabel,
  WelcomeSection,
  WelcomeText,
  SubtitleText,
  ComingSoonBadge
} from './Academico.styles';

function Academico() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('menu'); // 'menu' ou nome da funcionalidade

  // Dados das funcionalidades do menu
  const menuItems = [
    {
      id: 'avaliacoes',
      title: 'Avaliações',
      icon: ClipboardText,
      gradient: '#667eea, #764ba2',
      description: 'Visualize suas notas e avaliações',
      available: true
    },
    {
      id: 'horarios',
      title: 'Horários',
      icon: Clock,
      gradient: '#f093fb, #f5576c',
      description: 'Consulte sua grade de horários',
      available: true
    },
    {
      id: 'ocorrencias',
      title: 'Ocorrências',
      icon: Warning,
      gradient: '#4facfe, #00f2fe',
      description: 'Acompanhe ocorrências escolares',
      available: true
    },
    {
      id: 'boletim',
      title: 'Boletim Escolar',
      icon: ChartBar,
      gradient: '#43e97b, #38f9d7',
      description: 'Acesse seu boletim completo',
      available: true
    }
  ];

  const handleMenuClick = (item) => {
    if (!item.available) {
      alert(`${item.title} - Funcionalidade em desenvolvimento!`);
      return;
    }
    
    // Navegar para a funcionalidade específica
    setCurrentView(item.id);
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  // Renderizar a view atual
  if (currentView === 'avaliacoes') {
    return <Avaliacoes onBack={handleBackToMenu} />;
  }

  if (currentView === 'horarios') {
    return <Horarios onBack={handleBackToMenu} />;
  }

  if (currentView === 'ocorrencias') {
    return <Ocorrencias onBack={handleBackToMenu} />;
  }

  if (currentView === 'boletim') {
    return <Boletim onBack={handleBackToMenu} />;
  }

  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GraduationCap size={32} />
        Área Acadêmica
      </PageTitle>

      <ContentContainer>
        <WelcomeSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <WelcomeText>
              Olá, {user?.nome_completo?.split(' ')[0] || user?.name?.split(' ')[0] || 'Estudante'}! 👋
            </WelcomeText>
            <SubtitleText>
              Acesse suas informações acadêmicas de forma rápida e organizada
            </SubtitleText>
          </motion.div>
        </WelcomeSection>

        <MenuGrid>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <MenuItemContainer
                key={item.id}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.1, 
                  delay: 0.1 + (index * 0.1),
                  type: "spring",
                  stiffness: 50 
                }}
              >
                {!item.available && (
                  <ComingSoonBadge>Em breve</ComingSoonBadge>
                )}
                
                <MenuButton
                  $gradient={item.gradient}
                  onClick={() => handleMenuClick(item)}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.05 }
                  }}
                  whileTap={{ scale: 0.85 }}
                >
                  <IconWrapper>
                    <IconComponent size={32} weight="duotone" />
                  </IconWrapper>
                </MenuButton>
                
                <ButtonLabel>
                  {item.title}
                </ButtonLabel>
              </MenuItemContainer>
            );
          })}
        </MenuGrid>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ 
            textAlign: 'center', 
            marginTop: '32px',
            padding: '0 20px'
          }}
        >
          <SubtitleText>
            📚 Mais funcionalidades serão adicionadas em breve
          </SubtitleText>
        </motion.div>
      </ContentContainer>
    </PageContainer>
  );
}

export default Academico;