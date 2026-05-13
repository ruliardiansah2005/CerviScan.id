import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Scan, Stethoscope, MapPin, ShoppingBag, Gift, ChevronRight, RefreshCw } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const graphDataWeek = [
  { label: 'Mon', score: 85 },
  { label: 'Tue', score: 88 },
  { label: 'Wed', score: 87 },
  { label: 'Thu', score: 92 },
  { label: 'Fri', score: 95 },
  { label: 'Sat', score: 98 },
  { label: 'Sun', score: 99 },
];

const graphDataMonth = [
  { label: 'W1', score: 80 },
  { label: 'W2', score: 85 },
  { label: 'W3', score: 92 },
  { label: 'W4', score: 96 },
];

const graphDataYear = [
  { label: 'Jan', score: 70 },
  { label: 'Feb', score: 75 },
  { label: 'Mar', score: 82 },
  { label: 'Apr', score: 80 },
  { label: 'May', score: 88 },
  { label: 'Jun', score: 90 },
  { label: 'Jul', score: 95 },
  { label: 'Aug', score: 94 },
  { label: 'Sep', score: 97 },
  { label: 'Oct', score: 98 },
  { label: 'Nov', score: 98 },
  { label: 'Dec', score: 99 },
];

const AI_INSIGHTS = {
  en: [
    "Your health indicators are stable. We recommend continuing daily vitamins and maintaining hydration.",
    "Based on your latest scan trends, your skin elasticity is improving. Keep up with your current routine!",
    "We noticed a slight irregularity in your recent test. Consider booking a consultation for peace of mind.",
    "Great job maintaining consistency! Regular check-ups are key to early detection.",
    "Did you know? Drinking 8 glasses of water a day can significantly improve your cellular health."
  ],
  id: [
    "Indikator kesehatan Anda stabil. Kami menyarankan untuk melanjutkan vitamin harian dan menjaga hidrasi.",
    "Berdasarkan tren pemindaian terbaru, elastisitas kulit Anda membaik. Pertahankan rutinitas Anda saat ini!",
    "Kami melihat sedikit ketidakaturan dalam tes terbaru Anda. Pertimbangkan untuk memesan konsultasi demi ketenangan pikiran.",
    "Kerja bagus dalam menjaga konsistensi! Pemeriksaan rutin adalah kunci deteksi dini.",
    "Tahukah Anda? Minum 8 gelas air sehari dapat secara signifikan meningkatkan kesehatan seluler Anda."
  ]
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("week");
  const [insightIndex, setInsightIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const lang = (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id';

  const t = {
    en: {
      greeting: "Good Morning, 👋",
      healthScore: "Overall Health Score",
      lastTest: "Last Test Result",
      testStatus: "Negative (Safe) • 2 days ago",
      quickActions: "Quick Actions",
      menuScan: "Scan Test",
      menuConsult: "Consult",
      menuHospitals: "Hospitals",
      menuMarket: "Market",
      activity: "Health Activity",
      week: "Week",
      month: "Month",
      year: "Year",
      aiInsight: "AI Daily Insight",
      viewReport: "View detailed report",
      trendingReads: "Trending Reads",
      seeAll: "See All",
      articleCategory: "HEALTH TIPS",
      articleTitle: "Understanding HPV and Importance of Vaccination"
    },
    id: {
      greeting: "Selamat Pagi, 👋",
      healthScore: "Skor Kesehatan Keseluruhan",
      lastTest: "Hasil Tes Terakhir",
      testStatus: "Negatif (Aman) • 2 hari yang lalu",
      quickActions: "Aksi Cepat",
      menuScan: "Pindai Tes",
      menuConsult: "Konsultasi",
      menuHospitals: "Rumah Sakit",
      menuMarket: "Pasar",
      activity: "Aktivitas Kesehatan",
      week: "Minggu",
      month: "Bulan",
      year: "Tahun",
      aiInsight: "Wawasan Harian AI",
      viewReport: "Lihat laporan detail",
      trendingReads: "Bacaan Populer",
      seeAll: "Lihat Semua",
      articleCategory: "TIPS KESEHATAN",
      articleTitle: "Memahami HPV dan Pentingnya Vaksinasi"
    }
  };

  const currentT = t[lang] || t.id;
  const currentInsights = AI_INSIGHTS[lang] || AI_INSIGHTS.id;

  const generateNewInsight = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * currentInsights.length);
      while (nextIndex === insightIndex) {
        nextIndex = Math.floor(Math.random() * currentInsights.length);
      }
      setInsightIndex(nextIndex);
      setIsGenerating(false);
    }, 1500);
  };

  const getGraphData = () => {
    switch(timeFilter) {
      case "month": return graphDataMonth;
      case "year": return graphDataYear;
      default: return graphDataWeek;
    }
  };

  const quickMenus = [
    { icon: Scan, label: currentT.menuScan, path: "/app/scan", color: "bg-pink-100 text-[#D94F8A]" },
    { icon: Stethoscope, label: currentT.menuConsult, path: "/app/consult", color: "bg-blue-100 text-blue-500" },
    { icon: MapPin, label: currentT.menuHospitals, path: "/app/consult", color: "bg-purple-100 text-purple-500" },
    { icon: ShoppingBag, label: currentT.menuMarket, path: "/app/marketplace", color: "bg-orange-100 text-orange-500" },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col space-y-6 md:space-y-8 w-full">
      
      {/* Header */}
      <header className="flex justify-between items-center mt-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 md:gap-4"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
            <img src="https://images.unsplash.com/photo-1700190827481-c1fdea69a728?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGhhcHB5JTIwYXNpYW4lMjB3b21hbiUyMGhlYWx0aHxlbnwxfHx8fDE3Nzg2MjY0ODV8MA&ixlib=rb-4.1.0&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs md:text-base text-gray-500 font-medium">{currentT.greeting}</p>
            <h2 className="text-lg md:text-2xl font-extrabold text-gray-900 leading-tight">Sarah Johnson</h2>
          </div>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center relative border border-gray-100 hover:shadow-md transition-all"
        >
          <Bell size={24} className="text-gray-600" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#D94F8A] rounded-full border-2 border-white"></span>
        </motion.button>
      </header>

      {/* Main Grid Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          
          {/* Health Overview Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-[#D94F8A] to-[#F7A8C4] rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-pink-200/60 relative overflow-hidden"
          >
            <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-6 relative z-10">
              <div>
                <p className="text-white/80 text-xs md:text-base font-semibold mb-2 uppercase tracking-wide">{currentT.healthScore}</p>
                <div className="flex items-end gap-2">
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none">98</h1>
                  <span className="text-white/90 text-sm md:text-xl mb-1.5 md:mb-2 font-bold">/ 100</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center justify-center gap-2 self-start md:self-auto border border-white/20">
                <Gift size={18} className="text-white" />
                <span className="text-sm font-bold">1,250 Pts</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 flex justify-between items-center relative z-10 border border-white/10">
              <div>
                <p className="text-xs md:text-sm text-white/80 font-medium mb-1">{currentT.lastTest}</p>
                <p className="font-bold text-sm md:text-base">{currentT.testStatus}</p>
              </div>
              <button onClick={() => navigate("/app/history")} className="bg-white text-[#D94F8A] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Quick Menu */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-4 gap-3 md:gap-6"
          >
            {quickMenus.map((menu, idx) => (
              <motion.button 
                key={idx}
                whileHover={{ y: -4, shadow: "0px 10px 20px rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(menu.path)}
                className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col items-center gap-2 md:gap-4 shadow-sm border border-gray-100 transition-all group"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[14px] md:rounded-2xl flex items-center justify-center ${menu.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <menu.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <span className="text-[10px] md:text-sm font-bold text-gray-700 text-center leading-tight">{menu.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Monitoring Graph */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900">{currentT.activity}</h3>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="text-sm bg-gray-50 text-gray-600 rounded-xl px-4 py-2 outline-none font-semibold border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="week">{currentT.week}</option>
                <option value="month">{currentT.month}</option>
                <option value="year">{currentT.year}</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getGraphData()} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs key="defs">
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7A8C4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F7A8C4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    key="xaxis"
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9CA3AF' }} 
                    dy={10}
                  />
                  <Tooltip 
                    key="tooltip"
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#D94F8A', fontWeight: 'bold' }}
                  />
                  <Area key="area" type="monotone" dataKey="score" stroke="#D94F8A" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* Right Column (Sidebar Content) */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          
          {/* AI Recommendation Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-gradient-to-b from-indigo-50 to-white rounded-3xl p-6 shadow-sm border border-indigo-100 flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-bl-full pointer-events-none"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <span className="text-2xl md:text-3xl">🤖</span>
              </div>
              <button 
                onClick={generateNewInsight}
                disabled={isGenerating}
                className="p-2 bg-white rounded-full shadow-sm text-indigo-500 hover:bg-indigo-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={18} className={isGenerating ? "animate-spin" : ""} />
              </button>
            </div>
            <div className="relative z-10 min-h-[80px]">
              <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                {currentT.aiInsight}
                {isGenerating && <span className="flex gap-1"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span></span>}
              </h3>
              <AnimatePresence mode="wait">
                {!isGenerating && (
                  <motion.p 
                    key={insightIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-gray-600 leading-relaxed font-medium"
                  >
                    {currentInsights[insightIndex]}
                  </motion.p>
                )}
              </AnimatePresence>
              <button className="mt-4 text-indigo-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                {currentT.viewReport} <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Trending Articles */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-lg font-bold text-gray-900">{currentT.trendingReads}</h3>
              <button className="text-[#D94F8A] text-sm font-bold hover:text-pink-600 transition-colors">{currentT.seeAll}</button>
            </div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow group"
                >
                  <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 relative">
                    <img src="https://images.unsplash.com/photo-1700190827481-c1fdea69a728?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGhhcHB5JTIwYXNpYW4lMjB3b21hbiUyMGhlYWx0aHxlbnwxfHx8fDE3Nzg2MjY0ODV8MA&ixlib=rb-4.1.0&q=80&w=200" alt="Article" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[10px] md:text-xs text-[#D94F8A] font-extrabold mb-1.5 tracking-wider">{currentT.articleCategory}</p>
                    <h4 className="text-sm md:text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#D94F8A] transition-colors">{currentT.articleTitle}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
