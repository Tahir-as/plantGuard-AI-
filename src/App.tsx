import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout';
import { Scanner } from './components/Scanner';
import { History } from './components/History';
import { Admin } from './components/Admin';
import { signInWithGoogle } from './firebase';
import { Leaf, ShieldCheck, LogIn, Globe, History as HistoryIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import './i18n';

export default function App() {
  const { user, loading, isAdmin } = useAuth();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'scan' | 'history' | 'settings' | 'admin'>('scan');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0]">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#5A5A40]"
        >
          <Leaf size={48} />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-xl text-center border border-[#e5e5e0]"
        >
          <div className="w-20 h-20 bg-[#5A5A40] rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg">
            <Leaf size={40} />
          </div>
          <h1 className="text-4xl font-bold text-[#5A5A40] mb-4 tracking-tight">{t('app_name')}</h1>
          <p className="text-[#1a1a1a]/60 mb-10 leading-relaxed">{t('tagline')}</p>
          
          <div className="space-y-4">
            <button
              onClick={signInWithGoogle}
              className="w-full py-4 bg-[#5A5A40] text-white rounded-full font-medium flex items-center justify-center gap-3 hover:bg-[#4a4a35] transition-all shadow-md active:scale-95"
            >
              <LogIn size={20} />
              {t('login_google')}
            </button>
            
            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={() => i18n.changeLanguage('en')}
                className={`text-sm font-bold uppercase tracking-widest ${i18n.language === 'en' ? 'text-[#5A5A40] border-b-2 border-[#5A5A40]' : 'text-[#1a1a1a]/40'}`}
              >
                English
              </button>
              <button 
                onClick={() => i18n.changeLanguage('ur')}
                className={`text-sm font-bold uppercase tracking-widest ${i18n.language === 'ur' ? 'text-[#5A5A40] border-b-2 border-[#5A5A40]' : 'text-[#1a1a1a]/40'}`}
              >
                اردو
              </button>
            </div>
          </div>
        </motion.div>
        
        <p className="mt-8 text-xs text-[#1a1a1a]/40 uppercase tracking-[0.2em] font-bold">
          Final Year Project • Tahir
        </p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col gap-2 w-64">
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${activeTab === 'scan' ? 'bg-[#5A5A40] text-white shadow-lg' : 'hover:bg-white'}`}
          >
            <Leaf size={20} />
            {t('scan_plant')}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${activeTab === 'history' ? 'bg-[#5A5A40] text-white shadow-lg' : 'hover:bg-white'}`}
          >
            <HistoryIcon size={20} />
            {t('history')}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${activeTab === 'settings' ? 'bg-[#5A5A40] text-white shadow-lg' : 'hover:bg-white'}`}
          >
            <Globe size={20} />
            {t('language')}
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${activeTab === 'admin' ? 'bg-[#5A5A40] text-white shadow-lg' : 'hover:bg-white'}`}
            >
              <ShieldCheck size={20} />
              {t('admin')}
            </button>
          )}
        </aside>

        {/* Content Area */}
        <div className="flex-grow pb-24 md:pb-0">
          {activeTab === 'scan' && <Scanner />}
          {activeTab === 'history' && <History />}
          {activeTab === 'admin' && isAdmin && <Admin />}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto bg-white rounded-[32px] p-8 border border-[#e5e5e0]">
              <h2 className="text-3xl font-light mb-8 text-[#5A5A40]">{t('language')}</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'en', label: 'English', native: 'English' },
                  { id: 'ur', label: 'Urdu', native: 'اردو' },
                  { id: 'sd', label: 'Sindhi', native: 'سنڌي' },
                  { id: 'pa', label: 'Punjabi', native: 'پنجابی' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => i18n.changeLanguage(lang.id)}
                    className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${i18n.language === lang.id ? 'border-[#5A5A40] bg-[#5A5A40]/5' : 'border-[#f0f0f0] hover:border-[#e5e5e0]'}`}
                  >
                    <span className="font-bold text-lg">{lang.native}</span>
                    <span className="text-sm text-[#1a1a1a]/40">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
