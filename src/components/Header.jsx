import React from "react";
import styled from "styled-components";
import { Moon, Sun, SignOut } from "phosphor-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transitions.default};
  flex-shrink: 0; // Mantém altura fixa, não participa do scroll
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 60px; // Espaço para o botão do menu
  }
`;

const HeaderButton = styled.button`
  background: ${({ theme }) => theme.background};
  border: none;
  color: ${({ theme }) => theme.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
  border-right: 1px solid ${({ theme }) => theme.border};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  border: 2px solid ${({ theme }) => theme.primary};
`;

const UserName = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <UserInfo>
        <Avatar src={user.avatar} alt={user.name} />
        <UserName>{user.name}</UserName>
      </UserInfo>

      <HeaderButton onClick={toggleTheme} aria-label="Alternar tema">
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </HeaderButton>

      <HeaderButton onClick={logout} aria-label="Sair">
        <SignOut size={24} />
      </HeaderButton>
    </HeaderWrapper>
  );
}

export default Header;
