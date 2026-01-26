import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  #root {
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Arial', sans-serif;
    transition: all ${({ theme }) => theme.transitions.default};
    overflow: hidden; /* Previne scroll duplo */
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* For tablets and larger */
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.background};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.primary};
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.secondary};
    }
  }
`;