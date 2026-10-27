@echo off
:restart
cd /d C:\inetpub\wwwroot\smhs.seedlingschools.com
set NEXT_BUILD_DIR=.next-perf
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001 "') do taskkill /F /PID %%a 2>NUL
timeout /t 2 /nobreak >NUL
"C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next start -p 3001
timeout /t 5 /nobreak >NUL
goto restart
