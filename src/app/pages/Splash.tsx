import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ShieldCheck, X } from "lucide-react";
import { Logo } from "../components/Logo";

export default function Splash() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "ID");

  const handleSetLang = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    window.dispatchEvent(new Event("languageChange"));
  };

  // Only auto-navigate if settings modal is NOT open
  useEffect(() => {
    if (showSettings) return;
    
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate, showSettings]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-white via-pink-50 to-[#F7A8C4] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Settings Button */}
      <button 
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-white/80 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-sm hover:shadow-md transition-all text-gray-700"
      >
        <Globe size={20} />
      </button>

      {/* Admin Portal Button */}
      <button 
        onClick={() => navigate("/admin")}
        className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-white/80 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all text-gray-700 flex items-center gap-1.5 md:gap-2 font-bold text-[10px] md:text-xs"
      >
        <ShieldCheck size={16} className="text-[#D94F8A]" />
        <span className="hidden sm:inline">Admin Portal</span>
        <span className="sm:hidden">Admin</span>
      </button>

      {/* Background glowing orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#D94F8A] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center gap-4"
      >
        <Logo 
          className="scale-125 md:scale-150 mb-2" 
          suffix={<span className="font-light text-gray-700"></span>} 
        />
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-[calc(100%-2rem)] max-w-sm rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="text-[#D94F8A]" /> Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Language / Bahasa</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleSetLang("EN")}
                      className={`flex-1 py-3 px-2 md:px-4 rounded-xl font-bold text-sm md:text-base transition-all ${lang === "EN" ? 'bg-[#D94F8A] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => handleSetLang("ID")}
                      className={`flex-1 py-3 px-2 md:px-4 rounded-xl font-bold text-sm md:text-base transition-all ${lang === "ID" ? 'bg-[#D94F8A] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      Indonesia
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-all"
                  >
                    Save & Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
