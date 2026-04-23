import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Users, 
  LogOut, 
  School,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const menuItems = [
    { 
      label: 'Dashboard', 
      path: '/app', 
      icon: LayoutDashboard,
      roles: ['admin', 'guru', 'siswa']
    },
    { 
      label: 'Manajemen User', 
      path: '/app/users', 
      icon: Users,
      roles: ['admin']
    },
    { 
      label: 'Bank Soal', 
      path: '/app/questions', 
      icon: BookOpen,
      roles: ['admin', 'guru']
    },
    { 
      label: 'Manajemen Ujian', 
      path: '/app/exams', 
      icon: FileText,
      roles: ['admin', 'guru']
    },
    { 
      label: 'Daftar Ujian', 
      path: '/app/student/exams', 
      icon: FileText,
      roles: ['siswa']
    },
  ];

  const filteredMenu = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-editorial-bg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r border-editorial-border flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded shadow-sm flex items-center justify-center text-white font-extrabold italic">
            S
          </div>
          <div className="leading-none">
            <h1 className="font-extrabold text-lg text-primary tracking-tighter">CBT</h1>
            <p className="text-[9px] text-editorial-muted font-bold tracking-[2px] uppercase">Prima Unggul</p>
          </div>
        </div>

        <nav className="flex-1 px-3 mt-6 space-y-1">
          {filteredMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-semibold transition-all mb-1",
                location.pathname === item.path
                  ? "bg-primary-light text-primary"
                  : "text-slate-500 hover:bg-slate-50 hover:text-editorial-text"
              )}
            >
              <item.icon size={18} className={cn(location.pathname === item.path ? "opacity-100" : "opacity-60")} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-4 bg-editorial-surface rounded-xl border border-editorial-border">
            <p className="text-[12px] font-bold text-editorial-text mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Pusat Bantuan
            </p>
            <p className="text-[11px] text-editorial-muted leading-relaxed">
              Hubungi admin jika lupa password atau kendala teknis.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-editorial-surface">
        {/* Header */}
        <header className="h-[72px] bg-white border-b border-editorial-border flex items-center justify-between px-8 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-[16px] font-bold text-editorial-text leading-tight uppercase tracking-tight">SMK Prima Unggul</h2>
            <p className="text-[11px] text-editorial-muted font-medium">
              {user?.role === 'siswa' ? 'Pusat Ujian Elektronik • Kelas XII' : 'Panel Manajemen Akademik • Staff'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pr-6 border-r border-editorial-border text-right">
              <div>
                <p className="text-[14px] font-bold text-editorial-text leading-none mb-1">{user?.name}</p>
                <p className="text-[11px] text-editorial-muted font-bold tracking-wider">
                  {user?.role === 'siswa' ? 'NIS: 21220459' : 'STAFF ID: 19881022'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-[13px] font-bold text-primary px-4 py-2 border border-red-100 rounded-lg hover:bg-primary-light transition-all"
            >
              Keluar
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-8 px-8 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
