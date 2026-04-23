import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  Play, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'motion/react';
import type { Exam } from '../../types';

export default function ExamList() {
  const [exams] = useState<Exam[]>([
    {
      id: '1',
      title: 'Ujian Tengah Semester - Jaringan Dasar',
      duration: 60,
      created_at: new Date().toISOString(),
      created_by: 'guru-1'
    },
    {
      id: '2',
      title: 'Uji Kompetensi - Desain Vektor',
      duration: 120,
      created_at: new Date().toISOString(),
      created_by: 'guru-1'
    }
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daftar Ujian Tersedia</h1>
        <p className="text-gray-500">Pilih ujian yang ingin dikerjakan hari ini.</p>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-start gap-4">
        <AlertCircle className="text-orange-600 shrink-0" size={24} />
        <div>
          <h3 className="font-bold text-orange-900 text-sm">Penting: Persiapan Ujian</h3>
          <p className="text-xs text-orange-700 mt-1 leading-relaxed">
            Pastikan koneksi internet stabil sebelum memulai ujian. Jangan menutup tab browser saat ujian berlangsung. Timer akan tetap berjalan meskipun tab ditutup.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {exams.map((exam, idx) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-50 text-primary rounded-xl flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 line-clamp-1">{exam.title}</h3>
                <p className="text-xs text-gray-500">Kurikulum 2026 • 40 Soal</p>
              </div>
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-gray-50 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={18} className="text-gray-400" />
                <span className="font-medium">{exam.duration} Menit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-bold">
                <CheckCircle2 size={16} />
                <span>Terverifikasi</span>
              </div>
            </div>

            <Link
              to={`/app/student/exams/${exam.id}`}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all group"
            >
              <Play size={18} className="fill-current" />
              Mulai Ujian
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
