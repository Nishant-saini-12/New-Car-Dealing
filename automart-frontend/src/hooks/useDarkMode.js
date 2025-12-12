import { useEffect, useState } from 'react';

export default function useDarkMode() {
  // Initialize state and apply theme immediately
  const [isDark, setIsDark] = useState(() => {
    console.log('🔍 useDarkMode: Initializing...');
    
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    console.log('💾 Saved theme:', savedTheme);
    
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark';
      console.log('🎨 Setting initial mode:', isDarkMode ? 'DARK' : 'LIGHT');
      
      // Apply immediately on initialization
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        console.log('✅ Added "dark" class to <html>');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('✅ Removed "dark" class from <html>');
      }
      
      console.log('📋 HTML classes:', document.documentElement.className);
      return isDarkMode;
    }
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('🖥️ System prefers dark:', prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      console.log('✅ Added "dark" class to <html>');
    }
    
    console.log('📋 HTML classes:', document.documentElement.className);
    return prefersDark;
  });

  // Update theme when state changes
  useEffect(() => {
    console.log('🔄 useDarkMode: State changed to', isDark ? 'DARK' : 'LIGHT');
    
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('✅ DARK MODE ACTIVATED');
      console.log('   - Added "dark" class to <html>');
      console.log('   - Saved "dark" to localStorage');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('✅ LIGHT MODE ACTIVATED');
      console.log('   - Removed "dark" class from <html>');
      console.log('   - Saved "light" to localStorage');
    }
    
    console.log('📋 Current HTML classes:', root.className);
    console.log('📋 Has "dark" class:', root.classList.contains('dark'));
    
  }, [isDark]);

  return [isDark, setIsDark];
}
