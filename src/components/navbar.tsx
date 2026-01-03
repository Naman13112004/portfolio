import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from 'framer-motion';
import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['About', 'Projects', 'Skills', 'Learning', 'Resume'];

  const scrollToSection = (id: string) => {
    if(id === "resume") {
      window.open(
        "https://drive.google.com/file/d/1pO6sDaibejVooqZxyiVVi2PEnDn06R8R/view?usp=sharing",
        "_blank",
      );
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const decideSectionId = (item: string) => {
    switch(item) {
      case "About":
        return "hero";

      case "Skills":
        return "skills";

      case "Learning":
        return "learning";

      case "Resume":
        return "resume";

      default:
        return item.toLowerCase();
    }
  }

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              &lt;Naman /&gt;
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(decideSectionId(item))}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              <ThemeToggle />
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b dark:border-gray-800"
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(decideSectionId(item))}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;