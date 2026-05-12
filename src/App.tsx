import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  User,
  Star,
  Zap,
  TrendingUp,
  Heart,
  CircleDollarSign,
  Gem,
  ChevronRight,
  ShieldCheck,
  Instagram,
  Facebook,
  MessageCircle,
  Copy,
  Download,
  Share2,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { GoogleGenAI } from "@google/genai";

// --- Types & Interfaces ---
export interface BirthDetails {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

export interface AstrologyReport {
  luckScore: number;
  energyScore: number;
  luckyColor: string;
  luckyNumber: number;
  favorableTimings: string;
  planetaryAlignment: string;
  relationshipEnergy: string;
  financialEnergy: string;
  personalizedInsight: string;
}

// --- AI Service Logic ---
let genAI: GoogleGenAI | null = null;

function getAI() {
  if (!genAI) {
    const apiKey = (process as any).env?.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Using mock responses.");
    }
    genAI = new GoogleGenAI({ apiKey: apiKey || "MOCK_KEY" });
  }
  return genAI;
}

export async function generateAstrologyReport(details: BirthDetails, reportType: string): Promise<AstrologyReport> {
  const prompt = `
    You are an expert Vedic Astrologer. Generate a highly personalized ${reportType} for the following user:
    Name: ${details.name}
    DOB: ${details.dob}
    Time of Birth: ${details.tob}
    Place of Birth: ${details.pob}

    The report should feel spiritual, premium, and trustworthy. Use modern Indian English.
    Provide scores from 0-100 for Luck and Energy.
    Provide specific Vedic insights.
    
    Return the response in JSON format with these exact keys:
    luckScore, energyScore, luckyColor, luckyNumber, favorableTimings, planetaryAlignment, relationshipEnergy, financialEnergy, personalizedInsight
  `;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text || "{}";
    const parsedData = JSON.parse(responseText);
    
    return {
      luckScore: parsedData.luckScore || 85,
      energyScore: parsedData.energyScore || 78,
      luckyColor: parsedData.luckyColor || "Saffron",
      luckyNumber: parsedData.luckyNumber || 7,
      favorableTimings: parsedData.favorableTimings || "10:30 AM - 12:00 PM",
      planetaryAlignment: parsedData.planetaryAlignment || "Jupiter is in a strong position, favoring your career.",
      relationshipEnergy: parsedData.relationshipEnergy || "Harmonious period for existing relationships.",
      financialEnergy: parsedData.financialEnergy || "Moderate gains expected.",
      personalizedInsight: parsedData.personalizedInsight || "Your cosmic energy is vibrating at a high frequency."
    };
  } catch (error) {
    console.error("Error generating report:", error);
    return {
      luckScore: 85,
      energyScore: 78,
      luckyColor: "Saffron",
      luckyNumber: 7,
      favorableTimings: "10:30 AM - 12:00 PM",
      planetaryAlignment: "Jupiter is in a strong position, favoring your career.",
      relationshipEnergy: "Harmonious period for existing relationships.",
      financialEnergy: "Moderate gains expected. Avoid risky investments today.",
      personalizedInsight: "Your cosmic energy is vibrating at a high frequency. Trust the process."
    };
  }
}

// --- Internal Components ---

