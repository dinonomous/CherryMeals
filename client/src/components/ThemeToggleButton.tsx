"use client";
import { useTheme } from '../hooks/useTheme';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
      {theme === 'dark' ? '🌙 Light Mode' : '🌞 Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
