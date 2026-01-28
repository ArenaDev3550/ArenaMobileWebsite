import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignIn, CalendarBlank, Users, Sparkle } from 'phosphor-react';
import {
  HomeContainer,
  HomeContent,
  Logo,
  Title,
  Subtitle,
  Description,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  CTAButton,
  LegalLinks,
  LegalText,
  LegalLinksList,
  LegalLink,
  containerVariants,
  contentVariants,
  featureVariants
} from './HomePage.styles';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <HomeContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HomeContent
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <Logo>
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=A&backgroundColor=006D77"
            alt="ArenaMobile Logo"
          />
        </Logo>

        <Title>
          Bem-vindo ao <span>ArenaMobile</span>
        </Title>

        <Subtitle>
          Sua plataforma completa para gestão acadêmica
        </Subtitle>

        <Description>
          Acompanhe suas aulas, gerencie agendamentos e sincronize com seu Google Calendar. 
          Tudo em um só lugar, de forma simples e intuitiva.
        </Description>

        <FeaturesGrid>
          <FeatureCard
            variants={featureVariants}
            custom={0}
          >
            <FeatureIcon>
              <CalendarBlank size={32} weight="duotone" />
            </FeatureIcon>
            <FeatureTitle>Agendamentos</FeatureTitle>
            <FeatureDescription>
              Agende suas aulas na ARENA e sincronize automaticamente com Google Calendar
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            variants={featureVariants}
            custom={1}
          >
            <FeatureIcon>
              <Users size={32} weight="duotone" />
            </FeatureIcon>
            <FeatureTitle>Gestão Acadêmica</FeatureTitle>
            <FeatureDescription>
              Acesse informações do seu curso, disciplinas e professores em tempo real
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            variants={featureVariants}
            custom={2}
          >
            <FeatureIcon>
              <Sparkle size={32} weight="duotone" />
            </FeatureIcon>
            <FeatureTitle>Interface Moderna</FeatureTitle>
            <FeatureDescription>
              Design intuitivo e responsivo para facilitar seu dia a dia acadêmico
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>

        <CTAButton
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SignIn size={24} weight="bold" />
          Entrar no ArenaMobile
        </CTAButton>

        <LegalLinks>
          <LegalText>
            Ao continuar, você concorda com nossos
          </LegalText>
          <LegalLinksList>
            <LegalLink as={Link} to="/termos-de-uso">
              Termos de Uso
            </LegalLink>
            <span style={{ color: '#999' }}>•</span>
            <LegalLink as={Link} to="/politica-de-privacidade">
              Política de Privacidade
            </LegalLink>
          </LegalLinksList>
        </LegalLinks>
      </HomeContent>
    </HomeContainer>
  );
};

export default HomePage;
