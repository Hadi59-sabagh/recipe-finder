'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-5 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-yellow-300 rounded-2xl shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out flex items-center gap-2 select-none font-semibold text-sm"
      aria-label="تغییر حالت تاریک و روشن"
      style={{ marginRight: '50px' }} 
    >
      {theme === 'dark' ? '☀️ روشن' : '🌙 تاریک'}
    </button>
  );
}
