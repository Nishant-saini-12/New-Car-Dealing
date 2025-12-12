# 🔍 Debug Dark Mode Issue - Step by Step

## Problem
Toggle works, icon changes, but website doesn't switch to dark mode.

## Root Cause Analysis

The issue is that the `dark` class is NOT being applied to `<html>` element.

## Debug Steps

### Step 1: Test Standalone HTML
Open `automart-frontend/test-dark-mode.html` in browser.

This is a simple test page with Tailwind CDN.

**Test:**
1. Click "Toggle Dark Mode" button
2. Page should change from white to dark

**If this works:** Tailwind dark mode is working, issue is in React app.
**If this doesn't work:** Browser or Tailwind issue.

### Step 2: Check Browser Console
1. Open your React app: http://localhost:5173
2. Press F12 to open DevTools
3. Go to Console tab
4. Click dark mode toggle

**You should see logs like:**
```
🔄 useDarkMode: State changed to DARK
✅ DARK MODE ACTIVATED
   - Added "dark" class to <html>
   - Saved "dark" to localStorage
📋 Current HTML classes: dark
📋 Has "dark" class: true
```

**If you DON'T see these logs:**
- Hook is not running
- Check if useDarkMode is imported in App.jsx
- Check if setIsDark is being called

### Step 3: Inspect HTML Element
1. Open DevTools (F12)
2. Go to Elements tab
3. Look at the `<html>` tag at the very top
4. Click dark mode toggle
5. Watch the `<html>` tag

**Expected:**
```html
<!-- Light mode -->
<html lang="en">

<!-- Dark mode (after toggle) -->
<html lang="en" class="dark">
```

**If class doesn't appear:**
- JavaScript is not running
- Hook is not working
- setIsDark is not being called

### Step 4: Check localStorage
In browser console, run:
```javascript
localStorage.getItem('theme')
```

**Expected:**
- Returns `"dark"` or `"light"`

**If returns null:**
- Hook is not saving to localStorage
- Hook is not running at all

### Step 5: Manual Test
In browser console, run:
```javascript
// Add dark class manually
document.documentElement.classList.add('dark');

// Check if website changes
// If it changes, hook is the problem
// If it doesn't change, Tailwind config is the problem
```

### Step 6: Check Tailwind Config
Run verification:
```bash
cd automart-frontend
node verify-dark-mode.js
```

Should show all ✅ checks.

### Step 7: Check if Dev Server Restarted
**CRITICAL:** After changing `tailwind.config.ts`, you MUST restart dev server!

```bash
# Stop server (Ctrl + C)
cd automart-frontend
npm run dev
```

## Common Issues & Solutions

### Issue 1: Hook Not Running
**Symptoms:**
- No console logs
- No class changes
- localStorage not updating

**Solution:**
Check if useDarkMode is imported and used in App.jsx:
```jsx
import useDarkMode from './hooks/useDarkMode';

export default function App() {
  const [isDark, setIsDark] = useDarkMode();
  // ...
}
```

### Issue 2: setIsDark Not Called
**Symptoms:**
- Icon changes
- No console logs
- Website doesn't change

**Solution:**
Check Navbar.jsx has correct onClick:
```jsx
<button onClick={() => setIsDark(!isDark)}>
  {isDark ? <Sun /> : <Moon />}
</button>
```

### Issue 3: Class Added But No Visual Change
**Symptoms:**
- Console shows "dark" class added
- HTML element has "dark" class
- Website doesn't change color

**Solution:**
- Dev server not restarted after config change
- Tailwind config wrong
- Components missing `dark:` classes

**Fix:**
1. Restart dev server
2. Hard refresh browser (Ctrl + Shift + R)
3. Check tailwind.config.ts has `darkMode: 'class'`

### Issue 4: Works in Test HTML, Not in React
**Symptoms:**
- test-dark-mode.html works perfectly
- React app doesn't work

**Solution:**
- React app not restarted after config change
- Build cache issue
- Component rendering issue

**Fix:**
```bash
# Clear cache and restart
cd automart-frontend
rm -rf node_modules/.vite
npm run dev
```

## Detailed Debugging

### Check 1: Is Hook Imported?
```bash
cd automart-frontend
grep -r "useDarkMode" src/App.jsx
```

Should show:
```javascript
import useDarkMode from './hooks/useDarkMode';
const [isDark, setIsDark] = useDarkMode();
```

### Check 2: Is setIsDark Passed to Navbar?
```bash
grep -r "setIsDark" src/App.jsx
```

Should show:
```jsx
<Navbar 
  isDark={isDark}
  setIsDark={setIsDark}
/>
```

### Check 3: Is Navbar Using setIsDark?
```bash
grep -r "setIsDark" src/components/Navbar.jsx
```

Should show:
```jsx
onClick={() => setIsDark(!isDark)}
```

### Check 4: Are Dark Classes Present?
```bash
grep -r "dark:bg-gray-900" src/App.jsx
```

Should show:
```jsx
<div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
```

## Force Dark Mode Test

Add this to App.jsx temporarily:
```jsx
useEffect(() => {
  // Force dark mode for testing
  document.documentElement.classList.add('dark');
  console.log('FORCED DARK MODE');
}, []);
```

If website changes to dark:
- ✅ Tailwind config is correct
- ✅ Components have dark classes
- ❌ Hook or toggle is the problem

If website doesn't change:
- ❌ Tailwind config wrong
- ❌ Dev server not restarted
- ❌ Components missing dark classes

## Nuclear Option: Fresh Start

If nothing works:

```bash
cd automart-frontend

# Stop server
# Ctrl + C

# Clear all caches
rm -rf node_modules/.vite
rm -rf dist

# Restart
npm run dev
```

Then hard refresh browser: Ctrl + Shift + R

## Expected Console Output

When you toggle dark mode, you should see:

```
🔄 useDarkMode: State changed to DARK
✅ DARK MODE ACTIVATED
   - Added "dark" class to <html>
   - Saved "dark" to localStorage
📋 Current HTML classes: dark
📋 Has "dark" class: true
```

And in Elements tab:
```html
<html lang="en" class="dark">
```

And website should change to dark colors.

## Test Checklist

- [ ] Opened test-dark-mode.html - works?
- [ ] Console shows useDarkMode logs?
- [ ] HTML element gets "dark" class?
- [ ] localStorage saves theme?
- [ ] Manual classList.add('dark') works?
- [ ] Tailwind config has darkMode: 'class'?
- [ ] Dev server restarted after config change?
- [ ] Browser hard refreshed?
- [ ] Components have dark: classes?
- [ ] Hook imported in App.jsx?
- [ ] setIsDark passed to Navbar?
- [ ] Navbar calls setIsDark on click?

## Next Steps

1. **Open test-dark-mode.html** - verify Tailwind works
2. **Check browser console** - look for logs
3. **Inspect HTML element** - check for "dark" class
4. **Restart dev server** - most common fix
5. **Hard refresh browser** - clear cache

---

**The logs will tell you exactly what's happening!** 🔍
