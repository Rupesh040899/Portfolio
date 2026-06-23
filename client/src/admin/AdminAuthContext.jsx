import { createContext, useContext, useEffect, useState } from 'react';
import { adminApi, tokenStore } from './adminApi.js';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, if we have a token, validate it.
  useEffect(() => {
    let active = true;
    async function check() {
      if (!tokenStore.get()) {
        setLoading(false);
        return;
      }
      try {
        const res = await adminApi.me();
        if (active) setAdmin(res.admin);
      } catch {
        tokenStore.clear();
      } finally {
        if (active) setLoading(false);
      }
    }
    check();
    return () => {
      active = false;
    };
  }, []);

  const login = async (email, password) => {
    const res = await adminApi.login(email, password);
    tokenStore.set(res.token);
    setAdmin(res.admin);
    return res;
  };

  const logout = async () => {
    try {
      await adminApi.logout();
    } catch {
      /* ignore */
    }
    tokenStore.clear();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, isAuthed: !!admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  return ctx;
}
