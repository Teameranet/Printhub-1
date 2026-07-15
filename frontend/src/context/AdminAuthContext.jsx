import { createContext, useState, useContext, useCallback, useEffect } from 'react';

/* ─── Constants ──────────────────────────────────────────────── */
const ADMIN_SESSION_KEY = 'printhub.admin.session';

/* Hard-coded admin credentials (front-end only — no real server auth) */
const ADMIN_EMAIL    = 'printhub@gmail.com';
const ADMIN_PASSWORD = '123456';
const ADMIN_USER     = {
  id:    'admin_1',
  name:  'PrintHub Admin',
  email: ADMIN_EMAIL,
  role:  'admin',
  avatar: 'PA',
};

/* ─── Context ────────────────────────────────────────────────── */
const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  /* Persist session to sessionStorage (cleared on tab close) */
  useEffect(() => {
    if (admin) sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin));
    else sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }, [admin]);

  const adminLogin = useCallback(({ email, password }) => {
    if (
      email.trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setAdmin(ADMIN_USER);
      return { ok: true, admin: ADMIN_USER };
    }
    return { ok: false, error: 'Invalid admin email or password.' };
  }, []);

  const adminLogout = useCallback(() => {
    setAdmin(null);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
};
