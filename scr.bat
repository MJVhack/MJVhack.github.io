@echo off

set URL=https://youtu.be/dQw4w9WgXcQ?is=0d3AtCfUxDiWvkjr
set CHROME_PATH=

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set CHROME_PATH=%ProgramFiles%\Google\Chrome\Application\chrome.exe
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set CHROME_PATH=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe

if "%CHROME_PATH%"=="" exit /b

start "" "%CHROME_PATH%" %URL%