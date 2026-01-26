export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

export const transitions = {
  default: '0.3s ease-in-out',
  fast: '0.15s ease-in-out',
  slow: '0.5s ease-in-out',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  round: '50%',
};

export const lightTheme = {
  primary: '#006D77', 
  //primary: '#fff',  // sea green
  //primary: '#83C5BE',  // sea green
  secondary: '#83C5BE', // lighter sea green
  accent: '#00474F',   // darker sea green
  background: '#ebebebff',
  //background: '#006D77',
  backgroundText: '#b9b9b9ff',
  backgroundSecondary: '#0093a0ff',
  surface: '#FFFFFF',
  text: '#2C3E50',
  //textLight: '#d6d6d6ff',
  textLight: '#a1a1a1ff',
  textLightH: '#a1a1a1ff',
  textDark: '#004C53',
  textDarkH: '#005a63ff',
  border: '#E0E0E0',
  error: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FFB84D',
  transitions,
  spacing,
  borderRadius,
  breakpoints,
};

export const darkTheme = {
  primary: '#006D77',  // keeping brand color consistent
  //primary: '#fff',  // keeping brand color consistent
  secondary: '#004C53', // darker sea green
  accent: '#83C5BE',   // lighter sea green for accent in dark mode
  background: '#121212',
  backgroundText: '#121212',
  surface: '#1E1E1E',
  text: '#E0E0E0',
  textLightH: '#222222ff',
  textLight: '#d6d6d6ff',
  textDark: '#004C53',
  textDarkH: '#005a63ff',
  border: '#2C2C2C',
  error: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FFB84D',
  transitions,
  spacing,
  borderRadius,
  breakpoints,
};