import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Checking Dark Mode Setup\n');
console.log('='.repeat(70));

let issuesFound = 0;

// Check 1: Tailwind Config
console.log('\n📋 Check 1: Tailwind Config');
console.log('-'.repeat(70));
try {
  const configPath = path.join(__dirname, 'tailwind.config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes("darkMode: 'class'") || configContent.includes('darkMode: "class"')) {
    console.log('✅ darkMode is set to "class"');
  } else if (configContent.includes("darkMode: 'selector'")) {
    console.log('❌ darkMode is set to "selector" - WRONG!');
    console.log('   Fix: Change to darkMode: "class"');
    issuesFound++;
  } else {
    console.log('⚠️  darkMode setting not found');
    issuesFound++;
  }
} catch (error) {
  console.log('❌ Could not read tailwind.config.ts');
  issuesFound++;
}

// Check 2: useDarkMode Hook
console.log('\n📋 Check 2: useDarkMode Hook');
console.log('-'.repeat(70));
try {
  const hookPath = path.join(__dirname, 'src/hooks/useDarkMode.js');
  const hookContent = fs.readFileSync(hookPath, 'utf8');
  
  if (hookContent.includes('document.documentElement.classList.add')) {
    console.log('✅ Hook adds "dark" class to document.documentElement');
  } else {
    console.log('❌ Hook does NOT add "dark" class');
    issuesFound++;
  }
  
  if (hookContent.includes('useEffect')) {
    console.log('✅ Hook uses useEffect to update on state change');
  } else {
    console.log('❌ Hook missing useEffect');
    issuesFound++;
  }
  
  if (hookContent.includes('localStorage')) {
    console.log('✅ Hook saves to localStorage');
  } else {
    console.log('⚠️  Hook does not save to localStorage');
  }
} catch (error) {
  console.log('❌ Could not read useDarkMode.js');
  issuesFound++;
}

// Check 3: App.jsx imports useDarkMode
console.log('\n📋 Check 3: App.jsx');
console.log('-'.repeat(70));
try {
  const appPath = path.join(__dirname, 'src/App.jsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  if (appContent.includes("import useDarkMode from './hooks/useDarkMode'")) {
    console.log('✅ App.jsx imports useDarkMode');
  } else {
    console.log('❌ App.jsx does NOT import useDarkMode');
    issuesFound++;
  }
  
  if (appContent.includes('const [isDark, setIsDark] = useDarkMode()')) {
    console.log('✅ App.jsx uses useDarkMode hook');
  } else {
    console.log('❌ App.jsx does NOT use useDarkMode hook');
    issuesFound++;
  }
  
  if (appContent.includes('dark:bg-gray-900')) {
    console.log('✅ App.jsx has dark mode classes');
  } else {
    console.log('⚠️  App.jsx missing dark mode classes');
  }
} catch (error) {
  console.log('❌ Could not read App.jsx');
  issuesFound++;
}

// Check 4: Navbar receives and uses setIsDark
console.log('\n📋 Check 4: Navbar.jsx');
console.log('-'.repeat(70));
try {
  const navbarPath = path.join(__dirname, 'src/components/Navbar.jsx');
  const navbarContent = fs.readFileSync(navbarPath, 'utf8');
  
  if (navbarContent.includes('setIsDark') && navbarContent.includes('isDark')) {
    console.log('✅ Navbar receives isDark and setIsDark props');
  } else {
    console.log('❌ Navbar missing isDark or setIsDark props');
    issuesFound++;
  }
  
  if (navbarContent.includes('onClick') && navbarContent.includes('setIsDark')) {
    console.log('✅ Navbar has onClick handler that calls setIsDark');
  } else {
    console.log('❌ Navbar missing onClick handler for setIsDark');
    issuesFound++;
  }
  
  if (navbarContent.includes('Moon') && navbarContent.includes('Sun')) {
    console.log('✅ Navbar has Moon/Sun icons');
  } else {
    console.log('⚠️  Navbar missing Moon/Sun icons');
  }
} catch (error) {
  console.log('❌ Could not read Navbar.jsx');
  issuesFound++;
}

// Check 5: Sample components have dark classes
console.log('\n📋 Check 5: Components Have Dark Classes');
console.log('-'.repeat(70));
const componentsToCheck = [
  'src/components/HomePage.jsx',
  'src/components/Footer.jsx',
  'src/components/CarsPage.jsx'
];

let componentsWithDark = 0;
componentsToCheck.forEach(comp => {
  try {
    const compPath = path.join(__dirname, comp);
    const compContent = fs.readFileSync(compPath, 'utf8');
    if (compContent.includes('dark:')) {
      componentsWithDark++;
    }
  } catch (error) {
    // Skip if file not found
  }
});

if (componentsWithDark === componentsToCheck.length) {
  console.log(`✅ All ${componentsWithDark}/${componentsToCheck.length} checked components have dark classes`);
} else {
  console.log(`⚠️  Only ${componentsWithDark}/${componentsToCheck.length} components have dark classes`);
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('📊 SUMMARY\n');

if (issuesFound === 0) {
  console.log('✅ All checks passed! Dark mode should be working.');
  console.log('\n🔍 If dark mode still not working:');
  console.log('   1. Restart dev server: npm run dev');
  console.log('   2. Hard refresh browser: Ctrl + Shift + R');
  console.log('   3. Open browser console (F12) and check for logs');
  console.log('   4. Inspect <html> element - should have "dark" class when toggled');
  console.log('   5. Open test-dark-mode.html to test Tailwind directly');
} else {
  console.log(`❌ Found ${issuesFound} issue(s) that need to be fixed!`);
  console.log('\n📝 Review the checks above and fix the issues.');
}

console.log('\n📚 Documentation:');
console.log('   - DEBUG_DARK_MODE_ISSUE.md - Step-by-step debugging');
console.log('   - test-dark-mode.html - Standalone test page');
console.log('   - DARK_MODE_COMPLETE_FIX.md - Complete fix guide');

console.log('\n' + '='.repeat(70));
