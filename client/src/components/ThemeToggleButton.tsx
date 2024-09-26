"use client";
import { useTheme } from '../hooks/useTheme';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex flex-row justify-between">
      <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
        <button
          onClick={toggleTheme}
          className="relative flex items-center justify-center w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-500 ease-in-out"
        >
          <span className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-500 ease-in-out ${theme === 'dark' ? 'translate-x-6 bg-white' : 'bg-gray-800'}`}></span>
        </button>
      </label>
    </div>
  );
};

export default ThemeToggleButton;

