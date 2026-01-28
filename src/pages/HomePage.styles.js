import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HomeContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    #006D77 0%, 
    #83C5BE 100%
  );
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const HomeContent = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 40px 24px;
    border-radius: 16px;
  }
`;

export const Logo = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 109, 119, 0.3);
  border: 4px solid #006D77;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 16px;
  line-height: 1.2;

  span {
    background: linear-gradient(135deg, #006D77, #83C5BE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #5A6C7D;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  color: #5A6C7D;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 48px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 36px;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 36px;
  }
`;

export const FeatureCard = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #006D77;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 109, 119, 0.15);
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgba(0, 109, 119, 0.2), 
    rgba(131, 197, 190, 0.2)
  );
  border-radius: 16px;
  color: #006D77;

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 14px;
  color: #5A6C7D;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #006D77, #83C5BE);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(0, 109, 119, 0.3);
  transition: all 0.3s ease;
  margin-bottom: 32px;

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 109, 119, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    padding: 16px 36px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const LegalLinks = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E0E0E0;
`;

export const LegalText = styled.p`
  font-size: 13px;
  color: #5A6C7D;
  margin-bottom: 8px;
`;

export const LegalLinksList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const LegalLink = styled.a`
  font-size: 13px;
  color: #006D77;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #83C5BE;
    text-decoration: underline;
  }
`;

// Animações
export const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

export const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5
    }
  })
};