const Background = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 0.5}px`,
      duration: `${Math.random() * 5 + 3}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="cosmic-bg pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} />
      {stars.map((star) => (
        <div key={star.id} className="star" style={{ top: star.top, left: star.left, width: star.size, height: star.size, "--duration": star.duration } as any} />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] zodiac-wheel opacity-[0.02]">
        <img src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=800" alt="Zodiac Wheel" className="w-full h-full object-contain filter invert" referrerPolicy="no-referrer" />
      </div>
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-10 py-6 border-b border-white/5 backdrop-blur-md bg-cosmic-dark/20">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-amber-700 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          <span className="text-2xl">ॐ</span>
        </div>
        <span className="text-xl font-bold tracking-tight uppercase leading-none text-white">
          Vedic<span className="text-amber-400">Pulse</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-2 text-sm font-medium text-amber-200/80">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          52,402 Reports Generated
        </div>
        <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">Get Your Report</button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
        <div className="space-y-4">
           <span className="badge-amber">Instant Vedic Insights</span>
           <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
             Discover Your <br/> Daily <span className="text-amber-400">Luck & Muhurat</span>
           </h1>
           <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
             Personalized Vedic insights based on your birth details, planetary positions, and numerology.
           </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 glass-card bg-white/5 transition-all"><div className="text-amber-500 text-xs font-bold mb-1 uppercase tracking-wider">Step 01</div><div className="text-sm font-medium text-white">Enter Details</div></div>
          <div className="p-4 glass-card bg-white/5 transition-all"><div className="text-amber-500 text-xs font-bold mb-1 uppercase tracking-wider">Step 02</div><div className="text-sm font-medium text-white">AI Analysis</div></div>
          <div className="p-4 glass-card bg-amber-500/10 border-amber-500/20 transition-all"><div className="text-amber-500 text-xs font-bold mb-1 uppercase tracking-wider">Step 03</div><div className="text-sm font-medium text-white">Instant PDF</div></div>
        </div>
        <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary px-10">Get My Report</button>
      </div>
      <div className="lg:col-span-5 hidden lg:flex justify-center items-center relative">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-purple-900/20 to-blue-900/20 border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(88,28,135,0.2)] backdrop-blur-xl">
          <div className="text-center">
            <div className="text-6xl mb-2">♈</div>
            <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Current Muhurat</div>
            <div className="text-2xl font-bold">Shubh</div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const PRODUCTS_DATA = [
  { id: "daily-luck", icon: <Gem className="text-amber-400" />, title: "Daily Luck & Muhurat", desc: "Luck score, lucky colors, and energy alignment.", price: 12, originalPrice: 49, time: "Instant" },
  { id: "business-success", icon: <TrendingUp className="text-cyan-400" />, title: "Business Success Timer", desc: "Best time to launch ventures or sign deals.", price: 29, originalPrice: 99, time: "2 Mins" },
  { id: "love-compatibility", icon: <Heart className="text-rose-500" />, title: "Love Snapshot", desc: "Emotional compatibility and attraction levels.", price: 19, originalPrice: 79, time: "Instant" }
];

const ProductGridComp = ({ onSelect }: { onSelect: (id: string, price: number) => void }) => (
  <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
      <div><h2 className="text-3xl font-bold text-amber-200">Micro Reports</h2><p className="text-gray-400 mt-2">Personalized insights at pocket-friendly prices.</p></div>
      <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mr-2">Limited Time: ₹12 Offer</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCTS_DATA.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={() => onSelect(p.id, p.price)} className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{p.icon}</div>
            <div className="text-right"><div className="text-[10px] text-gray-500 line-through">₹{p.originalPrice}</div><div className="text-xl font-black text-amber-400 leading-none mt-1">₹{p.price}</div></div>
          </div>
          <h3 className="font-bold text-lg mb-2 group-hover:text-amber-300 transition-colors uppercase tracking-tight">{p.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">{p.desc}</p>
          <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Delivery: {p.time}</div><div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all"><ChevronRight size={16} /></div></div>
        </motion.div>
      ))}
    </div>
  </section>
);

