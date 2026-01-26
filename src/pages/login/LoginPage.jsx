import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SignIn, Spinner } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Button,
  Input,
  FormGroup,
  Label,
  ErrorMessage,
} from '../../components/ui/FormComponents';
import {
  LoginContainer,
  LoginCard,
  Logo,
  Title,
  containerVariants
} from './LoginPage.styles';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, checkTokenAndLogin, user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  // Verificar token existente ao montar o componente
  useEffect(() => {
    const checkExistingToken = async () => {
      const tokenExists = localStorage.getItem('token');
      if (tokenExists) {
        console.log('Token encontrado, verificando validade...');
        const isValid = await checkTokenAndLogin();
        if (isValid) {
          console.log('Token válido, redirecionando...');
          navigate(from, { replace: true });
        } else {
          console.log('Token inválido, usuário deve fazer login');
        }
      }
    };

    checkExistingToken();
  }, []);

  // Redirecionar se o usuário já estiver logado
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Erro já está sendo tratado no contexto
    }
  };

  return (
    <LoginContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <LoginCard>
        <Logo>
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=A&backgroundColor=006D77"
            alt="ArenaMobile Logo"
          />
        </Logo>
        <Title>ArenaMobile</Title>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" $fullWidth disabled={loading}>
            {loading ? (
              <>
                <Spinner size={24} /> Carregando...
              </>
            ) : (
              <>
                <SignIn size={24} /> Entrar
              </>
            )}
          </Button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;