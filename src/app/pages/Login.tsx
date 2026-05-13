import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Fingerprint, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Logo } from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const lang = (localStorage.getItem("lang") || "ID").toLowerCase();

  const t = {
    en: {
      title: "Take Control of Your \n Reproductive Health.",
      subtitle: "CERVISCAN™ provides real-time monitoring and early detection powered by advanced AI technology.",
      welcome: "Welcome Back! 👋",
      signInMsg: "Sign in to monitor your health journey.",
      email: "Email Address",
      password: "Password",
      forgot: "Forgot Password?",
      signInBtn: "Sign In",
      continueWith: "Or continue with",
      biometric: "Biometric",
      noAccount: "Don't have an account?",
      register: "Register here",
      connecting: "Connecting to Google...",
      success: "Login successful!"
    },
    id: {
      title: "Kendalikan Kesehatan \n Reproduksi Anda.",
      subtitle: "CERVISCAN™ Care menyediakan pemantauan real-time dan deteksi dini yang didukung oleh teknologi AI canggih.",
      welcome: "Selamat Datang Kembali! 👋",
      signInMsg: "Masuk untuk memantau perjalanan kesehatan Anda.",
      email: "Alamat Email",
      password: "Kata Sandi",
      forgot: "Lupa Kata Sandi?",
      signInBtn: "Masuk",
      continueWith: "Atau lanjutkan dengan",
      biometric: "Biometrik",
      noAccount: "Belum punya akun?",
      register: "Daftar di sini",
      connecting: "Menghubungkan ke Google...",
      success: "Berhasil masuk!"
    }
  };

  const currentT = t[lang as keyof typeof t] || t.id;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row relative">
      
      {/* Visual / Branding Side for Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-50 via-[#F7A8C4] to-[#D94F8A] relative overflow-hidden flex-col items-center justify-center p-12">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent blur-3xl pointer-events-none"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white space-y-6 max-w-lg flex flex-col items-center"
        >
          <Logo variant="white" suffix={<span className="font-light">Care</span>} className="scale-125 mb-4" />
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mt-4 whitespace-pre-line">
            {currentT.title}
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            {currentT.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{currentT.welcome}</h1>
            <p className="text-gray-500 lg:text-lg">{currentT.signInMsg}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.email}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#D94F8A] transition-colors" />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-11 pr-4 py-4 lg:py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.password}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#D94F8A] transition-colors" />
                </div>
                <input 
                  type="password" 
                  className="w-full pl-11 pr-4 py-4 lg:py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button type="button" className="text-sm font-bold text-[#D94F8A] hover:text-pink-600 transition-colors">{currentT.forgot}</button>
            </div>

            <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 lg:py-4 bg-gradient-to-r from-[#F7A8C4] to-[#D94F8A] text-white rounded-2xl font-bold text-lg shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-200 flex items-center justify-center gap-2 transition-all"
              >
                {currentT.signInBtn}
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">{currentT.continueWith}</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ y: -2 }} 
              onClick={() => {
                const toastId = toast.loading(currentT.connecting);
                setTimeout(() => {
                  toast.success(currentT.success, { id: toastId });
                  navigate("/app");
                }, 1500);
              }}
              className="flex items-center justify-center py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-bold text-gray-700">Google</span>
            </motion.button>
            
            <motion.button whileHover={{ y: -2 }} className="flex items-center justify-center py-3.5 bg-[#F5F5F7] text-[#D94F8A] rounded-2xl hover:bg-pink-50 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-pink-100">
              <Fingerprint className="w-5 h-5 mr-2" />
              <span className="text-sm font-bold">{currentT.biometric}</span>
            </motion.button>
          </div>

          <div className="pt-10 text-center">
            <p className="text-sm text-gray-600 font-medium">
              {currentT.noAccount}{" "}
              <button onClick={() => navigate("/register")} className="font-bold text-[#D94F8A] hover:text-pink-600 hover:underline transition-all">
                {currentT.register}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
