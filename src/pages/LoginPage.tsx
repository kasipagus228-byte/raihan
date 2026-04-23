import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { School, User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('siswa');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      signIn(email, role);
      setLoading(false);
      navigate('/app');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-editorial-surface flex items-center justify-center p-6 selection:bg-red-100">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-editorial-border"
      >
        <div className="p-10 editorial-gradient text-white text-center relative">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[20px] flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-xl">
            <div className="text-2xl font-black italic">S</div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter leading-none">Portal CBT</h1>
          <p className="text-white/70 text-[13px] font-bold mt-2 uppercase tracking-[2px]">SMK Prima Unggul</p>
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-primary">Alamat Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-semibold"
                  placeholder="nama@sekolah.sch.id"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-primary">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  required
                  defaultValue="123456"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-semibold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Pilih Akses Portal</label>
              <div className="grid grid-cols-3 gap-3">
                {['siswa', 'guru', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-3 rounded-xl text-[11px] font-black border-2 transition-all uppercase tracking-wider ${
                      role === r 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-5 bg-primary text-white rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 hover:bg-primary-dark transition-all disabled:opacity-70 shadow-xl shadow-primary/20 group active:scale-95"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>Masuk ke Portal <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
          
          <div className="text-center">
            <button type="button" className="text-[11px] font-bold text-slate-300 hover:text-primary uppercase tracking-widest transition-colors">
              Lupa akses akun? Hubungi Admin IT
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
