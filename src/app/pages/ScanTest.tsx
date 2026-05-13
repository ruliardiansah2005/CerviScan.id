import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, CheckCircle, AlertTriangle, ChevronRight, Stethoscope, MapPin, Image as ImageIcon } from "lucide-react";

export default function ScanTest() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"camera" | "processing" | "result">("camera");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasCameraError, setHasCameraError] = useState(false);
  const lang = (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id';

  const t = {
    en: {
      scanner: "AI SCANNER",
      sandboxWarning: "Sandbox preview restricts live camera. Please use the camera button below.",
      placeTest: "Place the DIP TEST inside the frame",
      processingTitle: "AI Analysis",
      processingDesc: "Processing image and detecting lines...",
      scanResult: "Scan Result",
      negative: "Negative",
      negativeDesc: "No HPV detected in sample",
      confidence: "AI Confidence Score",
      recommendation: "AI Recommendation",
      recommendationDesc: "Your result is clear. Maintain your routine screening every 3-5 years. You may consult a doctor if you have other symptoms.",
      consult: "Consult Doctor",
      hospital: "Find Hospital",
      save: "Save Result to History"
    },
    id: {
      scanner: "PEMINDAI AI",
      sandboxWarning: "Pratinjau Sandbox membatasi kamera langsung. Gunakan tombol kamera di bawah.",
      placeTest: "Tempatkan ALAT TES di dalam bingkai",
      processingTitle: "Analisis AI",
      processingDesc: "Memproses gambar dan mendeteksi garis...",
      scanResult: "Hasil Pemindaian",
      negative: "Negatif",
      negativeDesc: "Tidak ada HPV yang terdeteksi dalam sampel",
      confidence: "Skor Kepercayaan AI",
      recommendation: "Rekomendasi AI",
      recommendationDesc: "Hasil Anda bersih. Pertahankan skrining rutin Anda setiap 3-5 tahun. Anda dapat berkonsultasi dengan dokter jika memiliki gejala lain.",
      consult: "Konsultasi Dokter",
      hospital: "Cari Rumah Sakit",
      save: "Simpan Hasil ke Riwayat"
    }
  };

  const currentT = t[lang] || t.id;

  const cameraCaptureRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [stage]);

  const startCamera = async () => {
    try {
      // First try checking if we have any permissions or if device supports it
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this environment");
      }

      // Stop any existing stream before starting a new one
      stopCamera();

      // Request stream with environment camera priority
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" },
        audio: false // ensure audio is not requested
      });
      
      if (videoRef.current) {
        // Important: set properties before assigning srcObject for iOS/Safari support
        videoRef.current.setAttribute('autoplay', '');
        videoRef.current.setAttribute('muted', '');
        videoRef.current.setAttribute('playsinline', '');
        
        videoRef.current.srcObject = stream;
        
        // Ensure play is called and catch any play interruptions
        try {
          await videoRef.current.play();
        } catch (playErr) {
          // Play was interrupted, usually by lack of user interaction
          // Not necessarily an error with the stream itself
          console.log("Play interrupted or required user interaction first", playErr);
        }
      }
      
      streamRef.current = stream;
      setHasCameraError(false);
    } catch (err) {
      // Supress the error in the console to keep the sandbox clean
      setHasCameraError(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startScan = () => {
    setStage("processing");
    setTimeout(() => {
      setStage("result");
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStage("processing");
      setTimeout(() => {
        setStage("result");
      }, 3000);
    }
  };

  return (
    <div className="flex-1 w-full bg-black flex flex-col relative overflow-hidden md:rounded-3xl md:m-6 md:w-[calc(100%-48px)] shadow-2xl">
      <AnimatePresence mode="wait">
        
        {stage === "camera" && (
          <motion.div 
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex flex-col"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center">
              <button onClick={() => navigate("/app")} className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                <X size={24} />
              </button>
              <div className="bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full text-white text-sm font-bold tracking-widest border border-white/10 uppercase">
                {currentT.scanner}
              </div>
              <div className="w-12" /> {/* Spacer for centering */}
            </div>

            {/* Fake or Real Camera View */}
            <div className="flex-1 relative bg-zinc-900 flex items-center justify-center overflow-hidden">
              {hasCameraError ? (
                <>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?q=80&w=1200')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                  <div className="absolute top-24 left-0 right-0 text-center z-20 px-6">
                    <div className="bg-black/60 backdrop-blur-md inline-block px-4 py-2 rounded-xl border border-white/10">
                      <p className="text-white/80 text-xs md:text-sm">{currentT.sandboxWarning}</p>
                    </div>
                  </div>
                </>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              {/* Detection Frame - Larger for desktop */}
              <div className="w-72 h-40 md:w-96 md:h-56 border-2 border-dashed border-white/50 rounded-3xl relative z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#D94F8A] rounded-tl-2xl -mt-[2px] -ml-[2px]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#D94F8A] rounded-tr-2xl -mt-[2px] -mr-[2px]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#D94F8A] rounded-bl-2xl -mb-[2px] -ml-[2px]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#D94F8A] rounded-br-2xl -mb-[2px] -mr-[2px]"></div>
                
                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30">
                  <Camera size={32} />
                </div>
              </div>
              
              <div className="absolute bottom-32 md:bottom-40 left-0 right-0 text-center z-10">
                <p className="text-white text-sm md:text-base font-medium bg-black/60 inline-block px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg uppercase">
                  {currentT.placeTest}
                </p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="h-48 md:h-56 bg-gradient-to-t from-black via-black/90 to-transparent absolute bottom-0 w-full flex items-end justify-center pb-8 z-20">
              <div className="flex items-center gap-6 md:gap-10">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors shadow-lg"
                >
                  <ImageIcon size={24} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
                
                <input 
                  type="file" 
                  ref={cameraCaptureRef} 
                  accept="image/*" 
                  capture="environment"
                  className="hidden" 
                  onChange={handleFileUpload} 
                />

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (hasCameraError) {
                      cameraCaptureRef.current?.click();
                    } else {
                      startScan();
                    }
                  }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#F7A8C4] p-1.5 bg-black/20 backdrop-blur-sm shadow-[0_0_30px_rgba(247,168,196,0.3)]"
                >
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center"></div>
                </motion.button>
                
                <div className="w-14 h-14" /> {/* Spacer for centering */}
              </div>
            </div>
          </motion.div>
        )}

        {stage === "processing" && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex flex-col items-center justify-center bg-gray-900 relative"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 rounded-full border-t-4 border-r-4 border-l-4 border-[#D94F8A] border-b-4 border-transparent flex items-center justify-center relative"
            >
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-t-4 border-[#F7A8C4] border-l-4 border-r-4 border-b-4 border-transparent border-dashed"
              />
            </motion.div>
            <h3 className="text-white font-extrabold text-2xl md:text-3xl mt-10 tracking-wide">{currentT.processingTitle}</h3>
            <p className="text-gray-400 mt-3 text-base md:text-lg font-medium">{currentT.processingDesc}</p>
          </motion.div>
        )}

        {stage === "result" && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full w-full bg-[#F5F5F7] flex flex-col md:rounded-3xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-200/50 bg-white/50 backdrop-blur-md">
              <button onClick={() => navigate("/app")} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
                <X size={24} />
              </button>
              <h2 className="font-extrabold text-xl text-gray-900">{currentT.scanResult}</h2>
              <div className="w-12" />
            </div>

            <div className="flex-1 overflow-y-auto pb-10 flex flex-col items-center p-6 md:p-10">
              <div className="w-full max-w-2xl flex flex-col gap-6 md:gap-8">
                
                {/* Result Card */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden text-center flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 md:w-32 md:h-32 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 shadow-inner"
                  >
                    <CheckCircle size={48} className="md:w-16 md:h-16" />
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{currentT.negative}</h1>
                  <p className="text-gray-500 text-base md:text-lg font-medium mb-8">{currentT.negativeDesc}</p>
                  
                  <div className="w-full bg-gray-50 rounded-2xl p-5 md:p-6 flex justify-between items-center border border-gray-100">
                    <span className="text-gray-600 font-bold text-sm md:text-base">{currentT.confidence}</span>
                    <span className="text-green-500 font-extrabold text-xl md:text-2xl">99.8%</span>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 ml-2 text-lg">{currentT.recommendation}</h3>
                  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex gap-5 md:gap-6 items-start">
                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#D94F8A]">
                      <AlertTriangle size={28} />
                    </div>
                    <div>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                        {currentT.recommendationDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions - Grid on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <motion.button 
                    whileHover={{ y: -2 }}
                    onClick={() => navigate("/app/consult")} className="w-full py-5 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 shadow-sm flex justify-between items-center px-6 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 rounded-xl text-blue-500"><Stethoscope size={24} /></div>
                      <span className="text-base">{currentT.consult}</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -2 }}
                    onClick={() => navigate("/app/consult")} className="w-full py-5 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 shadow-sm flex justify-between items-center px-6 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-50 rounded-xl text-purple-500"><MapPin size={24} /></div>
                      <span className="text-base">{currentT.hospital}</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </motion.button>
                </div>
                
                <div className="mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/app/history")} className="w-full py-5 text-lg bg-gradient-to-r from-[#F7A8C4] to-[#D94F8A] text-white rounded-2xl font-bold shadow-lg shadow-pink-200/50 hover:shadow-xl transition-all"
                  >
                    {currentT.save}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
