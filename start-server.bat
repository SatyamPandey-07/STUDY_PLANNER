@echo off
echo.
echo ===============================================
echo   Smart Study Planner - Local Server Setup
echo ===============================================
echo.
echo This will start a local server for Google Calendar integration
echo Server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server when done
echo.

REM Check if Python 3 is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Found Python - Starting HTTP server...
    echo [i] Opening browser in 3 seconds...
    timeout /t 3 /nobreak >nul
    start http://localhost:3000
    python -m http.server 3000
    goto :end
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Found Node.js - Starting live-server...
    echo [i] Installing live-server if needed...
    echo [i] Opening browser in 3 seconds...
    timeout /t 3 /nobreak >nul
    start http://localhost:3000
    npx live-server --port=3000 --no-browser
    goto :end
)

REM Check if PHP is available
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Found PHP - Starting built-in server...
    echo [i] Opening browser in 3 seconds...
    timeout /t 3 /nobreak >nul
    start http://localhost:3000
    php -S localhost:3000
    goto :end
)

REM No supported server found
echo [✗] ERROR: No supported server found!
echo.
echo Please install one of the following:
echo   • Python 3: https://python.org/downloads/
echo   • Node.js: https://nodejs.org/download/
echo   • PHP: https://php.net/downloads/
echo.
echo Or use any other local server of your choice on port 3000
echo.
echo Alternative quick servers:
echo   • VS Code Live Server extension
echo   • Python: python -m http.server 3000
echo   • Node: npx serve -p 3000
echo.

:end
echo.
echo Server stopped. Press any key to exit...
pause >nul
