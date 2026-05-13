import { useState } from "react";
import { Gift, Trophy, CheckCircle, Flame, Recycle, ArrowRight, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Rewards() {
  const [points, setPoints] = useState(1250);
  const [code, setCode] = useState("");
  const lang = (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id';

  const t = {
    en: {
      title: "Rewards 🎁",
      subtitle: "Collect points and redeem exciting prizes",
      totalPoints: "Total Points",
      claimPoints: "Claim Points",
      ecoFriendly: "Eco-Friendly Disposal",
      ecoDesc: "Dispose of your CERVISCAN™ packaging at our partnered clinics or drop-off points to get a secret code.",
      codePlaceholder: "Enter 6-digit secret code...",
      claimBtn: "Claim Code",
      dailyMissions: "Daily Missions",
      completed: "Completed",
      pts: "Pts",
      redeem: "Redeem Rewards",
      viewAll: "View All",
      claimSuccess: "50 Points Claimed! Thank you for disposing of the packaging responsibly. 🌍",
      missionComplete: "Mission Completed! Earned",
      redeemSuccess: "Successfully redeemed",
      notEnough: "Not enough points!",
      invalidCode: "Please enter a valid packaging code."
    },
    id: {
      title: "Hadiah 🎁",
      subtitle: "Kumpulkan poin dan tukarkan dengan hadiah menarik",
      totalPoints: "Total Poin",
      claimPoints: "Klaim Poin",
      ecoFriendly: "Pembuangan Ramah Lingkungan",
      ecoDesc: "Buang kemasan CERVISCAN™ Anda di klinik mitra atau titik pengumpulan kami untuk mendapatkan kode rahasia.",
      codePlaceholder: "Masukkan kode rahasia 6 digit...",
      claimBtn: "Klaim Kode",
      dailyMissions: "Misi Harian",
      completed: "Selesai",
      pts: "Poin",
      redeem: "Tukar Hadiah",
      viewAll: "Lihat Semua",
      claimSuccess: "50 Poin Diklaim! Terima kasih telah membuang kemasan secara bertanggung jawab. 🌍",
      missionComplete: "Misi Selesai! Mendapatkan",
      redeemSuccess: "Berhasil menukarkan",
      notEnough: "Poin tidak cukup!",
      invalidCode: "Silakan masukkan kode kemasan yang valid."
    }
  };

  const currentT = t[lang] || t.id;

  const [missions, setMissions] = useState([
    { id: 1, title: lang === 'en' ? "Daily Check-in" : "Check-in Harian", pts: 10, done: true },
    { id: 2, title: lang === 'en' ? "Read 1 Health Article" : "Baca 1 Artikel Kesehatan", pts: 25, done: false },
    { id: 3, title: lang === 'en' ? "Complete Profile" : "Lengkapi Profil", pts: 100, done: true },
  ]);

  const handleClaimPackaging = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length < 5) {
      toast.error(currentT.invalidCode);
      return;
    }
    
    // Simulate API Call
    setTimeout(() => {
      setPoints(prev => prev + 50);
      setCode("");
      toast.success(currentT.claimSuccess);
    }, 500);
  };

  const handleCompleteMission = (id: number, pts: number, isDone: boolean) => {
    if (isDone) return;
    
    setMissions(missions.map(m => m.id === id ? { ...m, done: true } : m));
    setPoints(prev => prev + pts);
    toast.success(`${currentT.missionComplete} ${pts} ${currentT.pts.toLowerCase()}.`);
  };

  const handleRedeem = (cost: number, rewardName: string) => {
    if (points >= cost) {
      setPoints(prev => prev - cost);
      toast.success(`${currentT.redeemSuccess} ${rewardName}!`);
    } else {
      toast.error(currentT.notEnough);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{currentT.title}</h1>
        <p className="text-gray-500 text-sm md:text-base mt-2 font-medium">{currentT.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Member Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#D94F8A] via-[#E86A9E] to-[#F7A8C4] rounded-3xl p-8 text-white shadow-xl shadow-pink-200/50 relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 text-white/10 pointer-events-none">
              <Trophy size={160} />
            </div>
            <div className="relative z-10">
              <p className="text-white/90 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span> {lang === 'en' ? "Gold Member" : "Anggota Emas"}
              </p>
              <div className="flex items-end gap-2 md:gap-3 mb-6 md:mb-8">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">{points.toLocaleString()}</h2>
                <span className="text-white/80 font-bold text-base md:text-lg mb-1 md:mb-1.5">{currentT.pts}</span>
              </div>

              <div className="space-y-3 bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex justify-between text-sm font-bold">
                  <span>{2000 - points > 0 ? `${2000 - points} ${lang === 'en' ? 'pts to Platinum' : 'poin ke Platinum'}` : (lang === 'en' ? 'Platinum Reached!' : 'Mencapai Platinum!')}</span>
                  <span>2,000 {lang === 'en' ? 'pts' : 'poin'}</span>
                </div>
                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((points / 2000) * 100, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Eco-Friendly Disposal / Responsible Consumer Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 border border-green-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-bl-full blur-xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-green-100 rounded-xl text-green-600 shadow-sm">
                <Recycle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{currentT.ecoFriendly}</h3>
            </div>
            
            <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed mb-6">
              {currentT.ecoDesc}
            </p>

            <form onSubmit={handleClaimPackaging} className="flex flex-col sm:flex-row gap-3 relative z-10">
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder={currentT.codePlaceholder}
                className="flex-1 px-4 py-3.5 bg-white border border-green-200 rounded-2xl text-sm font-semibold focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all outline-none uppercase"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3.5 bg-green-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-green-200 flex justify-center items-center gap-2 hover:bg-green-600 transition-colors sm:whitespace-nowrap"
              >
                {currentT.claimBtn}
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Daily Missions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Flame size={22} className="text-orange-500 fill-orange-500/20" />
                {currentT.dailyMissions}
              </h3>
            </div>
            <div className="space-y-4">
              {missions.map((mission, idx) => (
                <motion.div 
                  key={mission.id}
                  whileHover={{ scale: mission.done ? 1 : 1.02 }}
                  onClick={() => handleCompleteMission(mission.id, mission.pts, mission.done)}
                  className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm border ${mission.done ? 'border-gray-100 opacity-70' : 'border-orange-100 cursor-pointer hover:shadow-md'} flex justify-between items-center transition-all gap-2`}
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${mission.done ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                      <CheckCircle size={18} />
                    </div>
                    <span className={`text-sm md:text-base font-bold line-clamp-2 ${mission.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{mission.title}</span>
                  </div>
                  <span className={`text-xs md:text-sm font-extrabold px-2 py-1.5 md:px-3 md:py-1.5 rounded-xl shrink-0 ${mission.done ? 'bg-gray-100 text-gray-400' : 'bg-orange-100 text-orange-600'}`}>
                    +{mission.pts} {currentT.pts}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Redeem Rewards */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-xl font-bold text-gray-900 mb-5">{currentT.redeem}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🩺</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Klaim Konsultasi</h4>
                <p className="text-xs text-gray-500 mb-5 font-medium">{lang === 'en' ? "1x General Doctor chat" : "1x Sesi obrolan Dokter Umum"}</p>
                <button 
                  onClick={() => handleRedeem(500, "Klaim Konsultasi")}
                  className="mt-auto w-full py-2.5 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors"
                >
                  500 {currentT.pts}
                </button>
              </div>
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-[#D94F8A] mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎟️</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Diskon 20%</h4>
                <p className="text-xs text-gray-500 mb-5 font-medium">{lang === 'en' ? "CERVISCAN Test Kit" : "Kit Tes CERVISCAN"}</p>
                <button 
                  onClick={() => handleRedeem(800, "Diskon 20%")}
                  className="mt-auto w-full py-2.5 bg-gradient-to-r from-[#F7A8C4] to-[#D94F8A] text-white font-bold text-sm rounded-xl shadow-md shadow-pink-200/50 hover:shadow-lg transition-all"
                >
                  800 {currentT.pts}
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
