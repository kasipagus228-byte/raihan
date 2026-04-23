import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { School, ArrowRight, CheckCircle, Smartphone, Shield, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const majors = [
    { code: 'TKJ', name: 'Teknik Komputer & Jaringan' },
    { code: 'DKV', name: 'Desain Komunikasi Visual' },
    { code: 'AK', name: 'Akuntansi' },
    { code: 'BC', name: 'Broadcasting' },
    { code: 'MPLB', name: 'Manajemen Perkantoran & Layanan Bisnis' },
    { code: 'BD', name: 'Bisnis Digital' },
  ];

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text selection:bg-red-100 selection:text-primary">
      {/* Navigation */}
      <nav className="px-8 py-6 flex items-center justify-between border-b border-editorial-border max-w-7xl mx-auto bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-black italic shadow-lg shadow-primary/20">S</div>
          <span className="text-xl font-extrabold tracking-tighter">SMK Prima Unggul</span>
        </div>
        <Link 
          to="/login" 
          className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark transition-all flex items-center gap-2 shadow-xl shadow-primary/10"
        >
          Portal CBT <ArrowRight size={16} />
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-24 pb-32 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-light text-primary rounded-full text-[11px] font-extrabold uppercase tracking-[1px] mb-8">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Standard Evaluasi Digital SMK
          </div>
          <h1 className="text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-[-0.04em] mb-8">
            Evaluasi <br />
            Akademik <br />
            <span className="text-primary italic">Terpadu.</span>
          </h1>
          <p className="text-[17px] text-editorial-muted mb-10 max-w-lg leading-relaxed font-medium">
            Sistem Computer Based Test (CBT) yang dirancang khusus untuk meningkatkan objektivitas dan efisiensi penilaian di SMK Prima Unggul.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link to="/login" className="px-10 py-5 bg-primary text-white rounded-xl font-extrabold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-primary/20">
              Masuk Sekarang
            </Link>
            <div className="flex items-center gap-4 text-editorial-text font-bold text-sm bg-white border border-editorial-border px-6 py-5 rounded-xl">
              <CheckCircle size={20} className="text-green-500" /> Terakreditasi A
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:block hidden"
        >
          <div className="bg-editorial-surface rounded-[40px] border border-editorial-border p-10 shadow-inner rotate-3 hover:rotate-0 transition-transform duration-700">
            <div className="grid grid-cols-2 gap-4">
              {majors.map((mj, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between aspect-square group hover:border-primary transition-colors cursor-default">
                  <span className="text-3xl font-black text-primary group-hover:scale-110 transition-transform">{mj.code}</span>
                  <p className="text-[10px] font-extrabold text-editorial-muted uppercase tracking-wider">{mj.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats/Social Proof */}
      <section className="bg-white border-y border-editorial-border py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Siswa Aktif', val: '1,200+' },
            { label: 'Ujian Selesai', val: '15k+' },
            { label: 'Bank Soal', val: '4k+' },
            { label: 'Kecepatan', val: '99.9%' }
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black text-editorial-text mb-1">{s.val}</div>
              <div className="text-[12px] font-bold text-editorial-muted uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-black text-xs italic">S</div>
              <span className="font-extrabold tracking-tight">SMK Prima Unggul</span>
            </div>
            <p className="text-sm text-editorial-muted font-medium">© 2026 Inovasi Pendidikan Indonesia. Dikembangkan secara mandiri.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-editorial-muted">
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
