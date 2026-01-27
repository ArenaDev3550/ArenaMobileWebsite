# ⚙️ Configuração do Google Cloud Console

## 📋 Credenciais Configuradas

✅ **Client ID**: `133543641415-gvrg7ql4h0jkmul9od8nnmc4igajlid1.apps.googleusercontent.com`  
✅ **API Key**: `AIzaSyDV-zGFcWBBPYfa-Nfw_tA4nHgRI6hXSrg`

## 🔧 Configuração Necessária no Google Cloud Console

### 1. Acessar o Console

1. Acesse: [Google Cloud Console](https://console.cloud.google.com)
2. Selecione o projeto que contém as credenciais acima
3. Vá em: **APIs e serviços** > **Credenciais**

### 2. Configurar Origens JavaScript Autorizadas

Clique no Client ID `133543641415-gvrg7ql4h0jkmul9od8nnmc4igajlid1` e adicione:

#### Desenvolvimento
```
http://localhost:5173
http://localhost:5174
http://127.0.0.1:5173
```

#### Produção (quando fizer deploy)
```
https://seu-dominio.vercel.app
https://seu-projeto.vercel.app
```

### 3. Configurar Tela de Consentimento OAuth

1. Vá em: **APIs e serviços** > **Tela de consentimento OAuth**
2. Configure:
   - **Tipo**: Externo
   - **Nome do app**: ArenaMobile
   - **Email de suporte**: seu-email@dominio.com
   - **Logo do app**: (opcional)
   - **Domínios autorizados**: `vercel.app` (quando fizer deploy)
   - **Link para Termos**: `https://seu-dominio.vercel.app/termos-de-uso`
   - **Link para Privacidade**: `https://seu-dominio.vercel.app/politica-de-privacidade`

### 4. Escopos OAuth

Os escopos necessários já estão incluídos automaticamente:
- ✅ `openid` - Autenticação básica
- ✅ `email` - Acesso ao email do usuário
- ✅ `profile` - Acesso ao nome e foto do usuário
- ✅ `https://www.googleapis.com/auth/calendar.events` - Gerenciar eventos do calendário

### 5. Usuários de Teste (Ambiente de Teste)

Se o app estiver em modo de teste, adicione emails autorizados:
1. Vá em **Tela de consentimento OAuth**
2. Role até **Usuários de teste**
3. Clique em **+ ADD USERS**
4. Adicione os emails que podem testar o app

## 🚀 Testar a Configuração

### Desenvolvimento Local

```bash
# 1. Iniciar servidor de desenvolvimento
npm run dev

# 2. Acessar aplicação
# http://localhost:5173

# 3. Clicar em "Entrar com Google"

# 4. Verificar console do navegador para logs
```

### Verificar Configuração

Execute o script de teste:
```bash
node test-google-config.js
```

## 🔍 Troubleshooting

### Erro: "redirect_uri_mismatch"

**Causa**: Origem não está autorizada no Google Cloud Console

**Solução**:
1. Copie a URL exata do erro
2. Adicione em **Origens JavaScript autorizadas**
3. Aguarde alguns minutos para propagar

### Erro: "popup_closed_by_user"

**Causa**: Usuário fechou o popup antes de completar

**Solução**: Normal, não requer ação

### Erro: "access_denied"

**Causa**: Usuário negou permissão ou não está na lista de teste

**Solução**:
1. Se em modo teste, adicionar usuário em **Usuários de teste**
2. Ou publicar o app para produção

### Erro: "idpiframe_initialization_failed"

**Causa**: Cookies bloqueados ou navegador em modo privado

**Solução**:
1. Desabilitar bloqueadores de anúncios
2. Permitir cookies de terceiros para Google
3. Usar modo normal do navegador

### Erro: "invalid_client"

**Causa**: Client ID incorreto ou mal formatado

**Solução**:
1. Verificar `.env.local` tem Client ID correto
2. Reiniciar servidor de desenvolvimento
3. Limpar cache do navegador

## 📱 Configuração para Produção (Vercel)

### 1. Adicionar Variáveis de Ambiente no Vercel

```bash
# Via CLI
vercel env add VITE_GOOGLE_CLIENT_ID
# Cole: 133543641415-gvrg7ql4h0jkmul9od8nnmc4igajlid1.apps.googleusercontent.com

vercel env add VITE_GOOGLE_API_KEY
# Cole: AIzaSyDV-zGFcWBBPYfa-Nfw_tA4nHgRI6hXSrg

vercel env add VITE_API_BASE_URL
# Cole: https://seu-backend-api.com
```

Ou pelo dashboard:
1. Acesse: https://vercel.com/seu-usuario/seu-projeto
2. Vá em: **Settings** > **Environment Variables**
3. Adicione as 3 variáveis acima

### 2. Configurar Domínio no Google Cloud Console

Após deploy, adicione a URL do Vercel:
1. Copie a URL de produção (ex: `https://arenamobile.vercel.app`)
2. Adicione em **Origens JavaScript autorizadas**
3. Aguarde alguns minutos

### 3. Deploy

```bash
# Deploy para produção
vercel --prod

# Testar no domínio
# https://seu-app.vercel.app
```

## ✅ Checklist de Configuração

- [x] Credenciais configuradas no `.env.local`
- [ ] Origens autorizadas no Google Cloud Console
- [ ] Tela de consentimento configurada
- [ ] Links de Termos e Privacidade configurados
- [ ] Usuários de teste adicionados (se necessário)
- [ ] Teste local funcionando
- [ ] Variáveis configuradas no Vercel (quando for fazer deploy)
- [ ] Domínio de produção autorizado no Google (quando for fazer deploy)
- [ ] Teste em produção funcionando (quando for fazer deploy)

## 📞 Suporte

Se encontrar problemas:

1. **Verifique logs do console do navegador** (F12)
2. **Execute o teste**: `node test-google-config.js`
3. **Consulte a documentação**: [GOOGLE_LOGIN_SETUP.md](GOOGLE_LOGIN_SETUP.md)
4. **Debug info no código**:
   ```javascript
   // No console do navegador
   console.log(window.google); // Deve mostrar objeto
   console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID); // Deve mostrar Client ID
   ```

## 🔗 Links Úteis

- [Google Cloud Console](https://console.cloud.google.com)
- [Documentação Google Identity Services](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
- [Verificar configuração do projeto](https://console.cloud.google.com/apis/credentials)

---

**Status**: ✅ Credenciais configuradas e prontas para uso  
**Última atualização**: Janeiro 2026
