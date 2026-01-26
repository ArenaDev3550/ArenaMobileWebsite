import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, House, SignIn, Gear, GraduationCap, Calendar } from 'phosphor-react';

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: ${({ theme }) => theme.surface};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 250px;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 250px;
    position: sticky;
    transform: none;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  left: ${({ $isOpen }) => ($isOpen ? '260px' : '10px')};
  top: 10px;
  z-index: 1001;
  background: ${({ theme }) => theme.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }

  &:hover {
    background: ${({ theme }) => theme.background};
  }
`;

const Logo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.accent};
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Nav = styled.nav`
  padding: ${({ theme }) => theme.spacing.md};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }

  &:hover {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.accent};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar} $isOpen={isOpen}>
        {isOpen ? <X size={24} /> : <List size={24} />}
      </ToggleButton>

      <AnimatePresence>
        {isOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      <SidebarContainer
        $isOpen={isOpen}
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Logo>ArenaMobile</Logo>
        <Nav>
          <NavItem to="/home" onClick={closeSidebar}>
            <House size={24} /> Início
          </NavItem>
          <NavItem to="/academico" onClick={closeSidebar}>
            <GraduationCap size={24} /> Acadêmico
          </NavItem>
          <NavItem to="/agendamentos" onClick={closeSidebar}>
            <Calendar size={24} /> Agendamentos
          </NavItem>
          <NavItem to="/configuracoes" onClick={closeSidebar}>
            <Gear size={24} /> Configurações
          </NavItem>
        </Nav>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;