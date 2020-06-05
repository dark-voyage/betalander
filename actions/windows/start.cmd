@ECHO OFF
cd /d %~dp0
cmd.exe
deno run --allow-all --unstable https://raw.githubusercontent.com/genemators/betalander/master/mod.ts launch
pause
