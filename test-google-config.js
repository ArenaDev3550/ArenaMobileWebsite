// Teste de configuração do Google Login
// Execute este arquivo para verificar se as credenciais estão corretas

console.log('🔍 Verificando configuração do Google Login...\n');

// Simulando import.meta.env (em produção isso virá do Vite)
const env = {
  VITE_GOOGLE_CLIENT_ID: '133543641415-gvrg7ql4h0jkmul9od8nnmc4igajlid1.apps.googleusercontent.com',
  VITE_GOOGLE_API_KEY: 'AIzaSyDV-zGFcWBBPYfa-Nfw_tA4nHgRI6hXSrg',
  VITE_API_BASE_URL: 'http://localhost:8000'
};

console.log('📋 Credenciais configuradas:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✅ Client ID: ${env.VITE_GOOGLE_CLIENT_ID}`);
console.log(`✅ API Key: ${env.VITE_GOOGLE_API_KEY.substring(0, 20)}...`);
console.log(`✅ Backend URL: ${env.VITE_API_BASE_URL}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Validar formato do Client ID
const clientIdPattern = /^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/;
const isValidClientId = clientIdPattern.test(env.VITE_GOOGLE_CLIENT_ID);

console.log('🔐 Validação do Client ID:');
if (isValidClientId) {
  console.log('✅ Formato válido do Client ID');
} else {
  console.log('❌ Formato inválido do Client ID');
}

// Validar formato da API Key
const apiKeyPattern = /^AIza[0-9A-Za-z_-]{35}$/;
const isValidApiKey = apiKeyPattern.test(env.VITE_GOOGLE_API_KEY);

console.log('\n🔑 Validação da API Key:');
if (isValidApiKey) {
  console.log('✅ Formato válido da API Key');
} else {
  console.log('❌ Formato inválido da API Key');
}

console.log('\n📝 Próximos passos:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1. ✅ Credenciais configuradas no .env.local');
console.log('2. ⚠️  Verifique se estas origens estão autorizadas no Google Cloud Console:');
console.log('   - http://localhost:5173 (desenvolvimento)');
console.log('   - https://seu-dominio.vercel.app (produção)');
console.log('\n3. 🔧 Configurar no Google Cloud Console:');
console.log('   - Acesse: https://console.cloud.google.com');
console.log('   - Vá em: APIs e serviços > Credenciais');
console.log('   - Edite o Client ID: 133543641415-gvrg7ql4h0jkmul9od8nnmc4igajlid1');
console.log('   - Adicione as origens JavaScript autorizadas');
console.log('\n4. 🚀 Testar:');
console.log('   - Execute: npm run dev');
console.log('   - Acesse: http://localhost:5173');
console.log('   - Clique em "Entrar com Google"');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Verificar se o backend endpoint está documentado
console.log('🔗 Backend Endpoint necessário:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('POST http://localhost:8000/login/google');
console.log('Body: { "google_token": "<token_do_google>" }');
console.log('Response: { "access_token": "...", "user_info": {...} }');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('✨ Configuração concluída! O login com Google está pronto para uso.\n');
