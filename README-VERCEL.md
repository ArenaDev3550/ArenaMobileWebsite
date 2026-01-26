# 🚀 Deploy Rápido no Vercel - Arena Mobile

## ✅ Projeto Pronto para Deploy

Seu projeto já está configurado para deploy no Vercel!

---

## 📋 3 Passos para Deploy

### 1️⃣ Push para o GitHub

```bash
git add .
git commit -m "Preparar para deploy no Vercel"
git push origin main
```

### 2️⃣ Importar no Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte seu GitHub
3. Selecione o repositório
4. Clique em **Deploy**

### 3️⃣ Configurar Variáveis de Ambiente

No Vercel: **Settings → Environment Variables**

Adicione estas 3 variáveis:

| Nome | Valor | Onde conseguir |
|------|-------|----------------|
| `VITE_GOOGLE_CLIENT_ID` | Seu Client ID | [Google Cloud Console](https://console.cloud.google.com) → Credenciais |
| `VITE_GOOGLE_API_KEY` | Sua API Key | [Google Cloud Console](https://console.cloud.google.com) → Credenciais |
| `VITE_API_BASE_URL` | URL do backend | URL da sua API (ex: `https://api.seudominio.com`) |

**Importante**: Marque todas as opções (Production, Preview, Development)

---

## 🔑 Como Obter Google Client ID e API Key (Resumo)

### Quick Start Google Cloud:

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie novo projeto
3. **APIs & Serviços → Biblioteca**: Ative "Google Calendar API"
4. **Credenciais → Criar Credenciais**:
   - **OAuth 2.0 Client ID**: Para login
   - **API Key**: Para Calendar API
5. Configure **Origens JavaScript autorizadas**:
   - Adicione: `https://seu-projeto.vercel.app`

📖 **Guia detalhado**: Ver arquivo `VERCEL_ENV_SETUP.md`

---

## ⚡ Deploy Rápido via CLI (Opcional)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod
```

---

## ✅ Checklist Final

Antes do deploy, verifique:

- [ ] `.gitignore` inclui `.env` e `.env.local`
- [ ] Build funciona: `npm run build`
- [ ] Variáveis de ambiente prontas
- [ ] Google Cloud Console configurado
- [ ] URLs autorizadas incluem domínio do Vercel

---

## 📁 Arquivos de Configuração Criados

| Arquivo | Descrição |
|---------|-----------|
| `vercel.json` | Configuração do Vercel (rotas, headers, etc) |
| `.env.example` | Template de variáveis de ambiente |
| `VERCEL_ENV_SETUP.md` | **Guia COMPLETO** de configuração |
| `DEPLOY.md` | Documentação detalhada de deploy |
| `.gitignore` | Arquivos sensíveis ignorados |

---

## 🆘 Problemas Comuns

### Build falha no Vercel
- Verifique os logs em **Deployments → Ver logs**
- Teste localmente: `npm run build`

### Login Google não funciona
- Verifique se a URL do Vercel está nas origens autorizadas
- Confirme que as variáveis `VITE_GOOGLE_*` estão configuradas
- Faça um redeploy após adicionar variáveis

### Variáveis de ambiente não funcionam
- Certifique-se de usar prefixo `VITE_`
- Faça **redeploy** após adicionar variáveis
- Verifique se marcou todos os ambientes (Prod, Preview, Dev)

---

## 📞 Suporte

**Documentação Completa**: Leia `VERCEL_ENV_SETUP.md` e `DEPLOY.md`

**Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

## 🎉 Após o Deploy

1. Acesse a URL fornecida pelo Vercel
2. Teste o login com Google
3. Verifique todas as funcionalidades
4. Configure domínio customizado (opcional)

**URL do projeto**: `https://seu-projeto.vercel.app`

---

*Desenvolvido para Colégio Arena - Sistema de Gestão Acadêmica*
