'use client';

import { useState, useEffect } from 'react';
import LoginModal from '@/components/admin/LoginModal';
import Dashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // 检查本地存储是否有认证信息
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      setShowLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    localStorage.setItem('admin-auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    localStorage.removeItem('admin-auth');
  };

  return (
    <>
      {showLogin && (
        <LoginModal
          onSuccess={handleLogin}
          onClose={() => {}}
        />
      )}

      {isAuthenticated && (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}
