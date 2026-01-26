# Arena Mobile - Aplicação Web

Sistema completo de gerenciamento acadêmico com integração ao Google Calendar.

## 🚀 Deploy no Vercel

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Credenciais Google OAuth (Client ID e API Key)

### Passos para Deploy

#### 1. Preparar o Repositório
```bash
git add .
git commit -m "Preparar para deploy no Vercel"
git push origin main
```

#### 2. Importar Projeto no Vercel
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe seu repositório do GitHub
3. Configure o projeto:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### 3. Configurar Variáveis de Ambiente

No painel do Vercel, vá em:
**Settings → Environment Variables**

Adicione as seguintes variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_GOOGLE_CLIENT_ID` | Seu Client ID do Google | Production, Preview, Development |
| `VITE_GOOGLE_API_KEY` | Sua API Key do Google | Production, Preview, Development |

**Como obter as credenciais Google:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione existente
3. Ative as APIs:
   - Google Calendar API
   - Google Identity Services
4. Em "Credenciais", crie:
   - **Client ID OAuth 2.0** (tipo: Aplicação Web)
   - **API Key** (com restrição para Calendar API)
5. Adicione a URL do Vercel nas "Origens JavaScript autorizadas"

#### 4. Deploy
1. Clique em **Deploy**
2. Aguarde o build finalizar
3. Acesse sua aplicação na URL fornecida

### 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.example .env.local

# Editar .env.local com suas credenciais

# Iniciar servidor de desenvolvimento
npm run dev
```

### 📦 Build Local

```bash
# Gerar build de produção
npm run build

# Visualizar build localmente
npm run preview
```

### 🔍 Verificação

Após o deploy, verifique se:
- [ ] A aplicação carrega corretamente
- [ ] Login com Google funciona
- [ ] Integração com Google Calendar está ativa
- [ ] Todas as páginas estão acessíveis
- [ ] As variáveis de ambiente foram aplicadas

### 🆘 Troubleshooting

**Erro de CORS:**
- Verifique se a URL do Vercel está nas origens autorizadas do Google

**Erro nas variáveis de ambiente:**
- Certifique-se de usar o prefixo `VITE_`
- Faça um novo deploy após adicionar variáveis

**Build falha:**
- Verifique os logs no Vercel
- Teste o build localmente: `npm run build`

### 📱 Domínio Customizado

Para usar um domínio próprio:
1. Vá em **Settings → Domains**
2. Adicione seu domínio
3. Configure os registros DNS conforme instruções
4. Atualize as origens autorizadas no Google Console

---

## 🛠️ Tecnologias

- React 19
- Vite
- Styled Components
- Framer Motion
- Google Calendar API
- React Router
- Phosphor Icons

## 📄 Licença

Propriedade do Colégio Arena - Todos os direitos reservados
