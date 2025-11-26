# Setup Guide - CarDealing Website

## ✅ Configuration Files Created

I've created the necessary configuration files for Tailwind CSS:

1. **tailwind.config.js** - Tailwind configuration
2. **postcss.config.js** - PostCSS configuration

## 🚀 Steps to Run the Website

### 1. Install Dependencies

```bash
cd automart-frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

The terminal will show a URL like:
```
Local: http://localhost:5173
```

Open this URL in your browser.

## 🔧 Troubleshooting

### If styles are not showing:

1. **Stop the server** (Ctrl+C in terminal)

2. **Clear Vite cache:**
```bash
rm -rf node_modules/.vite
```

3. **Restart the server:**
```bash
npm run dev
```

4. **Hard refresh browser:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

### If you see errors:

1. **Reinstall dependencies:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

2. **Check Node version:**
```bash
node --version
```
Should be v18 or higher.

## 📁 File Structure

```
automart-frontend/
├── src/
│   ├── App.jsx          # Main application
│   ├── main.jsx         # Entry point (imports index.css)
│   └── index.css        # Tailwind CSS styles
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Dependencies
└── index.html           # HTML template
```

## ✨ What Should You See

Once running, you should see:
- **Navbar** at the top with logo and navigation
- **Hero section** with blue gradient background
- **Feature cards** with icons
- **Car listings** with images
- **Footer** at the bottom

All styled with Tailwind CSS!

## 🎨 Tailwind CSS is Working When:

- Background colors are visible
- Text is styled with proper fonts
- Buttons have colors and hover effects
- Layout is responsive
- Cards have shadows and rounded corners

## 📞 Still Having Issues?

Make sure:
1. ✅ `tailwind.config.js` exists
2. ✅ `postcss.config.js` exists
3. ✅ `src/index.css` has `@tailwind` directives
4. ✅ `src/main.jsx` imports `./index.css`
5. ✅ Development server is running
6. ✅ Browser cache is cleared

---

**Your website should now be fully styled! 🎉**
