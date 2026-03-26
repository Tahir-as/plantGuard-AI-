import React from 'react';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';
import { Leaf, History, Settings, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { logout } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'scan', label: t('scan_plant'), icon: Leaf },
    { id: 'history', label: t('history'), icon: History },
    { id: 'settings', label: t('settings'), icon: Settings },
    ...(isAdmin ? [{ id: 'admin', label: t('admin'), icon: ShieldCheck }] : []),
  ];

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-serif">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e5e0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white">
              <Leaf size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#5A5A40]">{t('app_name')}</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={toggleLanguage} className="text-sm font-medium hover:text-[#5A5A40] transition-colors">
              {i18n.language === 'en' ? 'اردو' : 'English'}
            </button>
            {user && (
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700">
                <LogOut size={18} />
                {t('logout')}
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-[#e5e5e0] absolute w-full z-40 shadow-xl"
          >
            <div className="p-4 flex flex-col gap-4">
              <button onClick={toggleLanguage} className="text-left py-2 border-b border-[#f0f0f0]">
                {i18n.language === 'en' ? 'اردو' : 'English'}
              </button>
              {user && (
                <button onClick={handleLogout} className="text-left py-2 text-red-600">
                  {t('logout')}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e0] px-6 py-3 flex justify-between items-center z-50">
          {navItems.map((item) => (
            <button key={item.id} className="flex flex-col items-center gap-1 text-[#5A5A40] opacity-60 hover:opacity-100 transition-opacity">
              <item.icon size={20} />
              <span className="text-[10px] uppercase tracking-wider font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};
