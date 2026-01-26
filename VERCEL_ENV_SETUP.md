# 🔧 Configuração de Variáveis de Ambiente no Vercel

## Variáveis Necessárias

Acesse: **Settings → Environment Variables** no painel do Vercel

### 1. Google OAuth & Calendar API

| Variável | Descrição | Onde obter |
|----------|-----------|------------|
| `VITE_GOOGLE_CLIENT_ID` | Client ID OAuth 2.0 | [Google Cloud Console](https://console.cloud.google.com) |
| `VITE_GOOGLE_API_KEY` | API Key do Google | [Google Cloud Console](https://console.cloud.google.com) |

### 2. Backend API

| Variável | Descrição | Valor |
|----------|-----------|-------|
| `VITE_API_BASE_URL` | URL do backend | URL da sua API backend (ex: `https://api.seudominio.com`) |

---

## 📋 Passo a Passo - Configuração no Vercel

### Método 1: Interface Web

1. **Acesse seu projeto no Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Selecione seu projeto

2. **Abra as configurações**
   - Clique em **Settings**
   - No menu lateral, clique em **Environment Variables**

3. **Adicione cada variável**
   - Clique em **Add New**
   - **Name**: Nome da variável (ex: `VITE_GOOGLE_CLIENT_ID`)
   - **Value**: Valor da variável
   - **Environments**: Selecione todos (Production, Preview, Development)
   - Clique em **Save**

4. **Repita para todas as variáveis**

5. **Faça um novo deploy**
   - Vá em **Deployments**
   - Clique nos 3 pontos do último deploy
   - Clique em **Redeploy**

### Método 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Adicionar variáveis
vercel env add VITE_GOOGLE_CLIENT_ID
vercel env add VITE_GOOGLE_API_KEY
vercel env add VITE_API_BASE_URL

# Fazer deploy
vercel --prod
```

---

## 🔑 Como Obter as Credenciais Google

### Passo 1: Criar Projeto no Google Cloud

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione existente
3. Nome sugerido: "Arena Mobile"

### Passo 2: Ativar APIs

1. No menu, vá em **APIs e Serviços → Biblioteca**
2. Pesquise e ative:
   - **Google Calendar API**
   - **Google+ API** (para login)

### Passo 3: Criar Credenciais OAuth 2.0

1. Vá em **APIs e Serviços → Credenciais**
2. Clique em **+ CRIAR CREDENCIAIS → ID do cliente OAuth 2.0**
3. Configure:
   - **Tipo de aplicativo**: Aplicação da Web
   - **Nome**: Arena Mobile Web
   - **Origens JavaScript autorizadas**:
     ```
     https://seu-projeto.vercel.app
     http://localhost:5173
     ```
   - **URIs de redirecionamento autorizados**:
     ```
     https://seu-projeto.vercel.app
     http://localhost:5173
     ```
4. Clique em **Criar**
5. **Copie o Client ID** gerado

### Passo 4: Criar API Key

1. Ainda em **Credenciais**, clique em **+ CRIAR CREDENCIAIS → Chave de API**
2. **Copie a API Key** gerada
3. Clique em **Restringir chave**
4. Em **Restrições de API**, selecione:
   - ✅ Google Calendar API
5. Clique em **Salvar**

### Passo 5: Configurar Tela de Consentimento

1. Vá em **APIs e Serviços → Tela de consentimento OAuth**
2. Configure:
   - **Tipo de usuário**: Externo
   - **Nome do app**: Arena Mobile
   - **E-mail de suporte**: seu-email@dominio.com
   - **Domínios autorizados**: vercel.app (ou seu domínio)
   - **Escopos**: adicione:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `.../auth/calendar.readonly`

---

## ✅ Checklist de Configuração

- [ ] Projeto criado no Google Cloud Console
- [ ] Google Calendar API ativada
- [ ] Client ID OAuth 2.0 criado
- [ ] API Key criada e restrita
- [ ] Origens JavaScript configuradas com URL do Vercel
- [ ] Tela de consentimento configurada
- [ ] `VITE_GOOGLE_CLIENT_ID` adicionada no Vercel
- [ ] `VITE_GOOGLE_API_KEY` adicionada no Vercel
- [ ] `VITE_API_BASE_URL` adicionada no Vercel
- [ ] Novo deploy realizado após adicionar variáveis
- [ ] Login com Google testado e funcionando

---

## 🚨 Importante

- **NUNCA** commite arquivos `.env` ou `.env.local` no Git
- As variáveis devem ter o prefixo `VITE_` para serem expostas no frontend
- Após adicionar variáveis, sempre faça um **redeploy**
- Teste em **Preview** antes de promover para **Production**

---

## 🔍 Verificar Variáveis

Para verificar se as variáveis estão sendo carregadas:

```javascript
// No console do navegador (F12)
console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
console.log(import.meta.env.VITE_API_BASE_URL);
```

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs de build no Vercel
2. Confirme que todas as variáveis foram adicionadas
3. Verifique se as URLs estão corretas nas origens autorizadas do Google
4. Certifique-se de ter feito um redeploy após adicionar as variáveis
