@echo off
echo Iniciando el proyecto Mochimo...
echo.

echo Iniciando Backend (Puerto 3000)...
start "Backend" cmd /k "cd backend && npm run start:dev"

timeout /t 3 /nobreak > nul

echo Iniciando Frontend (Puerto 5173)...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Ambos servicios se están iniciando...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
pause