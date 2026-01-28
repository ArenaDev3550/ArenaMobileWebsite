import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SignIn, Spinner, GoogleLogo } from 'phosphor-react';
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
  containerVariants,
  LegalLinks,
  LegalText,
  LegalLinksList,
  LegalLink,
  Divider,
  GoogleButton
} from './LoginPage.styles';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [googleReady, setGoogleReady] = useState(false);
  const { login, loginWithGoogle, loading, error, checkTokenAndLogin, user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  // Inicializar Google Identity Services
  useEffect(() => {
    console.log('🔄 Carregando Google Identity Services...');
    //console.log('📋 Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
    
    // Verificar se já existe
    if (window.google?.accounts) {
      console.log('✅ Google Identity Services já carregado');
      setGoogleReady(true);
      return;
    }

    // Carregar script do Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('✅ Script do Google carregado com sucesso');
      // Aguardar um pouco para garantir que está totalmente inicializado
      setTimeout(() => {
        if (window.google?.accounts) {
          console.log('✅ Google Identity Services pronto');
          setGoogleReady(true);
        } else {
          console.error('❌ Google Identity Services não inicializou corretamente');
        }
      }, 500);
    };
    
    script.onerror = (error) => {
      console.error('❌ Erro ao carregar script do Google:', error);
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup: remover script ao desmontar
      try {
        document.body.removeChild(script);
      } catch (e) {
        // Ignorar erro se já foi removido
      }
    };
  }, []);

  // Verificar token existente ao montar o componente
  useEffect(() => {
    const checkExistingToken = async () => {
      const tokenExists = localStorage.getItem('token');
      if (tokenExists) {
        //console.log('Token encontrado, verificando validade...');
        const isValid = await checkTokenAndLogin();
        if (isValid) {
          //console.log('Token válido, redirecionando...');
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

  const handleGoogleLogin = () => {
    console.log('🔵 Botão Google clicado');
    /*console.log('📊 Estado atual:', {
      googleReady,
      loading,
      hasWindow: !!window.google,
      hasAccounts: !!window.google?.accounts,
      hasOauth2: !!window.google?.accounts?.oauth2,
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
    });*/

    if (loading) {
      console.log('⏳ Já está carregando, aguarde...');
      return;
    }

    if (!googleReady) {
      console.error('❌ Google Identity Services ainda não está pronto');
      alert('Google Sign-In ainda está carregando. Aguarde alguns segundos e tente novamente.');
      return;
    }

    // Usar OAuth2 Token Client para obter token diretamente via popup
    if (window.google?.accounts?.oauth2) {
      try {
        console.log('🔧 Inicializando Google Token Client...');
        //console.log('🔑 Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
        //console.log('📅 Solicitando permissões: Login + Google Calendar');
        
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          // Incluir scope do Calendar para já pedir permissão na hora do login
          scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
          callback: async (tokenResponse) => {
            //console.log('📬 Resposta do Token Client:', tokenResponse);
            
            if (tokenResponse.error) {
              //console.error('❌ Erro:', tokenResponse.error);
              alert('Erro no login: ' + tokenResponse.error);
              return;
            }
            
            if (tokenResponse.access_token) {
              console.log('✅ Access token recebido com permissões do Calendar');
              //console.log('📅 Escopos autorizados:', tokenResponse.scope);
              // Usar o access_token para autenticar e salvar permissões
              await handleGoogleAccessToken(tokenResponse.access_token);
            }
          },
        });

        console.log('📱 Solicitando token com permissões de Calendar (popup vai abrir)...');
        tokenClient.requestAccessToken({ prompt: 'consent' });
        
      } catch (error) {
        //console.error('❌ Erro ao inicializar Token Client:', error);
        alert('Erro ao abrir Google Sign-In: ' + error.message);
      }
    } else {
      console.error('❌ Google OAuth2 não está disponível');
      //console.log('🔍 Debug:', window.google);
      alert('Google Sign-In não está disponível. Verifique sua conexão com a internet.');
    }
  };

  const handleGoogleAccessToken = async (accessToken) => {
    console.log('🔄 Processando access token...');
    
    try {
      // Buscar informações do usuário com o access_token
      console.log('👤 Buscando informações do usuário...');
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!userInfoResponse.ok) {
        throw new Error('Falha ao buscar informações do usuário');
      }
      
      const userInfo = await userInfoResponse.json();
      /*console.log('✅ Informações do usuário:', userInfo);
      console.log('📧 Email:', userInfo.email);
      console.log('👤 Nome:', userInfo.name);*/
      console.log('📅 Permissões do Calendar: CONCEDIDAS');
      
      // Salvar o access_token do Google no localStorage para usar no Calendar
      console.log('💾 Salvando access_token do Google para usar no Calendar...');
      localStorage.setItem('google_access_token', accessToken);
      localStorage.setItem('google_user_info', JSON.stringify(userInfo));
      
      // Enviar para o backend para fazer login na aplicação
      //console.log('🔄 Enviando para backend para autenticação...');
      
      // Usar a função do AuthContext que já existe
      await loginWithGoogle(accessToken);
      
      console.log('✅ Login completo! Redirecionando...');
      navigate(from, { replace: true });
      
    } catch (err) {
      console.error('❌ Erro ao processar token:', err);
      alert('Erro ao processar login: ' + (err.message || 'Erro desconhecido'));
    }
  };

  const handleGoogleResponse = async (response) => {
    console.log('📬 Resposta do Google recebida');
    console.log('📋 Response:', response);
    
    try {
      if (!response.credential) {
        throw new Error('Token não recebido do Google');
      }
      
      const googleToken = response.credential;
      console.log('🎫 Token recebido (primeiros 50 chars):', googleToken.substring(0, 50) + '...');
      console.log('🔄 Enviando para backend...');
      
      await loginWithGoogle(googleToken);
      
      console.log('✅ Login com Google realizado com sucesso');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('❌ Erro no login com Google:', err);
      alert('Erro ao fazer login com Google: ' + (err.message || 'Erro desconhecido'));
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

        <Divider>
          <span>ou</span>
        </Divider>

        <GoogleButton onClick={handleGoogleLogin} disabled={loading || !googleReady}>
          <GoogleLogo size={24} weight="bold" />
          {googleReady ? 'Entrar com Google' : 'Carregando Google...'}
        </GoogleButton>

        <LegalLinks>
          <LegalText>
            Ao usar o ArenaMobile, você concorda com nossos
          </LegalText>
          <LegalLinksList>
            <LegalLink as={Link} to="/termos-de-uso">
              Termos de Uso
            </LegalLink>
            <span style={{ color: '#999' }}>•</span>
            <LegalLink as={Link} to="/politica-de-privacidade">
              Política de Privacidade
            </LegalLink>
          </LegalLinksList>
        </LegalLinks>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;