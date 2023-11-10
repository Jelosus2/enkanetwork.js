@echo off

cd %~dp0
npm publish
git add .
git commit -m "Update for the v2.5.3"
git push -u origin