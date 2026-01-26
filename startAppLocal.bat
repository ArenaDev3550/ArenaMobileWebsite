@echo off
title Arena Mobile - Desenvolvimento Local
color 0A

echo.
echo ========================================
echo    Arena Mobile - Inicializacao Local
echo ========================================
echo.

REM Verificar se Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado: 
node --version
echo.

REM Verificar se node_modules existe
if not exist "node_modules\" (
    echo [AVISO] Pasta node_modules nao encontrada.
    echo [INFO] Instalando dependencias...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERRO] Falha ao instalar dependencias!
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas com sucesso!
    echo.
) else (
    echo [OK] Dependencias ja instaladas.
    echo.
)

REM Verificar se arquivo .env.local existe
if not exist ".env.local" (
    echo [AVISO] Arquivo .env.local nao encontrado!
    echo.
    echo Criando arquivo .env.local a partir de .env.example...
    if exist ".env.example" (
        copy .env.example .env.local >nul
        echo.
        echo [OK] Arquivo .env.local criado!
        echo [INFO] IMPORTANTE: Configure suas variaveis de ambiente em .env.local
        echo.
    ) else (
        echo [AVISO] Arquivo .env.example nao encontrado.
        echo [INFO] Continue mesmo assim, usando valores padrao.
        echo.
    )
)

echo ========================================
echo    Iniciando Servidor de Desenvolvimento
echo ========================================
echo.
echo [INFO] Servidor sera iniciado em: http://localhost:5173
echo [INFO] Para parar o servidor, pressione Ctrl+C
echo.

REM Aguardar 2 segundos antes de iniciar
timeout /t 2 /nobreak >nul

REM Iniciar servidor de desenvolvimento
call npm run dev

REM Se o servidor foi encerrado
echo.
echo ========================================
echo    Servidor Encerrado
echo ========================================
echo.
pause