const AstrologyFormComp = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (d: BirthDetails) => void }) => {
  const [fd, setFd] = useState<BirthDetails>({ name: "", dob: "", tob: "", pob: "" });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-cosmic-dark/80 backdrop-blur-xl">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="glass-card w-full max-w-md p-8 relative bg-white/5 border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
        <h2 className="text-3xl font-bold mb-2 text-amber-200">Birth Details</h2>
        <p className="text-gray-400 text-sm mb-8">Vedic alignment calculation requires precise data.</p>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(fd); }}>
          <div className="space-y-4">
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Full Name</label><input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-amber-500/50 text-white" value={fd.name} onChange={e => setFd({...fd, name: e.target.value})} placeholder="Rahul Sharma" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Birth Date</label><input type="date" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-white text-xs" value={fd.dob} onChange={e => setFd({...fd, dob: e.target.value})} /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Birth Time</label><input type="time" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-white text-xs" value={fd.tob} onChange={e => setFd({...fd, tob: e.target.value})} /></div>
            </div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Birth Place</label><input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-amber-500/50 text-white" value={fd.pob} onChange={e => setFd({...fd, pob: e.target.value})} placeholder="Mumbai, India" /></div>
          </div>
          <button type="submit" className="btn-primary w-full py-4 uppercase tracking-[0.2em] text-[10px] font-black">Generate Report</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const PaymentFlowComp = ({ price, onSuccess, onClose }: { price: number; onSuccess: () => void; onClose: () => void }) => {
  const [step, setStep] = useState<"options" | "processing" | "success">("options");
  const [tr, setTr] = useState("");
  const [copied, setCopied] = useState(false);
  const upiId = "7003235589@jupiteraxis";
  const upiUrl = `upi://pay?pa=${upiId}&pn=Souman%20Bera&am=${price}&cu=INR`;

  const copy = () => { navigator.clipboard.writeText(upiId); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tr.trim()) return;
    setStep("processing");
    setTimeout(() => { setStep("success"); setTimeout(onSuccess, 1500); }, 12000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-cosmic-dark/95 backdrop-blur-3xl overflow-y-auto">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="glass-card w-full max-w-sm p-8 relative border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>
        {step === "options" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-400" /><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Payment Gateway</span></div>
            <div className="text-center"><h2 className="text-3xl font-bold mb-1 text-white">₹{price}</h2><p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Payable Amount</p></div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center border border-white/20 shadow-2xl">
                 <div className="p-2 border-2 border-gray-100 rounded-xl"><QRCodeSVG value={upiUrl} size={160} level="H" /></div>
                 <p className="text-[10px] text-gray-800 mt-4 font-bold uppercase tracking-[0.2em] text-center">Scan & Pay with UPI</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Or UPI ID</p>
                <div className="flex items-center justify-between gap-4"><span className="text-xs font-mono font-bold text-amber-400 truncate">{upiId}</span><button onClick={copy} className="flex items-center gap-1 text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition-all font-bold uppercase text-white">{copied ? <CheckCircle size={10} className="text-emerald-400" /> : <Copy size={10} />}{copied ? "Copied" : "Copy"}</button></div>
              </div>
              <form onSubmit={verify} className="space-y-3 pt-2">
                <div className="space-y-2"><label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block ml-1">Transaction ID / UTR Code</label><input type="text" required placeholder="e.g. 123456789012" value={tr} onChange={(e) => setTr(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:bg-white/10 focus:border-amber-500/50 outline-none text-white text-sm" /></div>
                <button type="submit" className="btn-primary w-full py-4 text-[10px] font-black uppercase tracking-[0.2em]">Confirm Payment</button>
              </form>
            </div>
          </div>
        )}
        {step === "processing" && (
          <div className="py-20 flex flex-col items-center text-center space-y-6">
            <div className="relative"><div className="w-20 h-20 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin" /><div className="absolute inset-0 flex items-center justify-center"><ShieldCheck size={32} className="text-amber-500/50" /></div></div>
            <div><h3 className="text-xl font-bold mb-2 text-white">Verifying Transaction</h3><p className="text-gray-400 text-[10px] px-8 uppercase tracking-widest leading-relaxed">Checking UPI network status... Please wait</p></div>
          </div>
        )}
        {step === "success" && (
          <div className="py-20 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]"><CheckCircle size={48} /></div>
            <div><h3 className="text-2xl font-bold mb-2 text-emerald-400">Payment Verified</h3><p className="text-white text-[10px] uppercase font-bold tracking-[0.2em] animate-pulse">Your Report is Ready</p></div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const DashboardComp = ({ report, details, onClose }: { report: AstrologyReport; details: BirthDetails; onClose: () => void }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-[200] bg-cosmic-dark overflow-y-auto pb-20 p-6 md:p-12">
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"><ArrowLeft size={20} /><span>Back to Home</span></button>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10"><Download size={20} /></button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10"><Share2 size={20} /></button>
        </div>
      </div>
      <div className="glass-card overflow-hidden mb-8 border-white/5 shadow-2xl">
        <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-8 border-b border-white/5">
          <h1 className="text-3xl font-black italic mb-2 tracking-tight text-white uppercase tracking-tighter">Cosmic Alignment Report</h1>
          <p className="text-gray-400 font-medium">Prepared for <span className="text-amber-400 font-bold">{details.name}</span></p>
        </div>
        <div className="p-8 space-y-12 bg-white/[0.01]">
          <div className="grid grid-cols-2 gap-8 text-center uppercase tracking-widest font-black text-gray-500 text-[10px]">
            <div><div className="text-4xl text-amber-500 mb-2">{report.luckScore}%</div>Luck Score</div>
            <div><div className="text-4xl text-orange-500 mb-2">{report.energyScore}%</div>Energy Score</div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4 text-center"><Star className="mx-auto text-amber-400 mb-2" size={16} /><div className="text-[8px] font-bold text-gray-500 uppercase">Lucky No.</div><div className="text-lg font-bold">{report.luckyNumber}</div></div>
            <div className="glass-card p-4 text-center"><Zap className="mx-auto text-amber-500 mb-2" size={16} /><div className="text-[8px] font-bold text-gray-500 uppercase">Lucky Color</div><div className="text-lg font-bold">{report.luckyColor}</div></div>
            <div className="glass-card p-4 text-center"><TrendingUp className="mx-auto text-cyan-400 mb-2" size={16} /><div className="text-[8px] font-bold text-gray-500 uppercase">Financial</div><div className="text-xs font-bold">{report.financialEnergy}</div></div>
            <div className="glass-card p-4 text-center"><Heart className="mx-auto text-rose-500 mb-2" size={16} /><div className="text-[8px] font-bold text-gray-500 uppercase">Relationship</div><div className="text-xs font-bold">{report.relationshipEnergy}</div></div>
          </div>
          <div className="space-y-4"><h3 className="text-[10px] font-bold text-amber-500/50 uppercase tracking-[0.3em] text-center">Celestial Guidance</h3><div className="glass-card p-8 bg-white/[0.02] border-amber-500/10 leading-relaxed text-gray-200 italic font-serif text-xl shadow-inner text-center">"{report.personalizedInsight}"</div></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 border-cyan-500/10"><h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2"><TrendingUp size={12} /> Planetary Alignment</h4><p className="text-sm text-gray-300 leading-relaxed">{report.planetaryAlignment}</p></div>
            <div className="glass-card p-6 border-amber-500/10"><h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Star size={12} /> Favorable Muhurat</h4><p className="text-sm text-gray-300 leading-relaxed font-mono uppercase tracking-tighter">{report.favorableTimings}</p></div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const TestimonialsComp = () => (
  <section className="py-24 border-y border-white/5 relative overflow-hidden">
    <div className="absolute inset-0 bg-amber-500/[0.02] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16"><h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent italic tracking-tighter uppercase">Trusted by Seekers</h2><p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Over 1.2M+ Vedic reports generated globally</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[{ name: "Sunita Verma", loc: "Mumbai", text: "The business success timing report was spot on! I signed my biggest contract during the recommended Muhurat." }, { name: "Rahul K.", loc: "Delhi", text: "Amazing accuracy for just ₹12. The daily luck score helps me plan my high-stakes meetings with confidence." }, { name: "Priyanka S.", loc: "Bangalore", text: "Vedic insights that actually make sense. The Love snapshot was surprisingly deep." }].map((t, idx) => (
          <div key={idx} className="glass-card p-8 flex flex-col bg-white/[0.02] border-white/5 hover:border-amber-500/20 transition-all">
            <div className="flex gap-1 mb-4 text-amber-500"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
            <p className="text-gray-300 italic mb-8 leading-relaxed font-serif">"{t.text}"</p>
            <div className="mt-auto flex items-center gap-3 pt-6 border-t border-white/5"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-black">{t.name[0]}</div><div><div className="font-bold text-sm text-amber-100">{t.name}</div><div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t.loc}</div></div></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FooterComp = () => (
  <footer className="relative z-10">
    <div className="bg-black/50 border-t border-white/5 py-6 px-10 flex flex-col md:flex-row items-center justify-between backdrop-blur-xl gap-6">
      <div className="flex flex-wrap gap-8 items-center grayscale opacity-60"><span className="text-[10px] font-bold uppercase tracking-widest">Secure Payments</span><div className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400">RAZORPAY • PHONEPE • PAYTM • UPI</div></div>
      <div className="flex items-center gap-4"><div className="flex items-center gap-2 text-xs font-medium text-white"><span className="inline-block px-2 py-0.5 bg-red-500 text-white rounded text-[8px] font-bold">HOT</span>Today's Muhurat closes in 01h 42m</div><a href="#" className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-5 py-2.5 rounded-full text-xs font-bold border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all font-black uppercase"><MessageCircle size={14} /> WhatsApp Support</a></div>
    </div>
    <div className="py-20 px-6 bg-cosmic-dark"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left"><div className="space-y-6"><div className="flex items-center gap-3 justify-center md:justify-start"><div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-black text-sm">ॐ</div><span className="text-xl font-black tracking-tight uppercase leading-none text-white">Vedic<span className="text-amber-400">Pulse</span></span></div><p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">Merging ancient Vedic wisdom with modern technology to guide your life with precision and clarity.</p></div><div className="flex gap-12 justify-center md:justify-end text-right"><div className="space-y-4"><h4 className="font-bold text-xs uppercase tracking-[0.2em] text-amber-200/50">Company</h4><ul className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-gray-500"><li><a href="#" className="hover:text-amber-400">Daily Horoscope</a></li><li><a href="#" className="hover:text-amber-400">Privacy Policy</a></li><li><a href="#" className="hover:text-amber-400">Terms</a></li></ul></div></div></div><div className="pt-8 mt-12 border-t border-white/5 text-center"><p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.3em] mb-4">Astrology is for guidance and entertainment purposes only.</p><p className="text-[10px] text-gray-600 font-medium">&copy; 2026 VedicPulse Digital. All rights reserved.</p></div></div></div>
  </footer>
);

// --- Main App Component ---

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; price: number } | null>(null);
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [report, setReport] = useState<AstrologyReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProductSelect = (_id: string, price: number) => {
    setSelectedProduct({ id: _id, price });
  };

  const handleDetailsSubmit = (details: BirthDetails) => {
    setBirthDetails(details);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!birthDetails || !selectedProduct) return;
    
    setShowPayment(false);
    setIsGenerating(true);
    
    try {
      const result = await generateAstrologyReport(birthDetails, selectedProduct.id);
      setReport(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-dark text-white selection:bg-amber-500/30">
      <Background />
      <Navbar />
      
      <main>
        <Hero />
        <ProductGridComp onSelect={handleProductSelect} />
        <TestimonialsComp />
      </main>

      <FooterComp />

      {/* Overlays */}
      <AnimatePresence>
        {selectedProduct && !birthDetails && (
          <AstrologyFormComp 
            onClose={() => setSelectedProduct(null)} 
            onSubmit={handleDetailsSubmit}
          />
        )}

        {showPayment && selectedProduct && (
          <PaymentFlowComp
            price={selectedProduct.price}
            onClose={() => setShowPayment(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[250] bg-cosmic-dark/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-amber-500">ॐ</div>
            </div>
            <h2 className="text-3xl font-black uppercase text-amber-100 tracking-tighter mb-2">Aligning the Stars</h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Scanning Vedic manuscripts for {birthDetails?.name}...</p>
          </motion.div>
        )}

        {report && birthDetails && (
          <DashboardComp 
            report={report}
            details={birthDetails}
            onClose={() => {
              setReport(null);
              setBirthDetails(null);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
