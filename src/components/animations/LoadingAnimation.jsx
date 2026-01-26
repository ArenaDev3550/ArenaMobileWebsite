import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.background}CC`};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.primary};
  border-top-color: transparent;
  border-radius: 50%;
`;

const spinTransition = {
  repeat: Infinity,
  duration: 1,
  ease: "linear"
};

const LoadingAnimation = () => {
  return (
    <LoadingOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingSpinner
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </LoadingOverlay>
  );
};

export default LoadingAnimation;