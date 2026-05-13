import { useState } from "react";
import { User, Settings, HeartPulse, CreditCard, Shield, LogOut, ChevronRight, Moon, Sun, X, Globe } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'id'>(() => (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id');

  const handleSetLanguage = (lang: 'en' | 'id') => {
    setLanguage(lang);
    localStorage.setItem("lang", lang.toUpperCase());
    window.dispatchEvent(new Event("languageChange"));
    setActiveModal(null);
  };

  // Simple translations for demo
  const t = {
    en: {
      profile: "Profile",
      edit: "Edit Profile",
      member: "Gold Member",
      scans: "Total Scans",
      consults: "Consultations",
      signOut: "Sign Out",
      healthProfile: "Health Profile",
      payment: "Payment Methods",
      privacy: "Privacy & Security",
      darkMode: "Dark Mode",
      appSettings: "App Settings",
      language: "Language"
    },
    id: {
      profile: "Profil",
      edit: "Edit Profil",
      member: "Anggota Emas",
      scans: "Total Pemindaian",
      consults: "Konsultasi",
      signOut: "Keluar",
      healthProfile: "Profil Kesehatan",
      payment: "Metode Pembayaran",
      privacy: "Privasi & Keamanan",
      darkMode: "Mode Gelap",
      appSettings: "Pengaturan Aplikasi",
      language: "Bahasa"
    }
  };

  const currentT = t[language];

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      toast.success("Dark Mode enabled! (Simulation)");
    } else {
      toast.info("Light Mode enabled!");
    }
  };

  const handleMenuClick = (menuLabel: string) => {
    if (menuLabel === currentT.darkMode) {
      handleToggleDarkMode();
      return;
    }
    // Map translated labels back to keys for modal
    if (menuLabel === currentT.healthProfile) setActiveModal("health");
    else if (menuLabel === currentT.payment) setActiveModal("payment");
    else if (menuLabel === currentT.privacy) setActiveModal("privacy");
    else if (menuLabel === currentT.appSettings) setActiveModal("settings");
    else if (menuLabel === currentT.language) setActiveModal("language");
  };

  const settingsOptions = [
    { icon: HeartPulse, label: currentT.healthProfile, color: "text-red-500", bg: "bg-red-50" },
    { icon: CreditCard, label: currentT.payment, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Shield, label: currentT.privacy, color: "text-green-500", bg: "bg-green-50" },
    { icon: Globe, label: currentT.language, color: "text-indigo-500", bg: "bg-indigo-50" },
    { icon: isDarkMode ? Sun : Moon, label: currentT.darkMode, color: "text-purple-500", bg: "bg-purple-50", toggle: true },
    { icon: Settings, label: currentT.appSettings, color: "text-gray-500", bg: "bg-gray-100" },
  ];

  return (
    <div className={`flex-1 p-4 md:p-8 lg:p-10 flex flex-col max-w-3xl mx-auto w-full transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <header className="mb-8 flex justify-between items-center">
        <h1 className={`text-3xl md:text-4xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentT.profile}</h1>
        <button 
          onClick={() => toast.info("Edit profile mode activated")}
          className="bg-pink-50 text-[#D94F8A] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-pink-100 transition-colors"
        >
          {currentT.edit}
        </button>
      </header>

      {/* Profile Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-6 md:p-8 shadow-sm border flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
      >
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-pink-100 shadow-md bg-gray-200 flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1700190827481-c1fdea69a728?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGhhcHB5JTIwYXNpYW4lMjB3b21hbiUyMGhlYWx0aHxlbnwxfHx8fDE3Nzg2MjY0ODV8MA&ixlib=rb-4.1.0&q=80&w=200" alt="Sarah Johnson" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h2 className={`text-2xl md:text-3xl font-extrabold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sarah Johnson</h2>
          <p className={`text-sm md:text-base font-medium mb-4 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>sarah.j@example.com</p>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="bg-gradient-to-r from-[#F7A8C4] to-[#D94F8A] text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">{currentT.member}</span>
            <span className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>1,250 Pts</span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-4 mb-8">
        <div className={`rounded-3xl p-5 md:p-6 shadow-sm border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <p className={`text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentT.scans}</p>
          <h3 className={`text-3xl md:text-4xl font-extrabold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12</h3>
        </div>
        <div className={`rounded-3xl p-5 md:p-6 shadow-sm border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <p className={`text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentT.consults}</p>
          <h3 className={`text-3xl md:text-4xl font-extrabold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3</h3>
        </div>
      </motion.div>

      {/* Options */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`rounded-3xl shadow-sm border overflow-hidden mb-10 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        {settingsOptions.map((opt, idx) => (
          <div 
            key={idx} 
            onClick={() => handleMenuClick(opt.label)}
            className={`p-5 flex items-center justify-between cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-gray-700/50 border-gray-700' : 'hover:bg-gray-50 border-gray-50'} ${idx !== settingsOptions.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${opt.bg} ${opt.color} shadow-sm`}>
                <opt.icon size={24} />
              </div>
              <span className={`font-bold text-base transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{opt.label}</span>
            </div>
            {opt.toggle ? (
              <div className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-purple-500' : 'bg-gray-200'}`}>
                <motion.div 
                  layout
                  className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-md"
                  animate={{ left: isDarkMode ? '28px' : '4px' }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            ) : (
              <ChevronRight size={20} className={isDarkMode ? 'text-gray-600' : 'text-gray-400'} />
            )}
          </div>
        ))}
      </motion.div>

      <motion.button 
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => {
          toast.success("Signing out...");
          setTimeout(() => navigate("/login"), 1000);
        }}
        className={`mt-auto w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-sm ${isDarkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
      >
        <LogOut size={22} />
        {currentT.signOut}
      </motion.button>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setActiveModal(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-md rounded-3xl p-6 shadow-2xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/10 transition-colors text-gray-400">
                <X size={20} />
              </button>

              {activeModal === 'health' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">{currentT.healthProfile}</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-50/10 border border-red-100/20">
                      <p className="text-sm text-gray-500 mb-1">Blood Type</p>
                      <p className="font-bold">O+</p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50/10 border border-red-100/20">
                      <p className="text-sm text-gray-500 mb-1">Allergies</p>
                      <p className="font-bold">Penicillin, Peanuts</p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50/10 border border-red-100/20">
                      <p className="text-sm text-gray-500 mb-1">Last Cycle</p>
                      <p className="font-bold">April 28, 2026</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'payment' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">{currentT.payment}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200">
                      <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-500">Expires 12/28</p>
                      </div>
                    </div>
                    <button className="w-full py-3 rounded-xl border border-dashed border-gray-300 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-colors">
                      + Add New Method
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'privacy' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">{currentT.privacy}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">Biometric Login</p>
                        <p className="text-xs text-gray-500">Use Face ID / Touch ID</p>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">Data Sharing</p>
                        <p className="text-xs text-gray-500">Share anonymous data for AI training</p>
                      </div>
                      <div className="w-12 h-6 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div></div>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'settings' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">{currentT.appSettings}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">Push Notifications</p>
                        <p className="text-xs text-gray-500">Test reminders, results, promos</p>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                    </div>
                    <button className="w-full py-3 text-left font-bold text-sm text-red-500 border-t border-gray-100 mt-4 pt-4">Delete Account Data</button>
                  </div>
                </div>
              )}

              {activeModal === 'language' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">{currentT.language}</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleSetLanguage('en')}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${language === 'en' ? 'border-[#D94F8A] bg-pink-50 text-[#D94F8A]' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <span className="font-bold">English (US)</span>
                      {language === 'en' && <div className="w-3 h-3 rounded-full bg-[#D94F8A]"></div>}
                    </button>
                    <button 
                      onClick={() => handleSetLanguage('id')}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${language === 'id' ? 'border-[#D94F8A] bg-pink-50 text-[#D94F8A]' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <span className="font-bold">Bahasa Indonesia</span>
                      {language === 'id' && <div className="w-3 h-3 rounded-full bg-[#D94F8A]"></div>}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
