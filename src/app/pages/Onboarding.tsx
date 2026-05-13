import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

const ONBOARDING_DATA = {
  en: [
    { title: "Practical Early Detection", description: "Early detection of HPV is more practical with AI monitoring technology.", icon: "🔬" },
    { title: "Real-time Monitoring", description: "Monitor your reproductive health in real-time, anytime.", icon: "📊" },
    { title: "Consultation & Rewards", description: "Consult with doctors and collect reward points for exciting prizes.", icon: "🎁" }
  ],
  id: [
    { title: "Deteksi Dini Praktis", description: "Deteksi dini HPV lebih praktis dengan teknologi pemantauan AI.", icon: "🔬" },
    { title: "Pemantauan Real-time", description: "Pantau kesehatan reproduksi Anda secara real-time, kapan saja.", icon: "📊" },
    { title: "Konsultasi & Hadiah", description: "Konsultasi dengan dokter dan kumpulkan poin reward untuk hadiah menarik.", icon: "🎁" }
  ]
};

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [lang, setLang] = useState(() => (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id');

  const currentData = ONBOARDING_DATA[lang] || ONBOARDING_DATA.id;

  const handleNext = () => {
    if (step < currentData.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col relative">
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* Abstract shapes top background */}
        <div className="absolute top-[-10%] right-[-20%] w-[120%] h-[50%] bg-gradient-to-b from-pink-100 to-white rounded-b-full opacity-50 z-0"></div>

        <div className="flex justify-end p-6 z-10 md:p-8">
          <button onClick={handleSkip} className="text-gray-400 font-bold text-sm md:text-base hover:text-[#D94F8A] transition-colors">
            {lang === 'en' ? "Skip" : "Lewati"}
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center w-full max-w-md"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 bg-pink-50 rounded-full flex items-center justify-center mb-10 md:mb-12 shadow-inner relative">
                <div className="text-8xl md:text-9xl">{currentData[step].icon}</div>
                
                {/* Decorative floating elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-10 -right-4 md:right-0 w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center text-xl md:text-2xl"
                >✨</motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute bottom-10 -left-4 md:left-0 w-10 h-10 md:w-14 md:h-14 bg-[#D94F8A]/10 rounded-full backdrop-blur-md"
                ></motion.div>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{currentData[step].title}</h2>
              <p className="text-gray-500 md:text-lg leading-relaxed max-w-[280px] md:max-w-sm">
                {currentData[step].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="p-8 md:p-12 pb-12 z-10 max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2.5 md:gap-3">
              {currentData.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${idx === step ? 'w-8 md:w-10 bg-[#D94F8A]' : 'w-2 md:w-2.5 bg-pink-200'}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#F7A8C4] to-[#D94F8A] flex items-center justify-center text-white shadow-lg shadow-pink-300/50 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
