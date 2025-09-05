# 🚀 GitHub Pages Deployment Guide

## 📋 Prerequisites
- GitHub account
- Git installed on your computer
- Your portfolio files ready

## 🎯 Step-by-Step Deployment

### 1. Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Repository name: `portfolio` (or your preferred name)
5. Description: "Mohamed Ameen - Portfolio Website"
6. Set to **Public** (required for free GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license
8. Click **"Create repository"**

### 2. Upload Your Files
#### Option A: Using Git Command Line
```bash
# Navigate to your portfolio folder
cd D:\portflio

# Initialize git repository
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

#### Option B: Using GitHub Web Interface
1. Go to your newly created repository
2. Click **"uploading an existing file"**
3. Drag and drop all your portfolio files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `portflio_logo.png`
   - `portflio_logo.ico`
   - `README.md`
   - `robots.txt`
   - `sitemap.xml`
   - `CNAME` (if using custom domain)
4. Add commit message: "Initial portfolio upload"
5. Click **"Commit changes"**

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** section in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **"main"** branch
6. Select **"/ (root)"** folder
7. Click **"Save"**

### 4. Access Your Live Site
- Your portfolio will be available at: `https://YOUR_USERNAME.github.io/portfolio`
- It may take 5-10 minutes for the site to go live
- You'll see a green checkmark when deployment is complete

## 🔧 Custom Domain (Optional)

### If you want to use a custom domain:
1. Edit the `CNAME` file in your repository
2. Replace the content with your domain name (e.g., `yourname.com`)
3. Configure your domain's DNS settings:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or add A records pointing to GitHub's IP addresses

## 📱 Features Included

Your deployed portfolio will include:
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark/Light Theme Toggle** - With device preference detection
- ✅ **Interactive Project Modals** - Clickable project cards
- ✅ **Contact Form** - Working Formspree integration
- ✅ **Floating WhatsApp Button** - Direct messaging
- ✅ **Smooth Animations** - Professional transitions
- ✅ **SEO Optimized** - Meta tags and sitemap
- ✅ **Fast Loading** - Optimized for performance

## 🔄 Updating Your Portfolio

To update your portfolio:
```bash
# Make your changes to files
# Then commit and push
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes.

## 🎨 Customization

### Update Your Information:
- Edit `index.html` to change your personal details
- Modify `styles.css` to adjust colors and styling
- Update `script.js` to change functionality

### Add New Projects:
- Add project data to the `projectData` object in `script.js`
- Update project cards in `index.html`

## 🚨 Troubleshooting

### Common Issues:
1. **Site not loading**: Wait 5-10 minutes for deployment
2. **Images not showing**: Check file paths are correct
3. **Theme not working**: Ensure JavaScript is enabled
4. **Contact form not working**: Verify Formspree form ID

### Check Deployment Status:
- Go to your repository → Actions tab
- Look for green checkmarks indicating successful deployment

## 📞 Support

If you encounter any issues:
1. Check GitHub Pages documentation
2. Verify all files are uploaded correctly
3. Check browser console for JavaScript errors
4. Ensure all file paths are relative (not absolute)

---

**🎉 Congratulations!** Your professional portfolio is now live on GitHub Pages!
