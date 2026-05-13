import { Users, ShoppingBag, DollarSign, Activity, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const salesData = [
  { name: 'Mon', total: 1200000 },
  { name: 'Tue', total: 1800000 },
  { name: 'Wed', total: 1400000 },
  { name: 'Thu', total: 2200000 },
  { name: 'Fri', total: 2800000 },
  { name: 'Sat', total: 3500000 },
  { name: 'Sun', total: 3100000 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Ringkasan Dasbor</h1>
          <p className="text-slate-500 mt-1">Selamat datang kembali, berikut aktivitas hari ini.</p>
        </div>
        <div className="px-4 py-2 bg-pink-50 text-pink-600 rounded-xl font-bold flex items-center gap-2 border border-pink-100 self-start md:self-auto">
          <ShieldCheck size={18} />
          Status Sistem: Sehat
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Pendapatan", value: "Rp 15.2M", icon: DollarSign, color: "text-green-600", bg: "bg-green-50", trend: "+12.5%" },
          { label: "Pengguna Aktif", value: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "+5.2%" },
          { label: "Produk Terjual", value: "384", icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50", trend: "+18.1%" },
          { label: "Pemindaian AI", value: "142", icon: Activity, color: "text-pink-600", bg: "bg-pink-50", trend: "+2.4%" },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{stat.trend}</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1">{stat.label}</p>
              <h3 className="text-2xl font-extrabold text-slate-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold text-slate-900">Pendapatan Mingguan</h3>
            <button className="text-pink-600 text-sm font-bold flex items-center gap-1 hover:text-pink-700">
              Laporan Penuh <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#db2777" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <Tooltip 
                  formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="total" stroke="#db2777" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold text-slate-900">Pendaftar Terbaru</h3>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {[
              { name: "Sarah Johnson", email: "sarah.j@example.com", time: "2 mnt lalu", initials: "SJ", color: "bg-purple-100 text-purple-600" },
              { name: "Amanda Putri", email: "amanda.p@example.com", time: "1 jam lalu", initials: "AP", color: "bg-blue-100 text-blue-600" },
              { name: "Linda Wijaya", email: "linda.w@example.com", time: "3 jam lalu", initials: "LW", color: "bg-pink-100 text-pink-600" },
              { name: "Michelle Chen", email: "m.chen@example.com", time: "5 jam lalu", initials: "MC", color: "bg-orange-100 text-orange-600" },
            ].map((user, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${user.color}`}>
                  {user.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 shrink-0">{user.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Lihat Semua Pengguna
          </button>
        </motion.div>
      </div>
    </div>
  );
}