# Configuração do Login com Google

## Visão Geral

A aplicação ArenaMobile implementa o login com Google usando o **Google Identity Services**, a solução moderna e segura do Google para autenticação OAuth 2.0.

## Arquitetura

### Fluxo de Autenticação

1. **Usuário clica no botão "Entrar com Google"**
   - Componente: `LoginPage.jsx`
   - Função: `handleGoogleLogin()`

2. **Google Identity Services é inicializado**
   - Carrega popup de autenticação do Google
   - Usuário seleciona conta e autoriza

3. **Google retorna credential token**
   - Token JWT assinado pelo Google
   - Contém informações do usuário (email, nome, foto)

4. **Frontend envia token para backend**
   - Endpoint: `POST /login/google`
   - Body: `{ "google_token": "<token>" }`

5. **Backend valida o token**
   - Verifica assinatura com Google
   - Extrai informações do usuário
   - Retorna access_token e dados do usuário

6. **Frontend armazena dados e redireciona**
   - Salva token e dados do usuário no localStorage
   - Busca avatar do aluno
   - Redireciona para página inicial

## Arquivos Envolvidos

### 1. LoginPage.jsx
```jsx
// Localização: src/pages/login/LoginPage.jsx

// Inicializa Google Identity Services ao montar componente
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
  
  return () => {
    document.body.removeChild(script);
  };
}, []);

// Handler do botão de login
const handleGoogleLogin = () => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });
    window.google.accounts.id.prompt();
  }
};

// Callback após autenticação
const handleGoogleResponse = async (response) => {
  const googleToken = response.credential;
  await loginWithGoogle(googleToken);
  navigate(from, { replace: true });
};
```

### 2. LoginPage.styles.js
```jsx
// Localização: src/pages/login/LoginPage.styles.js

// Botão estilizado com cores do Google
export const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  color: #757575;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  svg {
    color: #4285F4; /* Cor do logo Google */
  }
  
  &:hover:not(:disabled) {
    background-color: #f8f9fa;
    border-color: #4285F4;
  }
`;

// Divisor "ou"
export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
  
  span {
    padding: 0 10px;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 14px;
  }
`;
```

### 3. AuthContext.jsx
```jsx
// Localização: src/contexts/AuthContext.jsx

const loginWithGoogle = async (googleToken) => {
  setLoading(true);
  setError(null);
  
  try {
    // Chamar API do backend
    const data = await apiService.loginWithGoogle(googleToken);
    
    // Armazenar token
    const token = data.access_token || data.token;
    secureStorage.setItem('token', token);
    
    // Processar dados do usuário
    const userData = data.user_info;
    const userAvatar = await apiService.fetchStudentImage(userData.ra);
    const processedUser = processUserData(userData, userData.username, userAvatar);
    
    setUser(processedUser);
    secureStorage.setItem('user', JSON.stringify(processedUser));
    
    return processedUser;
  } catch (err) {
    console.error('Erro no login com Google:', err);
    setError('Erro ao fazer login com Google. Tente novamente.');
    secureStorage.removeItem('user');
    secureStorage.removeItem('token');
    throw err;
  } finally {
    setLoading(false);
  }
};
```

### 4. apiService.js
```javascript
// Localização: src/services/apiService.js

async loginWithGoogle(googleToken) {
  return this.request('/login/google', {
    method: 'POST',
    body: JSON.stringify({ google_token: googleToken }),
  });
}
```

## Configuração de Variáveis de Ambiente

### Arquivo .env.local

```env
# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=seu-client-id-aqui.apps.googleusercontent.com

# API Backend URL
VITE_API_BASE_URL=http://localhost:8000
```

### Como Obter o Client ID

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie ou selecione um projeto
3. Vá em "APIs e serviços" > "Credenciais"
4. Clique em "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure as origens autorizadas:
   - **Desenvolvimento**: `http://localhost:5173`
   - **Produção**: `https://seu-dominio.vercel.app`
6. Copie o Client ID gerado

## Configuração no Google Cloud Console

### Origens JavaScript autorizadas

- Desenvolvimento: `http://localhost:5173`
- Produção: `https://seu-dominio.vercel.app`

### URIs de redirecionamento autorizados

Não é necessário configurar URIs de redirecionamento para Google Identity Services, pois ele funciona via popup/modal.

### Tela de consentimento OAuth

1. Acesse "Tela de consentimento OAuth"
2. Configure:
   - **Tipo**: Externo
   - **Nome do app**: ArenaMobile
   - **Email de suporte**: seu-email@dominio.com
   - **Domínios autorizados**: seu-dominio.vercel.app
   - **Link para Termos de Serviço**: https://seu-dominio.vercel.app/termos-de-uso
   - **Link para Política de Privacidade**: https://seu-dominio.vercel.app/politica-de-privacidade

