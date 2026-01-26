// Teste simples de cookies para debug
console.log('🧪 Testando cookies...');

// Função simples para testar cookies
function testCookies() {
  console.log('1. Protocolo atual:', window.location.protocol);
  
  // Tentar criar um cookie simples
  document.cookie = 'teste=valor123; path=/; SameSite=Lax';
  console.log('2. Cookie criado');
  
  // Verificar se foi criado
  const allCookies = document.cookie;
  console.log('3. Todos os cookies:', allCookies);
  
  // Tentar recuperar o cookie
  const testValue = getCookieValue('teste');
  console.log('4. Valor recuperado:', testValue);
  
  return testValue === 'valor123';
}

function getCookieValue(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Executar teste quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testCookies);
} else {
  testCookies();
}

// Exportar para o console global para debug manual
window.testCookies = testCookies;
window.getCookieValue = getCookieValue;

export { testCookies, getCookieValue };