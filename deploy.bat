@echo off
echo 🚀 Deploying Portfolio to GitHub Pages...
echo.

echo 📁 Current directory: %CD%
echo.

echo 🔧 Initializing Git repository...
git init

echo.
echo 📦 Adding all files...
git add .

echo.
echo 💾 Committing changes...
git commit -m "Deploy portfolio to GitHub Pages"

echo.
echo 🌐 Pushing to GitHub...
echo ⚠️  Make sure to replace YOUR_USERNAME with your actual GitHub username!
echo.
echo 📝 Next steps:
echo 1. Replace YOUR_USERNAME in sitemap.xml and robots.txt with your GitHub username
echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
echo 3. Run: git push -u origin main
echo 4. Enable GitHub Pages in repository settings
echo.
echo 🎉 Your portfolio will be live at: https://YOUR_USERNAME.github.io/portfolio
echo.
pause
