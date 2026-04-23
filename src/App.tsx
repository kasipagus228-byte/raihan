/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './lib/supabase';
import type { User, UserRole } from './types';

// Mock Auth Context (since we don't have real Supabase keys in this environment, 
// we provide a way to simulate roles for the demo)
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, role: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

// Components
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import QuestionBank from './pages/guru/QuestionBank';
import ExamManagement from './pages/guru/ExamManagement';
import UserManagement from './pages/admin/UserManagement';
import ExamList from './pages/siswa/ExamList';
import ActiveExam from './pages/siswa/ActiveExam';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for "remembered" user in the demo
    const savedUser = localStorage.getItem('cbt_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = (email: string, role: string) => {
    const newUser: User = { 
      id: crypto.randomUUID(), 
      email, 
      name: email.split('@')[0], 
      role: role as any 
    };
    setUser(newUser);
    localStorage.setItem('cbt_user', JSON.stringify(newUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('cbt_user');
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/app" /> : <LoginPage />} />
          
          <Route path="/app" element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard />} />
            
            {/* Admin Routes */}
            {user?.role === 'admin' && (
              <>
                <Route path="users" element={<UserManagement />} />
              </>
            )}

            {/* Guru Routes */}
            {(user?.role === 'guru' || user?.role === 'admin') && (
              <>
                <Route path="questions" element={<QuestionBank />} />
                <Route path="exams" element={<ExamManagement />} />
              </>
            )}

            {/* Siswa Routes */}
            {user?.role === 'siswa' && (
              <>
                <Route path="student/exams" element={<ExamList />} />
                <Route path="student/exams/:id" element={<ActiveExam />} />
              </>
            )}
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
