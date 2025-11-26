# Dark Mode Debug Guide

## Current Setup (Tailwind CSS v4)

### Configuration Files:

1. **index.css** - Uses `@import "tailwindcss"` (v4 style)
2. **postcss.config.js** - Uses `@tailwindcss/postcss`
3. **NO tailwind.config.js** - Not needed for v4 (deleted)

### Dark Mode Implementation:

**Hook:** `src/hooks/useDarkMode.js`
- Adds/removes `dark` class on `<html>` element
- Saves preference to localStorage
- Detects system preference

**HTML:** `index.html`
- Inline script applies theme before React loads
- Prevents flash of unstyled content

**Components:**
- All have `dark:` variant classes
- Example: `bg-white dark:bg-gray-900`

## Testing Steps:

### 1. Open Browser DevTools Console

Run these commands to test:

```javascript
// Check if dark class is on html element
console.log('Has dark class:', document.documentElement.classList.contains('dark'));

// Check localStorage
console.log('Saved theme:', localStorage.getItem('theme'));

// Manually add dark class to test
document.documentElement.classList.add('dark');

// Check if styles are applied
const navbar = document.querySelector('nav');
console.log('Navbar background:', window.getComputedStyle(navbar).backgroundColor);
```

### 2. Manual Toggle Test

```javascript
// Toggle dark mode manually
function toggleDark() {
  document.documentElement.classList.toggle('dark');
  console.log('Dark mode:', document.documentElement.classList.contains('dark'));
}

// Run this
toggleDark();
```

### 3. Check Tailwind Classes

Open DevTools Elements tab:
1. Inspect the `<html>` element
2. Look for `class="dark"` when dark mode is active
3. Inspect any component (like navbar)
4. Check if `dark:bg-gray-800` styles are being applied

### 4. Verify CSS is Loaded

```javascript
// Check if Tailwind CSS is loaded
const styles = Array.from(document.styleSheets);
console.log('Stylesheets loaded:', styles.length);

// Check for dark mode styles
styles.forEach((sheet, i) => {
  try {
    const rules = Array.from(sheet.cssRules || []);
    const darkRules = rules.filter(rule => 
      rule.cssText && rule.cssText.includes('.dark')
    );
    if (darkRules.length > 0) {
      console.log(`Sheet ${i} has ${darkRules.length} dark mode rules`);
    }
  } catch (e) {
    console.log(`Sheet ${i} - CORS restricted`);
  }
});
```

## Common Issues & Solutions:

### Issue 1: Dark class added but styles don't change
**Cause:** Tailwind CSS not processing dark: variants
**Solution:** 
- Restart dev server: `npm run dev`
- Clear browser cache
- Check if `@tailwindcss/postcss` is in postcss.config.js

### Issue 2: Only scrollbar changes
**Cause:** Dark mode classes not being applied to components
**Solution:**
- Verify components have `dark:` classes
- Check if `dark` class is on `<html>` element
- Inspect element in DevTools to see computed styles

### Issue 3: Flash of wrong theme on load
**Cause:** Theme applied after React loads
**Solution:**
- Inline script in index.html should run first
- Check browser console for errors

### Issue 4: Theme doesn't persist
**Cause:** localStorage not saving
**Solution:**
- Check browser allows localStorage
- Verify useDarkMode hook saves to localStorage

## Quick Fix Commands:

### Restart Everything:
```bash
# Stop dev server (Ctrl+C)
# Clear node_modules cache
rm -rf node_modules/.vite

# Restart
npm run dev
```

### Force Rebuild:
```bash
npm run build
npm run preview
```

## Expected Behavior:

✅ Click toggle button → Theme changes instantly  
✅ Reload page → Theme persists  
✅ All sections change color (navbar, body, footer)  
✅ Text color inverts (dark text → light text)  
✅ No flash of wrong theme on load  

## If Still Not Working:

1. **Check browser console for errors**
2. **Verify Tailwind CSS is loaded** (check Network tab)
3. **Inspect HTML element** - should have `class="dark"` when active
4. **Check component classes** - should have both light and dark variants
5. **Try hard refresh** - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Debug Output:

Run this in console to get full debug info:

```javascript
console.log('=== DARK MODE DEBUG ===');
console.log('HTML has dark class:', document.documentElement.classList.contains('dark'));
console.log('localStorage theme:', localStorage.getItem('theme'));
console.log('Body background:', window.getComputedStyle(document.body).backgroundColor);
console.log('Root element:', document.documentElement);
console.log('All classes on html:', document.documentElement.className);

// Test toggle
const originalState = document.documentElement.classList.contains('dark');
document.documentElement.classList.toggle('dark');
setTimeout(() => {
  console.log('After toggle - dark class:', document.documentElement.classList.contains('dark'));
  console.log('Body background after toggle:', window.getComputedStyle(document.body).backgroundColor);
  // Toggle back
  if (originalState) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, 1000);
```

---

**If you see the dark class being added/removed but styles don't change, the issue is with Tailwind CSS processing the dark: variants. Try restarting the dev server.**
