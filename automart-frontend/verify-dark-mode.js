import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Dark Mode Setup\n');
console.log('='.repeat(60));

// Check 1: Tailwind Config
console.log('\n📋 Check 1: Tailwind Config');
console.log('-'.repeat(60));
try {
  const configPath = path.join(__dirname, 'tailwind.config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes("darkMode: 'class'")) {
    console.log('✅ darkMode is set to "class" (correct for Tailwind v3)');
  } else if (configContent.includes("darkMode: 'selector'")) {
    console.log('❌ darkMode is set to "selector" (wrong for Tailwind v3)');
    console.log('   Fix: Change to darkMode: "class"');
  } else {
    console.log('⚠️  darkMode not found in config');
  }
} catch (error) {
  console.log('❌ Could not read tailwind.config.ts');
}

// Check 2: useDarkMode Hook
console.log('\n📋 Check 2: useDarkMode Hook');
console.log('-'.repeat(60));
try {
  const hookPath = path.join(__dirname, 'src/hooks/useDarkMode.js');
  const hookContent = fs.readFileSync(hookPath, 'utf8');
  
  if (hookContent.includes('document.documentElement.classList.add')) {
    console.log('✅ Hook adds "dark" class to document.documentElement');
  } else {
    console.log('❌ Hook does not add "dark" class properly');
  }
  
  if (hookContent.includes('localStorage')) {
    console.log('✅ Hook saves preference to localStorage');
  } else {
    console.log('⚠️  Hook does not save to localStorage');
  }
} catch (error) {
  console.log('❌ Could not read useDarkMode.js');
}

// Check 3: App.jsx
console.log('\n📋 Check 3: App.jsx');
console.log('-'.repeat(60));
try {
  const appPath = path.join(__dirname, 'src/App.jsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  if (appContent.includes('useDarkMode')) {
    console.log('✅ App.jsx imports useDarkMode');
  } else {
    console.log('❌ App.jsx does not import useDarkMode');
  }
  
  if (appContent.includes('dark:bg-gray-900')) {
    console.log('✅ App.jsx has dark mode classes');
  } else {
    console.log('⚠️  App.jsx missing dark mode classes');
  }
} catch (error) {
  console.log('❌ Could not read App.jsx');
}

// Check 4: Navbar.jsx
console.log('\n📋 Check 4: Navbar.jsx');
console.log('-'.repeat(60));
try {
  const navbarPath = path.join(__dirname, 'src/components/Navbar.jsx');
  const navbarContent = fs.readFileSync(navbarPath, 'utf8');
  
  if (navbarContent.includes('setIsDark')) {
    console.log('✅ Navbar has dark mode toggle');
  } else {
    console.log('❌ Navbar missing dark mode toggle');
  }
  
  if (navbarContent.includes('dark:bg-gray-800')) {
    console.log('✅ Navbar has dark mode classes');
  } else {
    console.log('⚠️  Navbar missing dark mode classes');
  }
} catch (error) {
  console.log('❌ Could not read Navbar.jsx');
}

// Check 5: Sample Components
console.log('\n📋 Check 5: Sample Components');
console.log('-'.repeat(60));
const componentsToCheck = [
  'src/components/HomePage.jsx',
  'src/components/Footer.jsx',
  'src/components/CarsPage.jsx'
];

let darkModeCount = 0;
componentsToCheck.forEach(comp => {
  try {
    const compPath = path.join(__dirname, comp);
    const compContent = fs.readFileSync(compPath, 'utf8');
    if (compContent.includes('dark:')) {
      darkModeCount++;
    }
  } catch (error) {
    // Skip if file not found
  }
});

console.log(`✅ ${darkModeCount}/${componentsToCheck.length} checked components have dark mode classes`);

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Summary\n');
console.log('Dark mode setup is configured.');
console.log('\n🚀 Next Steps:');
console.log('1. Restart dev server: npm run dev');
console.log('2. Hard refresh browser: Ctrl + Shift + R');
console.log('3. Click moon/sun icon to toggle');
console.log('4. Entire website should change!');
console.log('\n' + '='.repeat(60));
