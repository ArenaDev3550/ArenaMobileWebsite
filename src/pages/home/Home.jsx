import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { 
  Megaphone, 
  Calendar, 
  User, 
  Eye, 
  ArrowSquareOut,
  CaretRight,
  X
} from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingAnimation from '../../components/animations/LoadingAnimation';
import { apiService } from '../../services/apiService';
import { cleanAnnouncementHTML, extractLinksFromHTML, truncateText, processAnnouncementHTML, extractCleanTextForPreview } from '../../utils/announcementUtils';
import {
  HomeSection,
  Title,
  Subtitle,
  Emoji,
  containerVariants,
  itemVariants,
  emojiVariants,
  AnnouncementsSection,
  SectionTitle,
  AnnouncementsList,
  AnnouncementCard,
  AnnouncementHeader,
  AnnouncementSubject,
  AnnouncementDate,
  AnnouncementContent,
  AnnouncementText,
  AnnouncementLinks,
  AnnouncementLink,
  AnnouncementImage,
  ViewAllButton,
  LoadingContainer,
  ErrorMessage,
  EmptyAnnouncements,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalImageContainer,
  ModalImage,
  ModalText,
  ModalFooter,
  ModalUserInfo,
  ModalDate,
  LoadMoreContainer,
  LoadingMore
} from "./Home.styles";

function Home() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef();

  const lastAnnouncementElementRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchRecentAnnouncements(currentPage + 1, true);
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore, currentPage]);

  useEffect(() => {
    if (user?.turma) {
      fetchRecentAnnouncements();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeAnnouncementModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const fetchRecentAnnouncements = async (page = 1, append = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      // Buscar comunicados dos últimos 3 anos
      const endDate = new Date();
      const startDate = new Date();
      endDate.setFullYear(endDate.getFullYear() - 2);
      startDate.setFullYear(startDate.getFullYear() - 3);

      const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        });
      };

      const response = await apiService.getStudentAnnouncements(
        formatDate(startDate),
        formatDate(endDate),
        page, // página atual
        10, // 10 por página
        user.turma
      );

      if (response?.comunicados) {
        if (append) {
          setAnnouncements(prev => [...prev, ...response.comunicados]);
        } else {
          setAnnouncements(response.comunicados);
        }
        
        // Verificar se há mais páginas
        setHasMore(response.paginacao?.has_next || false);
        setCurrentPage(page);
      } else {
        if (!append) {
          setAnnouncements([]);
        }
        setHasMore(false);
      }
    } catch (err) {
      console.error('Erro ao buscar comunicados:', err);
      setError('Erro ao carregar comunicados');
      if (!append) {
        setAnnouncements([]);
      }
      setHasMore(false);
    } finally {
      if (page === 1) {
        setIsLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const formatAnnouncementDate = (dateString) => {
    if (!dateString) return 'Data não informada';
    
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Data inválida';
    }
  };

  const openAnnouncementModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const closeAnnouncementModal = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  };

  return (
    <HomeSection
      as={motion.section}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >{/*
      <Title variants={itemVariants}>
        ArenaMobile
      </Title>
      <Subtitle variants={itemVariants}>
        Bem-vindo ao ArenaMobile
        <Emoji
          variants={emojiVariants}
          animate="animate"
        >
          🚀
        </Emoji>
      </Subtitle>*/}

      {/* Seção de Comunicados Recentes */}
      <AnnouncementsSection
        as={motion.section}
        variants={itemVariants}
      >
        <SectionTitle>
          <Megaphone size={24} />
          Comunicados (Últimos 3 Anos)
        </SectionTitle>

        {isLoading ? (
          <LoadingContainer>
            <LoadingAnimation />
            <p>Carregando comunicados...</p>
          </LoadingContainer>
        ) : error ? (
          <ErrorMessage>
            <Megaphone size={20} />
            {error}
          </ErrorMessage>
        ) : announcements.length === 0 ? (
          <EmptyAnnouncements>
            <Megaphone size={48} />
            <h3>Nenhum comunicado encontrado</h3>
            <p>Não há comunicados recentes para exibir.</p>
          </EmptyAnnouncements>
        ) : (
          <>
            <AnnouncementsList>
              {announcements.map((announcement, index) => {
                const cleanTextForPreview = extractCleanTextForPreview(announcement.texto.replace('[NOMEALUNO]', user?.nome_completo?.split(' ')[0] || user?.name?.split(' ')[0] || 'Estudante'));
                const isLast = index === announcements.length - 1;
                
                return (
                  <AnnouncementCard
                    key={`${announcement.id || index}-${announcement.assunto}`}
                    ref={isLast ? lastAnnouncementElementRef : null}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => openAnnouncementModal(announcement)}
                    style={{ cursor: 'pointer' }}
                  >
                    <AnnouncementHeader>
                      <div style={{ flex: 1 }}>
                        <AnnouncementSubject>
                          {announcement.assunto || 'Comunicado'}
                        </AnnouncementSubject>
                        <AnnouncementDate>
                          <Calendar size={16} />
                          {formatAnnouncementDate(announcement.data_envio)}
                        </AnnouncementDate>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        color: '#999',
                        fontSize: '12px'
                      }}>
                        Clique para ver
                      </div>
                    </AnnouncementHeader>

                    <AnnouncementContent>
                      {announcement.id_imagem && (
                        <AnnouncementImage
                          src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/student/announcement/image/${announcement.id_imagem}`}
                          alt="Imagem do comunicado"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      
                      <AnnouncementText>
                        {truncateText(cleanTextForPreview, 200)}
                      </AnnouncementText>
                    </AnnouncementContent>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '12px',
                      fontSize: '12px',
                      color: '#999'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={14} />
                        {announcement.codigo_usuario || 'Sistema'}
                      </div>
                    </div>
                  </AnnouncementCard>
                );
              })}
            </AnnouncementsList>
            
            {loadingMore && (
              <LoadMoreContainer>
                <LoadingMore>
                  <div className="spinner"></div>
                  Carregando mais comunicados...
                </LoadingMore>
              </LoadMoreContainer>
            )}
          </>
        )}
      </AnnouncementsSection>

      {/* Modal do Comunicado */}
      {isModalOpen && selectedAnnouncement && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAnnouncementModal}
        >
          <ModalContent
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                {selectedAnnouncement.assunto || 'Comunicado'}
              </ModalTitle>
              <CloseButton onClick={closeAnnouncementModal}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              {selectedAnnouncement.id_imagem && (
                <ModalImageContainer>
                  <ModalImage
                    src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/student/announcement/image/${selectedAnnouncement.id_imagem}`}
                    alt="Imagem do comunicado"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </ModalImageContainer>
              )}

              <ModalText
                dangerouslySetInnerHTML={{
                  __html: processAnnouncementHTML(selectedAnnouncement.texto.replace('[NOMEALUNO]', user?.nome_completo?.split(' ')[0] || user?.name?.split(' ')[0] || 'Estudante'))
                }}
              />

            </ModalBody>

            <ModalFooter>
              <ModalUserInfo>
                <User size={16} />
                Enviado por: {selectedAnnouncement.codigo_usuario || 'Sistema'}
              </ModalUserInfo>
              <ModalDate>
                <Calendar size={16} />
                {formatAnnouncementDate(selectedAnnouncement.data_envio)}
              </ModalDate>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </HomeSection>
  );
}

export default Home;