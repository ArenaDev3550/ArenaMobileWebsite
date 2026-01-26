import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.default};
  flex-shrink: 0; // Mantém altura fixa, não participa do scroll
  z-index: 10; // Fica acima do conteúdo rolável
`;

function Footer() {
  return (
    <FooterWrapper>
      <small>© {new Date().getFullYear()} ArenaMobile</small>
    </FooterWrapper>
  );
}

export default Footer;
