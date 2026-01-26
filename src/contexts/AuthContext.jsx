import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingAnimation from '../components/animations/LoadingAnimation';
import apiService from '../services/apiService';
import secureStorage from '../utils/secureStorage';

const AuthContext = createContext();

// Mock de usuário para teste
const mockUser = {
  id: 1,
  name: 'Usuário Teste',
  email: 'teste@arenamobile.com',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AM',
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Começa como true
  const [error, setError] = useState(null);

  // Verifica o estado de autenticação ao iniciar
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('🔍 Verificando status de autenticação...');
      
      try {
        const savedToken = secureStorage.getItem('token');
        console.log('🎫 Token encontrado:', savedToken ? 'SIM' : 'NÃO');

        if (savedToken) {
          // Tentar buscar dados do usuário com o token
          try {
            console.log('📡 Verificando token com a API...');
            const data = await apiService.verifyToken();
            const userData = data.user_info;
            const userAvatar = await apiService.fetchStudentImage(userData.ra);
            
            // Processar dados do usuário retornados pela API
            const processedUser = {
              id: userData.ra || userData.id || 1,
              name: userData.nome_completo || userData.nome || userData.name || 'Usuário',
              nome_completo: userData.nome_completo || userData.nome || userData.name || 'Usuário',
              email: String(userData.email).toLowerCase() || 'usuario@arenamobile.com',
              avatar: userAvatar.image || `https://api.dicebear.com/7.x/initials/svg?seed=${userData.nome_completo || 'User'}`,
              username: userData.username || userData.ra || 'user',
              birthDate: userData.data_nascimento || userData.birthDate || null,
              phone: userData.tel_1 || userData.phone || null,
              phone2: userData.tel_2 || null,
              role: userData.tipo_aluno || userData.role || 'user',
              ra: userData.ra || null,
              turma: userData.nome_turma || userData.turma || null,
              codTurma: userData.cod_turma || userData.codTurma || null,
              sexo: userData.sexo || null,
              codTipoAluno: userData.cod_tipo_aluno || null,
              serie: userData.turno || null
            };

            console.log('✅ Usuário autenticado:', processedUser.name);
            setUser(processedUser);
            secureStorage.setItem('user', JSON.stringify(processedUser));
          } catch (verifyError) {
            console.warn('⚠️ Erro ao verificar token:', verifyError.message);
            
            // Só limpar se for erro 401 (token inválido)
            // Para outros erros (rede, servidor), manter o token
            if (verifyError.message.includes('401') || verifyError.message.includes('Token expirado')) {
              console.log('🗑️ Token inválido, limpando dados...');
              secureStorage.removeItem('user');
              secureStorage.removeItem('token');
            } else {
              console.log('🔄 Erro de rede/servidor, mantendo token para retry posterior');
              // Em caso de erro de rede, tentar carregar dados salvos do usuário
              const savedUser = secureStorage.getItem('user');
              if (savedUser) {
                try {
                  const parsedUser = JSON.parse(savedUser);
                  console.log('📋 Carregando dados salvos do usuário:', parsedUser.name);
                  setUser(parsedUser);
                } catch (parseError) {
                  console.error('Erro ao parsear dados salvos do usuário:', parseError);
                }
              }
            }
          }
        } else {
          console.log('❌ Nenhum token encontrado');
        }
      } catch (err) {
        console.error('❌ Erro geral ao restaurar sessão:', err);
        // Não limpar automaticamente em erro geral - pode ser problema de rede
        console.log('🔄 Mantendo dados devido a erro geral');
      } finally {
        setLoading(false);
        console.log('✅ Verificação de autenticação concluída');
      }
    };

    checkAuthStatus();
  }, []);

  const getToken = () => {
    return secureStorage.getItem('token');
  };

  const processUserData = (userData, username, userAvatar) => {
    return {
      id: userData.ra || userData.id || 1,
      name: userData.nome_completo || userData.nome || userData.name || username,
      nome_completo: userData.nome_completo || userData.nome || userData.name || username,
      email: String(userData.email).toLowerCase() || `${username}@arenamobile.com`,
      avatar: userAvatar.image || `https://api.dicebear.com/7.x/initials/svg?seed=${userData.nome_completo || username}`,
      username: username,
      birthDate: userData.data_nascimento || userData.birthDate || null,
      phone: userData.tel_1 || userData.phone || null,
      phone2: userData.tel_2 || null,
      role: userData.tipo_aluno || userData.role || 'user',
      ra: userData.ra || null,
      turma: userData.nome_turma || userData.turma || null,
      codTurma: userData.cod_turma || userData.codTurma || null,
      sexo: userData.sexo || null,
      codTipoAluno: userData.cod_tipo_aluno || null,
      serie: userData.turno || null
    };
  };

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.login(username, password);

      // Armazenar o token
      const token = data.access_token || data.token;
      secureStorage.setItem('token', token);

      // Buscar dados completos do usuário usando o token
      //const userData = await apiService.verifyToken();
      const userData = data.user_info;
      const userAvatar = await apiService.fetchStudentImage(userData.ra);

      // Processar dados do usuário retornados pela API
      const processedUser = processUserData(userData, username, userAvatar);

      setUser(processedUser);
      secureStorage.setItem('user', JSON.stringify(processedUser));

    } catch (err) {
      console.error('Erro no login:', err);
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
      // Limpar dados em caso de erro
      secureStorage.removeItem('user');
      secureStorage.removeItem('token');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkTokenAndLogin = async () => {
    const token = secureStorage.getItem('token');
    if (!token) return false;

    setLoading(true);
    try {
      const data = await apiService.verifyToken();
      const userData = data.user_info;
      const userAvatar = await apiService.fetchStudentImage(userData.ra);
      
      // Processar dados do usuário retornados pela API
      const processedUser = processUserData(userData, userData.username || userData.ra || 'user', userAvatar);

      setUser(processedUser);
      secureStorage.setItem('user', JSON.stringify(processedUser));
      return true;
    } catch (error) {
      // Token inválido, limpar dados
      secureStorage.removeItem('user');
      secureStorage.removeItem('token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    secureStorage.removeItem('user');
    secureStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, checkTokenAndLogin, loading, error }}>
      <AnimatePresence>
        {loading && <LoadingAnimation />}
      </AnimatePresence>
      {children}
    </AuthContext.Provider>
  );
};