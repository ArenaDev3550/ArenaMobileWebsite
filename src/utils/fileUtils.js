/**
 * Salva o conteúdo HTML em um arquivo no diretório public
 */
export async function saveContentToFile(content, filename) {
  try {
    const fullHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root {
        --primary-color: #007bff;
        --surface-color: #f8f9fa;
        --text-color: #333;
        --border-color: #ddd;
      }

      [data-theme="dark"] {
        --primary-color: #0d6efd;
        --surface-color: #343a40;
        --text-color: #f8f9fa;
        --border-color: #495057;
      }

      body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
        color: var(--text-color);
        background-color: var(--surface-color);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
      }

      th, td {
        padding: 8px;
        border: 1px solid var(--border-color);
        text-align: left;
      }

      th {
        background-color: var(--primary-color);
        color: white;
      }

      tr:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.05);
      }

      a {
        color: var(--primary-color);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      button, .btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover, .btn:hover {
        opacity: 0.9;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      @media (max-width: 768px) {
        body {
          padding: 10px;
        }
        table {
          font-size: 14px;
        }
      }
    </style>
    <script>
      // Função para sincronizar o tema com o app principal
      function updateTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      }

      // Escuta mensagens do app principal
      window.addEventListener('message', (event) => {
        if (event.data.type === 'theme-change') {
          updateTheme(event.data.isDark);
        }
      });
    </script>
  </head>
  <body>
    ${content}
  </body>
</html>
    `;

    // Em produção, você precisará implementar uma forma de salvar o arquivo
    // Por enquanto, vamos apenas retornar um blob URL
    const blob = new Blob([fullHtml], { type: 'text/html' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error);
    throw error;
  }
}