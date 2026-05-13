import { useState, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Users, ShoppingBag, LogOut, Settings, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { Logo } from "../../components/Logo";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { icon: LayoutDashboard, label: "Dasbor", path: "/admin" },
    { icon: ShoppingBag, label: "Produk (Marketplace)", path: "/admin/products" },
    { icon: Users, label: "Pengguna", path: "/admin/users" },
    { icon: Settings, label: "Pengaturan", path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen w-full relative bg-[#F5F5F7] overflow-hidden">
      <Toaster position="top-center" richColors />
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>

      {/* Sidebar (Desktop & Mobile) */}
      <aside className={`fixed inset-y-0 left-0 lg:static flex flex-col w-72 bg-slate-900 text-white z-40 shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10">
          <Logo variant="white" suffix={<span className="font-light text-pink-300">Admin</span>} />
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <button 
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <Icon size={20} />
                <span className="font-semibold text-sm text-left">{item.label}</span>
                {isActive && (
                  <motion.div layoutId="activeAdminNav" className="ml-auto w-1.5 h-6 bg-white rounded-full hidden lg:block" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut size={20} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full h-full bg-slate-50 relative">
        <header className="bg-white border-b border-gray-200 px-4 md:px-10 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">Panel Admin</h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Admin User</p>
              <p className="text-xs text-slate-500">Superadmin</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold border border-pink-200 shrink-0">
              A
            </div>
          </div>
        </header>
        <div className="p-4 md:p-6 lg:p-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
