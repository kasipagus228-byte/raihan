import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Question } from '../../types';

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'Apa kepanjangan dari OSI dalam jaringan komputer?',
      option_a: 'Open Service Interface',
      option_b: 'Open System Interconnection',
      option_c: 'Operational System Integrity',
      option_d: 'Optical Signal Interaction',
      correct_answer: 'b',
      created_at: new Date().toISOString(),
      created_by: 'guru-1'
    },
    {
      id: '2',
      question: 'Protokol yang digunakan untuk pengiriman email adalah...',
      option_a: 'HTTP',
      option_b: 'FTP',
      option_c: 'SMTP',
      option_d: 'SNMP',
      correct_answer: 'c',
      created_at: new Date().toISOString(),
      created_by: 'guru-1'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Soal</h1>
          <p className="text-gray-500">Kelola kumpulan soal pilihan ganda untuk ujian.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
        >
          <Plus size={20} /> Tambah Soal
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari soal..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <Filter size={18} /> Filter
          </button>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Pertanyaan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Jawaban Benar</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Dibuat Pada</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{q.question}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">A: {q.option_a}</span>
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">B: {q.option_b}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm uppercase">
                      {q.correct_answer}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(q.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">Menampilkan 1-2 dari 2 soal</p>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors min-w-[40px] flex justify-center border rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 text-primary font-bold bg-primary/5 min-w-[40px] flex justify-center border border-primary/20 rounded-lg">1</button>
            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors min-w-[40px] flex justify-center border rounded-lg">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Tambah Pertanyaan Baru</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pertanyaan</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                    placeholder="Masukkan teks soal..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['A', 'B', 'C', 'D'].map(opt => (
                    <div key={opt}>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Opsi {opt}</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                        placeholder={`Jawaban ${opt}`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jawaban Benar</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none ring-primary/20 focus:ring-2">
                    <option value="a">Opsi A</option>
                    <option value="b">Opsi B</option>
                    <option value="c">Opsi C</option>
                    <option value="d">Opsi D</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 px-6 rounded-xl font-bold bg-gray-100 text-gray-600">Batal</button>
                  <button className="flex-1 py-3 px-6 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20">Simpan Soal</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
