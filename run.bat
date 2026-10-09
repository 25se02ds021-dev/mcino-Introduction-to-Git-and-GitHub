@echo off
title Personal Blog - Local Server
cls

echo ========================================================
echo         Personal Blog Website Launcher
echo ========================================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python is installed.
    echo [*] Starting local HTTP server on port 5500...
    echo [*] Server URL: http://localhost:5500
    echo.
    echo Opening website in your default browser...
    start http://localhost:5500
    echo.
    echo --------------------------------------------------------
    echo Server is running! Press Ctrl+C in this window to stop.
    echo --------------------------------------------------------
    echo.
    python -m http.server 5500
    goto end
)

:: Check for py launcher if python wasn't found directly
py --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python Launcher (py) is installed.
    echo [*] Starting local HTTP server on port 5500...
    echo [*] Server URL: http://localhost:5500
    echo.
    echo Opening website in your default browser...
    start http://localhost:5500
    echo.
    echo --------------------------------------------------------
    echo Server is running! Press Ctrl+C in this window to stop.
    echo --------------------------------------------------------
    echo.
    py -m http.server 5500
    goto end
)

:: If Python is not installed
echo [WARNING] Python was not detected on your system.
echo.
echo For the best experience, we recommend installing Python:
echo https://www.python.org/downloads/
echo.
echo Launching index.html directly in your default browser instead...
echo (Note: All features including localStorage work perfectly in direct mode!)
echo.
start "" "%~dp0index.html"
echo.
pause

:end
