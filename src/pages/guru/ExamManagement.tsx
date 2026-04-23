import { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  FileText, 
  Users,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';
import type { Exam } from '../../types';

export default function ExamManagement() {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'UAS Ganjil - Teknologi Jaringan',
      duration: 90,
      created_at: '2026-04-20T08:00:00Z',
      created_by: 'guru-1'
    },
    {
      id: '2',
      title: 'Kuis Mingguan - Dasar Grafis',
      duration: 30,
      created_at: '2026-04-22T10:00:00Z',
      created_by: 'guru-1'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Ujian</h1>
          <p className="text-gray-500">Buat dan atur jadwal ujian untuk siswa.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
          <Plus size={20} /> Buat Ujian
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {exams.map((exam, idx) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button className="text-gray-400 hover:text-gray-900 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-red-50 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <FileText size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{exam.title}</h3>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Clock size={14} /> {exam.duration} Menit
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Calendar size={14} /> {new Date(exam.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Users size={14} /> 32 Peserta
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">+29</div>
                  </div>
                  
                  <button className="text-sm font-bold text-gray-400 hover:text-primary flex items-center gap-1 transition-colors group">
                    Detail Ujian <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Placeholder for Empty State / New Exam */}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-primary/50 hover:text-primary transition-all group">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-red-50 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-bold tracking-tight">Tambah Ujian Baru</span>
        </button>
      </div>
    </div>
  );
}
