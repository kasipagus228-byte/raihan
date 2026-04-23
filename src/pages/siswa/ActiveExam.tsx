import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function ActiveExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock Exam Data
  const questions = [
    {
      id: '1',
      question: 'Apa fungsi utama dari router dalam sebuah jaringan komputer?',
      options: [
        { key: 'a', text: 'Menghubungkan jaringan yang berbeda' },
        { key: 'b', text: 'Menyimpan data file server' },
        { key: 'c', text: 'Mencetak dokumen melalui jaringan' },
        { key: 'd', text: 'Memonitor aktivitas pengguna' }
      ]
    },
    {
      id: '2',
      question: 'Manakah di bawah ini yang merupakan topologi fisik jaringan?',
      options: [
        { key: 'a', text: 'Ring' },
        { key: 'b', text: 'Star' },
        { key: 'c', text: 'Bus' },
        { key: 'd', text: 'Semua benar' }
      ]
    },
    {
      id: '3',
      question: 'Alat yang digunakan untuk memasang konektor RJ45 ke kabel UTP adalah...',
      options: [
        { key: 'a', text: 'Tang potong' },
        { key: 'b', text: 'Tang kombinasi' },
        { key: 'c', text: 'Crimping tool' },
        { key: 'd', text: 'Multimeter' }
      ]
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectAnswer = (key: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentIdx].id]: key
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Ujian berhasil dikumpulkan! Nilai Anda: 85/100');
      navigate('/app/student/exams');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Exam Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="font-bold text-xl text-gray-900 tracking-tight">Ujian Jaringan Dasar</h1>
          <p className="text-xs text-gray-400 mt-0.5">Siswa: Ahmad Fauzi • Kelas: TKJ 1</p>
        </div>
        
        <div className={cn(
          "flex items-center gap-3 px-6 py-2.5 rounded-xl font-mono text-xl font-bold shadow-sm transition-colors",
          timeLeft < 300 ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' : 'bg-gray-50 text-gray-900 border border-gray-100'
        )}>
          <Clock size={24} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Question Area */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm min-h-[400px] flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
                {currentIdx + 1}
              </span>
              <h2 className="text-lg font-bold text-gray-800 leading-relaxed">
                {questions[currentIdx].question}
              </h2>
            </div>

            <div className="space-y-3 flex-1">
              {questions[currentIdx].options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectAnswer(opt.key)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group",
                    answers[questions[currentIdx].id] === opt.key
                      ? "border-primary bg-red-50 text-primary shadow-sm"
                      : "border-gray-50 bg-gray-50 hover:border-gray-200 text-gray-600"
                  )}
                >
                  <span className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm uppercase shrink-0 transition-colors",
                    answers[questions[currentIdx].id] === opt.key
                      ? "bg-primary text-white"
                      : "bg-white text-gray-400 group-hover:text-gray-900"
                  )}>
                    {opt.key}
                  </span>
                  <span className="font-medium text-sm">{opt.text}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
              <button 
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <ChevronLeft size={20} /> Sebelumnya
              </button>
              
              <div className="text-sm font-bold text-gray-400">
                Soal {currentIdx + 1} dari {questions.length}
              </div>

              {currentIdx === questions.length - 1 ? (
                <button 
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all"
                >
                  <CheckCircle2 size={20} /> Selesai Ujian
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all"
                >
                  Selanjutnya <ChevronRight size={20} />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Navigation Grid */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              Navigasi Soal
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all",
                    currentIdx === idx 
                      ? "bg-primary text-white ring-4 ring-red-100" 
                      : answers[q.id] 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                <div className="w-3 h-3 bg-primary rounded" /> Posisi Sekarang
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                <div className="w-3 h-3 bg-green-500 rounded" /> Sudah Dijawab
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                <div className="w-3 h-3 bg-gray-100 rounded" /> Belum Dijawab
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="flex items-center gap-2 font-bold text-blue-900 text-sm mb-3">
              <AlertCircle size={18} /> Informasi
            </h4>
            <ul className="text-xs text-blue-700 space-y-2 leading-relaxed">
              <li>• Periksa kembali semua jawaban sebelum klik selesai.</li>
              <li>• Klik nomor soal di samping untuk navigasi cepat.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm p-10 shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Selesai Ujian?</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Anda telah menjawab {Object.keys(answers).length} dari {questions.length} soal. Pastikan semua jawaban sudah benar.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Ya, Kirim Sekarang'}
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 text-gray-400 font-bold hover:text-gray-900"
                >
                  Cek Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
