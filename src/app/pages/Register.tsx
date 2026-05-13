import { useState } from "react";
import { User, Mail, Lock, Phone, ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Logo } from "../components/Logo";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const lang = (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id';

  const t = {
    en: {
      title: "Join the Future of \n Women's Health.",
      subtitle: "Create an account to start your journey with proactive, AI-driven reproductive care.",
      createTitle: "Create Account ✨",
      createSubtitle: "Join CERVISCAN™ Care for better health.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      dob: "Date of Birth",
      gender: "Gender",
      selectGender: "Select Gender",
      female: "Female",
      male: "Male",
      history: "Brief Medical History (Optional)",
      historyPlaceholder: "Any allergies or previous conditions?",
      next: "Next Step",
      complete: "Complete Registration"
    },
    id: {
      title: "Bergabung dengan Masa Depan \n Kesehatan Wanita.",
      subtitle: "Buat akun untuk memulai perjalanan Anda dengan perawatan reproduksi proaktif berbasis AI.",
      createTitle: "Buat Akun ✨",
      createSubtitle: "Bergabung dengan CERVISCAN™ Care untuk kesehatan yang lebih baik.",
      name: "Nama Lengkap",
      email: "Alamat Email",
      phone: "Nomor Telepon",
      password: "Kata Sandi",
      dob: "Tanggal Lahir",
      gender: "Jenis Kelamin",
      selectGender: "Pilih Jenis Kelamin",
      female: "Perempuan",
      male: "Laki-laki",
      history: "Riwayat Medis Singkat (Opsional)",
      historyPlaceholder: "Ada alergi atau kondisi sebelumnya?",
      next: "Langkah Berikutnya",
      complete: "Selesaikan Pendaftaran"
    }
  };

  const currentT = t[lang] || t.id;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else navigate("/app");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row relative">
      {/* Visual / Branding Side for Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F7A8C4] via-[#D94F8A] to-pink-600 relative overflow-hidden flex-col items-center justify-center p-12">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent blur-3xl pointer-events-none"
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
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="absolute top-6 left-6 lg:top-12 lg:left-12">
          <button 
            onClick={() => step === 2 ? setStep(1) : navigate(-1)}
            className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-[#D94F8A] transition-all shadow-sm"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mt-16 lg:mt-0"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{currentT.createTitle}</h1>
            <p className="text-gray-500 lg:text-lg">{currentT.createSubtitle}</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {step === 1 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.name}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#D94F8A] transition-colors" />
                    </div>
                    <input type="text" required className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none" placeholder={currentT.name} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.email}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#D94F8A] transition-colors" />
                    </div>
                    <input type="email" required className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none" placeholder={currentT.email} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.phone}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#D94F8A] transition-colors" />
                    </div>
                    <input type="tel" required className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none" placeholder={currentT.phone} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.password}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#D94F8A] transition-colors" />
                    </div>
                    <input type="password" required className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none" placeholder={currentT.password} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.dob}</label>
                  <input type="date" required className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.gender}</label>
                  <select required className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none appearance-none">
                    <option value="" disabled selected>{currentT.selectGender}</option>
                    <option value="female">{currentT.female}</option>
                    <option value="male">{currentT.male}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{currentT.history}</label>
                  <textarea rows={4} className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 transition-all outline-none resize-none" placeholder={currentT.historyPlaceholder}></textarea>
                </div>
              </motion.div>
            )}

            <div className="pt-6">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#F7A8C4] to-[#D94F8A] text-white rounded-2xl font-bold text-lg shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-200 flex items-center justify-center gap-2 transition-all"
              >
                {step === 1 ? currentT.next : currentT.complete}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
