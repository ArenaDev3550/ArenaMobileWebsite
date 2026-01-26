import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import PageTransition from '../animations/PageTransition';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <ContentArea>
          <PageTransition>
            {children}
          </PageTransition>
        </ContentArea>
        <Footer />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;