@echo off
setlocal

REM %~1 is the commit message file path
npx --no -- commitlint --edit "%~1"
if errorlevel 1 exit /b 1

exit /b 0

