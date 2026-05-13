import { useState } from "react";
import { ChevronRight, Calendar, AlertCircle } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "motion/react";

const data = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
  { month: 'Mar', score: 92 },
  { month: 'Apr', score: 95 },
  { month: 'May', score: 98 },
];

export default function History() {
  const [tab, setTab] = useState<"timeline" | "stats">("timeline");
  const lang = (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id';

  const t = {
    en: {
      title: "Monitoring 📊",
      subtitle: "Track your reproductive health",
      tabTimeline: "Timeline History",
      tabStats: "AI Statistics",
      timelineTitle: "Recent Records",
      aiScan: "AI Scan",
      clinicLab: "Clinic Lab",
      negative: "Negative",
      confidence: "Confidence",
      statsTitle: "Health Score Trend",
      avgScore: "Average Score",
      last6Months: "Last 6 Months",
      analysis: "Quick Analysis",
      analysisDesc: "Your health score is consistently improving. Keep following the AI recommendations.",
      bookCheckup: "Book clinical check-up",
      nextTestTitle: "Next Test Reminder",
      nextTestDesc: "You're due for a test in 6 months. We will remind you 2 weeks before your scheduled date.",
      upcoming: "Upcoming",
      nov2026: "November 2026",
      viewDetails: "View Details"
    },
    id: {
      title: "Pemantauan 📊",
      subtitle: "Lacak kesehatan reproduksi Anda",
      tabTimeline: "Riwayat Waktu",
      tabStats: "Statistik AI",
      timelineTitle: "Catatan Terbaru",
      aiScan: "Pemindaian AI",
      clinicLab: "Laboratorium Klinik",
      negative: "Negatif",
      confidence: "Kepercayaan",
      statsTitle: "Tren Skor Kesehatan",
      avgScore: "Skor Rata-rata",
      last6Months: "6 Bulan Terakhir",
      analysis: "Analisis Cepat",
      analysisDesc: "Skor kesehatan Anda terus membaik. Tetap ikuti rekomendasi AI.",
      bookCheckup: "Pesan pemeriksaan klinis",
      nextTestTitle: "Pengingat Tes Berikutnya",
      nextTestDesc: "Anda dijadwalkan untuk tes dalam 6 bulan. Kami akan mengingatkan Anda 2 minggu sebelumnya.",
      upcoming: "Akan Datang",
      nov2026: "November 2026",
      viewDetails: "Lihat Detail"
    }
  };

  const currentT = t[lang] || t.id;

  const historyLogs = [
    { id: 1, date: "12 Mei 2026", result: currentT.negative, confidence: "99.8%", status: "safe", type: currentT.aiScan },
    { id: 2, date: "10 Jan 2026", result: currentT.negative, confidence: "98.5%", status: "safe", type: currentT.aiScan },
    { id: 3, date: "15 Agu 2025", result: currentT.negative, confidence: "99.1%", status: "safe", type: currentT.clinicLab },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{currentT.title}</h1>
        <p className="text-gray-500 text-sm md:text-base mt-2 font-medium">{currentT.subtitle}</p>
      </header>

      {/* Tabs */}
      <div className="bg-gray-100/80 p-1.5 flex mb-8 rounded-2xl md:w-96">
        <button 
          onClick={() => setTab("timeline")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tab === "timeline" ? "bg-white text-[#D94F8A] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        >
          {currentT.tabTimeline}
        </button>
        <button 
          onClick={() => setTab("stats")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tab === "stats" ? "bg-white text-[#D94F8A] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        >
          {currentT.tabStats}
        </button>
      </div>

      {tab === "timeline" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-6 border border-pink-100/50 shadow-sm sticky top-6">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-[#D94F8A] mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{currentT.nextTestTitle}</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{currentT.nextTestDesc}</p>
              <div className="bg-white rounded-2xl p-4 border border-pink-50 flex items-center justify-between shadow-sm">
                <span className="font-bold text-gray-900">{currentT.nov2026}</span>
                <span className="bg-[#D94F8A] text-white text-xs font-bold px-3 py-1.5 rounded-lg">{currentT.upcoming}</span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 relative border-l-2 border-pink-100 ml-2 md:ml-4 lg:ml-0 pl-4 md:pl-6 lg:pl-10 space-y-6 md:space-y-8 mt-2 md:mt-0">
            {historyLogs.map((log, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                key={log.id} className="relative group"
              >
                <div className="absolute -left-[27px] md:-left-[35px] lg:-left-[51px] top-4 md:top-6 w-5 h-5 rounded-full bg-white border-4 border-[#D94F8A] shadow-sm group-hover:scale-125 transition-transform"></div>
                <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:shadow-md transition-all cursor-pointer gap-3 md:gap-4 group-hover:-translate-y-1">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{log.date}</span>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mt-1 mb-2 flex items-center gap-2">
                      {log.result}
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block shadow-sm"></span>
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-50 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md">{log.type}</span>
                      <span className="text-sm text-gray-500 font-medium">{log.confidence} {currentT.confidence}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-pink-50 group-hover:text-[#D94F8A] transition-colors self-end sm:self-center">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {tab === "stats" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{currentT.statsTitle}</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D94F8A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D94F8A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip cursor={{ stroke: '#fbcfe8', strokeWidth: 2, strokeDasharray: '5 5' }} />
                  <Area type="monotone" dataKey="score" stroke="#D94F8A" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-6 md:p-8 shadow-sm border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{currentT.analysis}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                {currentT.analysisDesc}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-green-100 text-green-700 text-sm font-bold px-4 py-2 rounded-xl border border-green-200">{currentT.negative}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">{currentT.avgScore}</p>
                <p className="text-3xl font-extrabold text-gray-900">98</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">{currentT.confidence}</p>
                <p className="text-3xl font-extrabold text-[#D94F8A]">99.1%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
