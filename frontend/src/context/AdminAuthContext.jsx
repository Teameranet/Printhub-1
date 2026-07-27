import { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';

/* ─── Storage keys ───────────────────────────────────────────── */
const ADMIN_SESSION_KEY = 'printhub.admin.session';
const ADMIN_AUDIT_KEY = 'printhub.admin.audit';

/* ─── Hard-coded credentials (front-end only — no real server auth) ─ */
const CREDENTIALS = [
  {
    email: 'printhub@gmail.com',
    password: 'p',
    user: {
      id: 'admin_1',
      name: 'PrintHub',
      email: 'printhub@gmail.com',
      role: 'super_admin',   // ← promoted to super_admin
      avatar: 'PA',
    },
  },
  /* Additional hard-coded admin for cross-role testing */
  {
    email: 'admin@printhub.in',
    password: 'admin123',
    user: {
      id: 'admin_2',
      name: 'Riya Sharma',
      email: 'admin@printhub.in',
      role: 'admin',
      avatar: 'RS',
    },
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */
const nowIso = () => new Date().toISOString();
const genAuditId = () => `audit_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

/* Persist audit log to sessionStorage (capped at 200 entries) */
const loadAuditLog = () => {
  try {
    const raw = sessionStorage.getItem(ADMIN_AUDIT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveAuditLog = (entries) => {
  try {
    sessionStorage.setItem(ADMIN_AUDIT_KEY, JSON.stringify(entries.slice(0, 200)));
  } catch { /* quota exceeded — silently skip */ }
};

/* ─── Context ────────────────────────────────────────────────── */
const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {

  /* ── Admin session ──────────────────────────────────────── */
  const [admin, setAdmin] = useState(() => {
    try {
      const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const cred = CREDENTIALS.find(c => c.email?.toLowerCase() === parsed?.email?.toLowerCase());
      if (cred) {
        return { ...parsed, ...cred.user };
      }
      return parsed;
    } catch { return null; }
  });

  /* ── Audit log ──────────────────────────────────────────── */
  const [auditLog, setAuditLog] = useState(loadAuditLog);
  const auditRef = useRef(auditLog);
  auditRef.current = auditLog;

  /* Persist session */
  useEffect(() => {
    if (admin) sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin));
    else sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }, [admin]);

  /* Persist audit log whenever it changes */
  useEffect(() => {
    saveAuditLog(auditLog);
  }, [auditLog]);

  /* ── addAuditEntry ──────────────────────────────────────── */
  /**
   * Appends a new entry to the audit trail.
   * @param {'login'|'logout'|'create'|'update'|'delete'|'suspend'|'restore'} action
   * @param {string} description  Human-readable description (may contain <strong> tags)
   * @param {string} [actorId]    Override actor ID (defaults to current admin)
   */
  const addAuditEntry = useCallback((action, description, actorId) => {
    const entry = {
      id: genAuditId(),
      ts: nowIso(),
      action,
      desc: description,
      actor: actorId ?? admin?.id ?? 'system',
      actorName: admin?.name ?? 'System',
      actorRole: admin?.role ?? 'unknown',
    };
    setAuditLog(prev => [entry, ...prev]);
    return entry;
  }, [admin]);

  /* ── adminLogin ─────────────────────────────────────────── */
  const adminLogin = useCallback(({ email, password }) => {
    const match = CREDENTIALS.find(
      c => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === password
    );
    if (match) {
      const sessionAdmin = {
        ...match.user,
        loginAt: nowIso(),
      };
      setAdmin(sessionAdmin);

      /* Log the login event using the session admin's own ID */
      const loginEntry = {
        id: genAuditId(),
        ts: nowIso(),
        action: 'login',
        desc: `Admin <strong>${match.user.name}</strong> signed in`,
        actor: match.user.id,
        actorName: match.user.name,
        actorRole: match.user.role,
      };
      setAuditLog(prev => [loginEntry, ...prev]);

      return { ok: true, admin: sessionAdmin };
    }
    return { ok: false, error: 'Invalid admin email or password.' };
  }, []);

  /* ── adminLogout ────────────────────────────────────────── */
  const adminLogout = useCallback(() => {
    if (admin) {
      const logoutEntry = {
        id: genAuditId(),
        ts: nowIso(),
        action: 'logout',
        desc: `Admin <strong>${admin.name}</strong> signed out`,
        actor: admin.id,
        actorName: admin.name,
        actorRole: admin.role,
      };
      /* Append before clearing admin so actor info is still available */
      setAuditLog(prev => [logoutEntry, ...prev]);
    }
    setAdmin(null);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }, [admin]);

  /* ── isSuperAdmin helper ─────────────────────────────────── */
  const isSuperAdmin = admin?.role === 'super_admin';

  /* ── hasPermission ───────────────────────────────────────── */
  /**
   * Returns true if the current admin has the required role level.
   * 'super_admin' > 'admin'
   */
  const hasPermission = useCallback((requiredRole) => {
    if (!admin) return false;
    if (requiredRole === 'admin') return true;            // any admin qualifies
    if (requiredRole === 'super_admin') return isSuperAdmin;
    return false;
  }, [admin, isSuperAdmin]);

  /* ── clearAuditLog ───────────────────────────────────────── */
  const clearAuditLog = useCallback(() => {
    if (!isSuperAdmin) return;
    setAuditLog([]);
    addAuditEntry('update', 'Audit log cleared by super admin');
  }, [isSuperAdmin, addAuditEntry]);

  return (
    <AdminAuthContext.Provider value={{
      admin,
      adminLogin,
      adminLogout,
      isSuperAdmin,
      hasPermission,
      auditLog,
      addAuditEntry,
      clearAuditLog,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
};