### Escopos necessários

Para login básico, os escopos padrão são suficientes:
- `openid`
- `email`
- `profile`

Estes escopos são incluídos automaticamente pelo Google Identity Services.

## Contrato da API Backend

### Endpoint: POST /login/google

**Request:**
```json
{
  "google_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdlMjc..."
}
```

**Response (sucesso):**
```json
{
  "access_token": "seu-token-jwt-aqui",
  "token_type": "bearer",
  "user_info": {
    "ra": "123456",
    "username": "joao.silva",
    "email": "joao.silva@gmail.com",
    "nome": "João Silva",
    "curso": "Ciência da Computação",
    "semestre": "6"
  }
}
```

**Response (erro):**
```json
{
  "detail": "Token do Google inválido"
}
```

### Validação do Token no Backend

O backend deve:

1. **Verificar a assinatura do token JWT**
   - Usar bibliotecas oficiais do Google
   - Python: `google-auth`
   - Node.js: `google-auth-library`

2. **Extrair informações do usuário**
   ```python
   from google.oauth2 import id_token
   from google.auth.transport import requests
   
   idinfo = id_token.verify_oauth2_token(
       token, 
       requests.Request(), 
       GOOGLE_CLIENT_ID
   )
   
   email = idinfo['email']
   name = idinfo['name']
   picture = idinfo['picture']
   ```

3. **Vincular com usuário existente**
   - Buscar usuário no banco por email
   - Criar novo usuário se não existir
   - Gerar access_token interno

4. **Retornar dados padronizados**
   - Token de acesso da aplicação
   - Informações do usuário

## Segurança

### HTTPS Obrigatório

- Google Identity Services exige HTTPS em produção
- Desenvolvimento permite HTTP apenas para localhost

### Token Expiration

- Tokens do Google expiram em 1 hora
- Validar tempo de expiração no backend
- Não armazenar tokens do Google no frontend

### CORS

Configure CORS no backend para permitir:
- `http://localhost:5173` (desenvolvimento)
- `https://seu-dominio.vercel.app` (produção)

### Content Security Policy

Adicione ao `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' https://accounts.google.com">
```

## Testes

### Teste Local

1. Configurar `.env.local` com Client ID válido
2. Iniciar servidor de desenvolvimento: `npm run dev`
3. Acessar: `http://localhost:5173`
4. Clicar em "Entrar com Google"
5. Verificar console para logs de debug

### Teste em Produção

1. Configurar variáveis de ambiente no Vercel
2. Fazer deploy: `vercel --prod`
3. Adicionar domínio de produção no Google Cloud Console
4. Testar fluxo completo de autenticação

## Troubleshooting

### Erro: "Google Identity Services não carregado"

- Verificar se o script foi carregado: `console.log(window.google)`
- Verificar bloqueadores de anúncios
- Verificar console do navegador para erros de CSP

### Erro: "Token inválido"

- Verificar se Client ID está correto
- Verificar se domínio está autorizado no Google Cloud Console
- Verificar se token não expirou (1 hora de validade)

### Popup não abre

- Verificar se navegador permite popups
- Verificar se está em contexto seguro (HTTPS ou localhost)
- Tentar limpar cache e cookies

### Erro de CORS

- Verificar configuração de CORS no backend
- Adicionar origem correta (com protocolo e porta)
- Verificar preflight requests (OPTIONS)

## Referências

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 for Web Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google Cloud Console](https://console.cloud.google.com)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Status da Implementação

✅ Frontend implementado com Google Identity Services  
✅ UI do botão de login estilizado  
✅ Fluxo de autenticação completo  
✅ Integração com AuthContext  
✅ Chamada para API backend  
✅ Armazenamento seguro de tokens  
✅ Tratamento de erros  
⏳ Backend endpoint `/login/google` (aguardando implementação)  
⏳ Configuração do Google Cloud Console (aguardando credenciais)  
⏳ Testes end-to-end  

## Próximos Passos

1. **Obter Google Client ID**
   - Criar projeto no Google Cloud Console
   - Configurar OAuth consent screen
   - Gerar Client ID

2. **Implementar endpoint no backend**
   - Criar rota POST /login/google
   - Validar token do Google
   - Retornar access_token da aplicação

3. **Testar fluxo completo**
   - Login com Google no ambiente local
   - Verificar armazenamento de tokens
   - Testar navegação após login

4. **Deploy em produção**
   - Configurar variáveis no Vercel
   - Adicionar domínio no Google Cloud Console
   - Testar em produção

5. **Monitoramento**
   - Adicionar analytics para login com Google
   - Monitorar taxa de erro
   - Coletar feedback dos usuários
