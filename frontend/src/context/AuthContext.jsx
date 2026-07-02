import { createContext, useState, useContext, useCallback, useEffect } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'printhub.users';
const SESSION_KEY = 'printhub.session';

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  /* Persist session */
  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  /* ── Mock sign up ── */
  const signup = useCallback(({ identifier, username, password, userType }) => {
    const users = readUsers();
    const exists = users.find(
      (u) => u.identifier.toLowerCase() === identifier.toLowerCase()
    );
    if (exists) {
      return { ok: false, error: 'An account with this mobile number already exists.' };
    }
    const newUser = {
      id: `u_${Date.now()}`,
      identifier,
      username: username || '',
      mobile: /^\d{10}$/.test(identifier) ? identifier : '',
      password,
      userType, // 'regular' | 'student' | 'institute'
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    return { ok: true, user: newUser };
  }, []);

  /* ── Mock sign in ── */
  const login = useCallback(({ identifier, password }) => {
    const users = readUsers();
    const found = users.find(
      (u) =>
        (u.identifier.toLowerCase() === identifier.toLowerCase() || (u.username && u.username.toLowerCase() === identifier.toLowerCase())) &&
        u.password === password
    );
    if (!found) {
      return { ok: false, error: 'Invalid mobile / username or password.' };
    }
    const safe = { ...found };
    delete safe.password;
    setUser(safe);
    return { ok: true, user: safe };
  }, []);

  /* ── Mock Google login ── */
  const loginWithGoogle = useCallback(() => {
    const safe = {
      id: `g_${Date.now()}`,
      identifier: 'google.user',
      name: 'Google User',
      userType: 'regular',
      provider: 'google',
    };
    setUser(safe);
    return { ok: true, user: safe };
  }, []);

  /* ── Update mobile after signup ── */
  const setMobile = useCallback((mobile) => {
    if (!user) return { ok: false, error: 'No active session.' };
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx].mobile = mobile;
      if (/^\d{10}$/.test(mobile) && !users[idx].identifier.match(/^\d{10}$/)) {
        // do not overwrite identifier, just store mobile
      }
      writeUsers(users);
    }
    const updated = { ...user, mobile };
    setUser(updated);
    return { ok: true, user: updated };
  }, [user]);

  /* ── Reset password (mock — matches identifier only) ── */
  const resetPassword = useCallback(({ identifier, newPassword }) => {
    const users = readUsers();
    const idx = users.findIndex(
      (u) => u.identifier.toLowerCase() === identifier.toLowerCase() || (u.username && u.username.toLowerCase() === identifier.toLowerCase())
    );
    if (idx === -1) {
      return { ok: false, error: 'No account matches that mobile / username.' };
    }
    users[idx].password = newPassword;
    writeUsers(users);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loginWithGoogle, setMobile, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
