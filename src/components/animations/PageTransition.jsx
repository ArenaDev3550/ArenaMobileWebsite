import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled(motion.div)`
  width: 100vw;
  height: 100%;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    x: '100%',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    x: '-100%',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageContainer
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </PageContainer>
    </AnimatePresence>
  );
};

export default PageTransition;