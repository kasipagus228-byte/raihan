import { useAuth } from '../App';
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { user } = useAuth();

  const exams = [
    { type: 'Produktif TKJ', title: 'Administrasi Infrastruktur Jaringan (AIJ)', duration: 90, questions: 40 },
    { type: 'Normatif', title: 'Bahasa Indonesia - Tryout Nasional Ke-3', duration: 120, questions: 50 },
  ];

  const stats = [
    { label: 'Rata-rata Nilai', value: '88.4' },
    { label: 'Ujian Selesai', value: '14' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
      {/* Left Column: Welcome and Active Exams */}
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="editorial-gradient p-8 rounded-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-[28px] font-extrabold tracking-tight leading-none">Selamat Datang, {user?.name.split(' ')[0]}!</h1>
            <p className="text-[15px] opacity-90 mt-2 max-w-md">
              Kamu memiliki {exams.length} ujian yang dijadwalkan hari ini. Pastikan koneksi internet stabil sebelum memulai.
            </p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        </motion.div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <h2 className="text-[18px] font-bold text-editorial-text">Ujian Tersedia</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {exams.map((exam, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="editorial-card p-6 flex flex-col justify-between hover:border-primary/30 group"
              >
                <div>
                  <span className="text-[10px] font-extrabold tracking-[1px] uppercase text-primary mb-2 block">{exam.type}</span>
                  <h3 className="text-[16px] font-bold text-editorial-text group-hover:text-primary transition-colors leading-snug mb-4">
                    {exam.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[12px] text-editorial-muted font-medium mb-6">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="opacity-70" /> {exam.duration} Menit</span>
                    <span className="flex items-center gap-1.5"><FileText size={14} className="opacity-70" /> {exam.questions} Soal</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary text-white rounded-lg font-bold text-[13px] hover:bg-primary-dark transition-all shadow-md shadow-primary/10">
                  Mulai Ujian
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Statistics */}
      <aside className="space-y-6">
        <div className="bg-white border border-editorial-border rounded-2xl p-6 h-full flex flex-col">
          <h3 className="text-[12px] font-extrabold tracking-[1px] uppercase text-editorial-muted mb-6">Ringkasan Nilai</h3>
          
          <div className="space-y-8 flex-1">
            {stats.map((stat, idx) => (
              <div key={idx} className="pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-[32px] font-extrabold text-editorial-text tabular-nums">{stat.value}</p>
              </div>
            ))}

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Jurusan Terdaftar</p>
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-bold">
                TKJ - Teknik Komputer Jaringan
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50">
            <div className="text-[10px] text-editorial-muted text-center font-medium opacity-60">
              V 2.0.4 • SMK PRIMA UNGGUL
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
