import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { type FormEvent } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (e: FormEvent<HTMLFormElement>) => void;
  passwordValue: string;
  onPasswordChange: (val: string) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin, passwordValue, onPasswordChange }: AuthModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <Lock className="text-blue-500" /> Admin Access
              </h3>
              <button onClick={onClose}>
                <X className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" />
              </button>
            </div>
            <form onSubmit={onLogin}>
              <input 
                type="password" 
                value={passwordValue}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Enter secret key..." 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none mb-4 dark:text-white transition-all"
                autoFocus
              />
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Unlock
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;