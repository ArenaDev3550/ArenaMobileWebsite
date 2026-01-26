#!/bin/bash

# Script de verificação pré-deploy para Vercel
# Execute este script antes de fazer o deploy

echo "🔍 Verificando projeto Arena Mobile para deploy no Vercel..."
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules não encontrado. Execute: npm install"
    exit 1
fi

# Verificar se .env.example existe
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example não encontrado"
    exit 1
else
    echo "✅ .env.example encontrado"
fi

# Verificar se vercel.json existe
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json não encontrado"
    exit 1
else
    echo "✅ vercel.json encontrado"
fi

# Verificar se .gitignore está configurado
if grep -q ".env.local" .gitignore; then
    echo "✅ .gitignore configurado corretamente"
else
    echo "⚠️  Verifique se .env.local está no .gitignore"
fi

echo ""
echo "🏗️  Testando build do projeto..."

# Tentar fazer build
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build concluído com sucesso!"
    echo ""
    echo "📋 Checklist para deploy no Vercel:"
    echo "   [ ] Variáveis de ambiente configuradas no Vercel"
    echo "   [ ] VITE_GOOGLE_CLIENT_ID"
    echo "   [ ] VITE_GOOGLE_API_KEY"
    echo "   [ ] VITE_API_BASE_URL"
    echo "   [ ] URL do Vercel nas origens autorizadas do Google"
    echo ""
    echo "📚 Documentação:"
    echo "   - VERCEL_ENV_SETUP.md - Como configurar variáveis"
    echo "   - DEPLOY.md - Guia completo de deploy"
    echo ""
    echo "🚀 Pronto para deploy!"
else
    echo ""
    echo "❌ Build falhou. Corrija os erros antes de fazer deploy."
    exit 1
fi
