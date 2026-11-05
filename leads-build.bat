@echo off
cd /d "C:\inetpub\wwwroot\smhs.seedlingschools.com"
set NEXT_BUILD_DIR=.next-career
set NODE_OPTIONS=--max-old-space-size=2048
"C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next build > "C:\inetpub\wwwroot\smhs.seedlingschools.com\leads-build.log" 2>&1
echo exit=%ERRORLEVEL% >> "C:\inetpub\wwwroot\smhs.seedlingschools.com\leads-build.log"
