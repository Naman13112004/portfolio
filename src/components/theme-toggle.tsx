import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button 
      onClick={() => setDark(!dark)} 
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all hover:scale-110 cursor-pointer"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;