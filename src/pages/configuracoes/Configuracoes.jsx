import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Gear, User, Calendar, Envelope, Lock, SignOut, FileText, Shield } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  PageContainer,
  PageTitle,
  ProfileCard,
  ProfileHeader,
  Avatar,
  UserInfo,
  UserName,
  UserEmail,
  UserInfoContent,
  ConfigSection,
  SectionTitle,
  InfoGrid,
  InfoField,
  FieldLabel,
  FieldValue,
  PasswordField,
  PasswordText,
  ChangePasswordButton,
  ActionSection,
  LogoutButton,
  Modal,
  ModalContent,
  ModalTitle,
  ModalActions,
  CancelButton,
  ConfirmButton,
  LegalSection,
  LegalLinks,
  LegalLink
} from './Configuracoes.styles';

function Configuracoes() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Função para formatar data de nascimento (se existir)
  const formatBirthDate = (dateString) => {
    if (!dateString) return 'Não informado';
    
    try {
      const date = new Date(dateString);
      // retornar data dd/mm/yyyy
      // return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      return dateString.split('T')[0];
    } catch (error) {
      return 'Não informado';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordModalConfirm = () => {
    setShowPasswordModal(false);
    navigate('/alterar-senha');
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  if (!user) {
    return (
      <PageContainer>
        <PageTitle
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Gear size={32} />
          Configurações
        </PageTitle>
        <p>Carregando informações do usuário...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Gear size={32} />
        Configurações
      </PageTitle>

      <ProfileCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ProfileHeader>
          <Avatar
            src={user.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=AM'}
            alt={`Foto de ${user.name || 'Usuário'}`}
          />
          <UserInfo>
            <UserName>{user.name || 'Nome não informado'}</UserName>
            <UserEmail>{user.email || 'E-mail não informado'}</UserEmail>
          </UserInfo>
        </ProfileHeader>

        <ConfigSection>
          <SectionTitle>
            <User size={20} />
            Informações Pessoais
          </SectionTitle>

          <InfoGrid>
            <InfoField>
              <FieldLabel>Nome Completo</FieldLabel>
              <FieldValue>{user.name || 'Não informado'}</FieldValue>
            </InfoField>
            <InfoField>
              <FieldLabel>Turma</FieldLabel>
              <FieldValue>{user.turma || 'Não informado'}</FieldValue>
            </InfoField>

            <InfoField>
              <FieldLabel>
                <Calendar size={16} style={{ marginRight: '4px' }} />
                Data de Nascimento
              </FieldLabel>
              <FieldValue>
                {formatBirthDate(user.birthDate)}
              </FieldValue>
            </InfoField>

            <InfoField>
              <FieldLabel>
                <Envelope size={16} style={{ marginRight: '4px' }} />
                E-mail
              </FieldLabel>
              <FieldValue>{user.email || 'Não informado'}</FieldValue>
            </InfoField>

            <InfoField>
              <FieldLabel>
                <Lock size={16} style={{ marginRight: '4px' }} />
                Senha
              </FieldLabel>
              <PasswordField>
                <PasswordText>••••••••</PasswordText>
                <ChangePasswordButton onClick={handleChangePassword}>
                  Alterar Senha
                </ChangePasswordButton>
              </PasswordField>
            </InfoField>
          </InfoGrid>
        </ConfigSection>

        <ActionSection>
          <LogoutButton onClick={() => setShowLogoutModal(true)}>
            <SignOut size={20} />
            Sair da Conta
          </LogoutButton>
        </ActionSection>
      </ProfileCard>

      {/* Seção adicional para demonstrar scroll */}
      <ProfileCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ConfigSection>
          <SectionTitle>
            <Gear size={20} />
            Preferências do Sistema
          </SectionTitle>
          
          <InfoGrid>
            <InfoField>
              <FieldLabel>Tema</FieldLabel>
              <FieldValue>Modo Escuro</FieldValue>
            </InfoField>
            <InfoField>
              <FieldLabel>Idioma</FieldLabel>
              <FieldValue>Português (Brasil)</FieldValue>
            </InfoField>
            <InfoField>
              <FieldLabel>Notificações</FieldLabel>
              <FieldValue>Ativadas</FieldValue>
            </InfoField>
            <InfoField>
              <FieldLabel>Última Sincronização</FieldLabel>
              <FieldValue>Há 2 minutos</FieldValue>
            </InfoField>
          </InfoGrid>
        </ConfigSection>

        {/* Seção de Termos e Privacidade */}
        <LegalSection>
          <SectionTitle>Termos e Privacidade</SectionTitle>
          <LegalLinks>
            <LegalLink as={Link} to="/termos-de-uso">
              <FileText size={20} />
              Termos de Uso
            </LegalLink>
            <LegalLink as={Link} to="/politica-de-privacidade">
              <Shield size={20} />
              Política de Privacidade
            </LegalLink>
          </LegalLinks>
        </LegalSection>
      </ProfileCard>

      {/* Modal de Confirmação de Logout */}
      {showLogoutModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLogoutModal(false)}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <ModalTitle>Confirmar Logout</ModalTitle>
            <p style={{ textAlign: 'center', margin: '0 0 20px 0', color: 'var(--text-light)' }}>
              Tem certeza que deseja sair da sua conta?
            </p>
            <ModalActions>
              <CancelButton onClick={() => setShowLogoutModal(false)}>
                Cancelar
              </CancelButton>
              <ConfirmButton onClick={handleLogout}>
                Sair
              </ConfirmButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Alteração de Senha */}
      {showPasswordModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPasswordModal(false)}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <ModalTitle>Alterar Senha</ModalTitle>
            <p style={{ textAlign: 'center', margin: '0 0 20px 0', color: 'var(--text-light)' }}>
              Deseja prosseguir para a página de alteração de senha?
            </p>
            <ModalActions>
              <CancelButton onClick={handlePasswordModalClose}>
                Cancelar
              </CancelButton>
              <ConfirmButton onClick={handlePasswordModalConfirm}>
                Prosseguir
              </ConfirmButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
}

export default Configuracoes;