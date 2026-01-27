# 🔐 Login com Google + Permissões do Calendar

## ✨ Implementação Completa

O login com Google agora solicita **automaticamente** as permissões de acesso ao Google Calendar, eliminando a necessidade de sincronizar novamente na tela de agendamentos.

## 🔄 Fluxo Completo

```
1. Usuário clica em "Entrar com Google"
   ↓
2. Popup do Google abre solicitando:
   ✅ Acesso ao perfil (email, nome, foto)
   ✅ Acesso ao Google Calendar (criar/editar eventos)
   ↓
3. Usuário autoriza ambas as permissões
   ↓
4. Google retorna access_token com permissões completas
   ↓
5. Frontend busca informações do usuário
   ↓
6. Frontend salva access_token no localStorage
   ↓
7. Frontend envia access_token para backend
   ↓
8. Backend valida token e retorna dados do usuário
   ↓
9. Usuário é redirecionado para /home
   ↓
10. Na tela de Agendamentos, o Calendar JÁ ESTÁ AUTORIZADO ✅
```

## 📝 Alterações Implementadas

### 1. LoginPage.jsx - Scope Expandido

**Antes:**
```javascript
scope: 'openid email profile'
```

**Depois:**
```javascript
scope: 'openid email profile https://www.googleapis.com/auth/calendar.events'
```

**Resultado**: O popup agora pede permissão para:
- ✅ Ver informações básicas do perfil
- ✅ Ver e gerenciar eventos do Google Calendar

### 2. Salvamento do Token

```javascript
// Salvar access_token para uso posterior no Calendar
localStorage.setItem('google_access_token', accessToken);
localStorage.setItem('google_user_info', JSON.stringify(userInfo));
```

### 3. googleCalendarServiceV2.js - Priorização do Token

O serviço do Calendar agora verifica **PRIMEIRO** se existe token do login:

```javascript
restoreFromCookies() {
  // PRIORIDADE 1: Token do login com Google (localStorage)
  const googleAccessToken = localStorage.getItem('google_access_token');
  if (googleAccessToken) {
    this.accessToken = googleAccessToken;
    this.isSignedIn = true;
    console.log('✅ Token do Calendar já disponível (do login)');
    return;
  }
  
  // PRIORIDADE 2: Token dos cookies (método antigo)
  const authData = CookieManager.getGoogleAuth();
  // ...
}
```

### 4. Novo Método: hasCalendarPermissions()

```javascript
hasCalendarPermissions() {
  const googleAccessToken = localStorage.getItem('google_access_token');
  if (googleAccessToken) {
    console.log('✅ Permissões do Calendar já concedidas no login');
    return true;
  }
  return false;
}
```

## 🎯 Uso na Tela de Agendamentos

Na página de Agendamentos, você pode verificar se precisa pedir permissão:

```javascript
import googleCalendarServiceV2 from '../services/googleCalendarServiceV2';

const Agendamentos = () => {
  useEffect(() => {
    const checkCalendarAuth = async () => {
      if (googleCalendarServiceV2.hasCalendarPermissions()) {
        // ✅ JÁ TEM PERMISSÃO (feita no login)
        console.log('✅ Calendar já autorizado');
        // Carregar eventos diretamente
        const events = await googleCalendarServiceV2.getEvents();
      } else {
        // ⚠️ NÃO TEM PERMISSÃO (precisa pedir)
        console.log('⚠️ Precisa autorizar Calendar');
        await googleCalendarServiceV2.signIn();
      }
    };
    
    checkCalendarAuth();
  }, []);
  
  // ...
}
```

## 🔒 Permissões Solicitadas

### Scope: openid email profile
- **Nome**: Informações básicas do perfil
- **Permite**: Ver nome, email e foto
- **Uso**: Identificação do usuário na aplicação

### Scope: https://www.googleapis.com/auth/calendar.events
- **Nome**: Ver e gerenciar eventos do Google Calendar
- **Permite**: 
  - ✅ Criar novos eventos
  - ✅ Editar eventos existentes
  - ✅ Deletar eventos
  - ✅ Listar eventos
- **Uso**: Sincronização de agendamentos ARENA com Google Calendar

## 🧪 Como Testar

### 1. Fazer Login

```bash
npm run dev
```

1. Acesse `http://localhost:5173`
2. Clique em **"Entrar com Google"**
3. **Observe o popup**: Deve pedir duas permissões
   - ✅ Acesso ao perfil
   - ✅ Acesso ao Google Calendar
4. Autorize ambas
5. Login completa

### 2. Verificar Token Salvo

Abra o console do navegador (F12):

```javascript
// Verificar se token foi salvo
console.log(localStorage.getItem('google_access_token'));
// Deve retornar: "ya29.a0AfH6SM..."

// Verificar info do usuário
console.log(JSON.parse(localStorage.getItem('google_user_info')));
// Deve retornar: { email: "...", name: "...", picture: "..." }
```

### 3. Testar na Tela de Agendamentos

1. Navegue para `/agendamentos`
2. Abra o console
3. Deve aparecer: `✅ Token do Calendar já disponível (do login)`
4. **NÃO** deve aparecer popup solicitando permissões novamente

