import { useState, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate, useLocation } from "react-router";
import { Home, Scan, FileText, Gift, User, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { Logo } from "./components/Logo";

// Pages
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ScanTest from "./pages/ScanTest";
import History from "./pages/History";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Consult from "./pages/Consult";
import Marketplace from "./pages/Marketplace";

// Admin Pages
import { AdminLayout } from "./pages/admin/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminDashboard from "./pages/admin/AdminDashboard";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [supportChatOpen, setSupportChatOpen] = useState(false);
  const [supportMsg, setSupportMsg] = useState("");
  const [lang, setLang] = useState(() => (localStorage.getItem("lang") || "ID").toLowerCase());

  useEffect(() => {
    const handleLanguageChange = () => {
      setLang((localStorage.getItem("lang") || "ID").toLowerCase());
    };
    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const t = {
    en: {
      dashboard: "Dashboard",
      scanTest: "Scan Test",
      monitoring: "Monitoring",
      rewards: "Rewards",
      profile: "Profile",
      supportTitle: "Medical Support",
      supportDesc: "Typically replies in minutes",
      needHelp: "Need Help?",
      contactSupport: "Contact our medical support team 24/7.",
      supportBtn: "Support Chat",
      typeMsg: "Type your message...",
      agentHello: "Hello! I'm your medical support assistant. How can I help you today?",
      agentThanks: "Thanks for reaching out! A medical expert will be with you shortly."
    },
    id: {
      dashboard: "Beranda",
      scanTest: "Pindai Tes",
      monitoring: "Pemantauan",
      rewards: "Hadiah",
      profile: "Profil",
      supportTitle: "Dukungan Medis",
      supportDesc: "Biasanya membalas dalam beberapa menit",
      needHelp: "Butuh Bantuan?",
      contactSupport: "Hubungi tim dukungan medis kami 24/7.",
      supportBtn: "Obrolan Bantuan",
      typeMsg: "Ketik pesan Anda...",
      agentHello: "Halo! Saya asisten dukungan medis Anda. Ada yang bisa saya bantu hari ini?",
      agentThanks: "Terima kasih telah menghubungi kami! Seorang ahli medis akan segera melayani Anda."
    }
  };

  const currentT = t[lang as keyof typeof t] || t.id;

  const [messages, setMessages] = useState([
    { id: 1, sender: "agent", text: currentT.agentHello }
  ]);

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "user", text: supportMsg }]);
    setSupportMsg("");
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), sender: "agent", text: currentT.agentThanks }]);
    }, 1000);
  };

  const navItems = [
    { icon: Home, label: currentT.dashboard, path: "/app" },
    { icon: Scan, label: currentT.scanTest, path: "/app/scan" },
    { icon: FileText, label: currentT.monitoring, path: "/app/history" },
    { icon: Gift, label: currentT.rewards, path: "/app/rewards" },
    { icon: User, label: currentT.profile, path: "/app/profile" },
  ];

  return (
    <div className="flex h-screen w-full relative bg-[#F5F5F7] overflow-hidden">
      <Toaster position="top-center" richColors />
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 z-20 shadow-sm shadow-pink-100/20">
        <div className="p-8 flex flex-col gap-2">
          <Logo />
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== "/app");
            return (
              <button 
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-pink-50 text-[#D94F8A] shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Icon size={20} className={isActive ? 'fill-[#F7A8C4]/20' : ''} />
                <span className="font-semibold text-sm">{item.label}</span>
                {isActive && (
                  <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-6 bg-[#D94F8A] rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="p-6">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl p-5 border border-pink-100/50">
            <h4 className="font-bold text-[#D94F8A] text-sm mb-1">{currentT.needHelp}</h4>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">{currentT.contactSupport}</p>
            <button onClick={() => setSupportChatOpen(true)} className="w-full bg-white text-[#D94F8A] py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all">{currentT.supportBtn}</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 md:pb-0 relative z-10 w-full h-full scroll-smooth overflow-x-hidden">
        <div className="max-w-7xl mx-auto min-h-full flex flex-col">
          <Outlet />
        </div>
      </div>
      
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-4 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7]/80 to-transparent">
        <div className="bg-white/95 backdrop-blur-xl border border-white/80 shadow-lg shadow-pink-200/30 rounded-3xl py-2.5 px-4 flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== "/app");
            return (
              <button 
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 min-w-[64px] transition-all ${isActive ? 'text-[#D94F8A]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className={`p-1.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-pink-100/50 scale-110' : ''}`}>
                  <Icon size={20} className={isActive ? 'fill-[#F7A8C4]/20' : ''} />
                </div>
                <span className={`text-[10px] font-bold ${isActive ? 'text-[#D94F8A]' : 'text-gray-400 font-medium'}`}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Support Chat Modal Overlay */}
      <AnimatePresence>
        {supportChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:w-96 md:bottom-8 md:right-8 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden w-auto"
            style={{ height: '500px', maxHeight: '70vh' }}
          >
            <div className="bg-gradient-to-r from-[#D94F8A] to-[#F7A8C4] p-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold">{currentT.supportTitle}</h3>
                <p className="text-xs text-white/80">{currentT.supportDesc}</p>
              </div>
              <button onClick={() => setSupportChatOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.sender === 'user' ? 'bg-[#D94F8A] text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendSupport} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={supportMsg}
                onChange={(e) => setSupportMsg(e.target.value)}
                placeholder={currentT.typeMsg}
                className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              <button type="submit" className="w-10 h-10 bg-[#D94F8A] text-white rounded-xl flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/", Component: Splash },
  { path: "/onboarding", Component: Onboarding },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "scan", Component: ScanTest },
      { path: "history", Component: History },
      { path: "rewards", Component: Rewards },
      { path: "profile", Component: Profile },
      { path: "consult", Component: Consult },
      { path: "marketplace", Component: Marketplace },
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "products", Component: AdminProducts },
      { path: "users", Component: () => <div className="text-center py-20 text-slate-500 font-bold text-2xl">Manajemen Pengguna Segera Hadir</div> },
      { path: "settings", Component: () => <div className="text-center py-20 text-slate-500 font-bold text-2xl">Pengaturan Admin Segera Hadir</div> }
    ]
  }
]);