## 📊 Logs no Console

### Login bem-sucedido:

```
🔵 Botão Google clicado
🔧 Inicializando Google Token Client...
📅 Solicitando permissões: Login + Google Calendar
📱 Solicitando token com permissões de Calendar (popup vai abrir)...
📬 Resposta do Token Client: {access_token: "...", scope: "openid email profile https://www.googleapis.com/auth/calendar.events"}
✅ Access token recebido com permissões do Calendar
📅 Escopos autorizados: openid email profile https://www.googleapis.com/auth/calendar.events
👤 Buscando informações do usuário...
✅ Informações do usuário: {email: "...", name: "..."}
📧 Email: usuario@gmail.com
👤 Nome: Nome do Usuário
📅 Permissões do Calendar: CONCEDIDAS
💾 Salvando access_token do Google para usar no Calendar...
🔄 Enviando para backend para autenticação...
✅ Login completo! Redirecionando...
```

### Ao entrar na tela de Agendamentos:

```
✅ Autenticação restaurada do login com Google
📅 Token do Calendar já está disponível (do login)
✅ Permissões do Calendar já foram concedidas no login
```

## 🔧 Backend: O Que Recebe

O backend recebe via `POST /login/google`:

```json
{
  "google_token": "ya29.a0AfH6SM..."
}
```

Este `google_token` é um **access_token** válido que:
- ✅ Pode ser usado para buscar dados do usuário
- ✅ Pode ser validado fazendo request para Google API
- ✅ **Importante**: Inclui permissões do Calendar

### Validação no Backend (Python exemplo)

```python
import requests

def validate_google_token(access_token):
    # Validar token com Google
    response = requests.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        headers={'Authorization': f'Bearer {access_token}'}
    )
    
    if response.status_code == 200:
        user_info = response.json()
        return {
            'email': user_info['email'],
            'name': user_info['name'],
            'picture': user_info['picture'],
            'verified_email': user_info.get('verified_email', False)
        }
    else:
        raise Exception('Token inválido')

@app.post("/login/google")
async def login_with_google(request: GoogleLoginRequest):
    try:
        # Validar token
        user_info = validate_google_token(request.google_token)
        
        # Buscar ou criar usuário no banco
        user = get_or_create_user(user_info['email'], user_info['name'])
        
        # Gerar token interno da aplicação
        access_token = create_jwt_token(user.id)
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_info": {
                "ra": user.ra,
                "username": user.username,
                "email": user.email,
                "nome": user.nome
            }
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
```

## ⚠️ Importante: Configuração do Google Cloud Console

Para o scope do Calendar funcionar, você precisa:

1. **Acessar**: https://console.cloud.google.com/apis/credentials

2. **Editar Client ID**: `133543641415-gvrg7ql4h0jkmul9od8nnmc4igajlid1`

3. **Verificar/Adicionar APIs habilitadas**:
   - ✅ Google Calendar API
   - ✅ Google+ API (ou People API)

4. **Tela de Consentimento OAuth**:
   - Adicionar scope: `https://www.googleapis.com/auth/calendar.events`
   - Status: Pode ficar em "Testing" inicialmente
   - Adicionar usuários de teste se estiver em modo Testing

## 🔐 Segurança

### Access Token Expiration

- **Validade**: ~1 hora (3600 segundos)
- **Renovação**: Quando expirar, usuário precisa fazer login novamente
- **Armazenamento**: localStorage (local ao navegador, não vai para servidor)

### Revogação de Permissões

Se o usuário quiser revogar acesso:

1. Ir em: https://myaccount.google.com/permissions
2. Encontrar "ArenaMobile"
3. Clicar em "Remover acesso"

Depois disso, precisará autorizar novamente no próximo login.

## ✅ Checklist de Implementação

- [x] Adicionar scope do Calendar no `initTokenClient`
- [x] Salvar access_token no localStorage
- [x] Salvar user_info no localStorage
- [x] Integrar com `loginWithGoogle` do AuthContext
- [x] Atualizar `googleCalendarServiceV2` para usar token do login
- [x] Adicionar método `hasCalendarPermissions()`
- [x] Logs detalhados para debug
- [ ] Testar login com Google
- [ ] Verificar popup solicita ambas permissões
- [ ] Confirmar token salvo no localStorage
- [ ] Testar tela de Agendamentos não pede permissão novamente
- [ ] Habilitar Google Calendar API no Google Cloud Console
- [ ] Adicionar scope na tela de consentimento OAuth

## 🎉 Benefícios

1. **UX Melhorada**: Usuário autoriza tudo de uma vez
2. **Menos Cliques**: Não precisa sincronizar Calendar depois
3. **Mais Rápido**: Agendamentos já funcionam imediatamente
4. **Menos Confusão**: Um único fluxo de autorização
5. **Mais Seguro**: Token único com permissões claras

---

**Status**: ✅ **IMPLEMENTADO**  
**Próximo passo**: Testar login e verificar permissões  
**Documentação completa**: Este arquivo
