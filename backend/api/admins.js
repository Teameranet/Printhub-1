/**
 * PrintHub — Admin User Management API
 * Route prefix: /api/admins
 *
 * All routes require a valid Bearer token.
 * Mutating routes (POST/PUT/PATCH/DELETE) require role === 'super_admin'.
 *
 * Audit trail: every state-changing action is appended to an in-memory log
 * (replace with a real DB collection in production).
 */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');

/* ─── In-memory stores (replace with DB in production) ──────── */
let adminUsers = [
  {
    id: 'admin_1', name: 'PrintHub', email: 'printhub@gmail.com',
    passwordHash: hashPassword('p'),
    role: 'super_admin', status: 'active',
    createdAt: '2024-01-10T09:00:00Z', lastLogin: null, sessionToken: null,
  },
  {
    id: 'admin_2', name: 'Riya Sharma', email: 'riya@printhub.in',
    passwordHash: hashPassword('admin123'),
    role: 'admin', status: 'active',
    createdAt: '2024-03-15T11:20:00Z', lastLogin: null, sessionToken: null,
  },
  {
    id: 'admin_3', name: 'Arjun Nair', email: 'arjun@printhub.in',
    passwordHash: hashPassword('admin123'),
    role: 'admin', status: 'inactive',
    createdAt: '2024-05-02T08:00:00Z', lastLogin: null, sessionToken: null,
  },
  {
    id: 'admin_4', name: 'Priya Menon', email: 'priya@printhub.in',
    passwordHash: hashPassword('admin123'),
    role: 'admin', status: 'suspended',
    createdAt: '2024-07-20T14:45:00Z', lastLogin: null, sessionToken: null,
  },
];

let auditTrail = [];

/* ─── Helpers ────────────────────────────────────────────────── */

/** Simple SHA-256 hash (use bcrypt in production) */
function hashPassword(plain) {
  return crypto.createHash('sha256').update(plain).digest('hex');
}

/** Sanitize a string — strip HTML tags and dangerous characters */
function sanitize(value = '') {
  return String(value)
    .trim()
    .replace(/<[^>]*>/g, '')          // strip HTML tags
    .replace(/['"`;\\]/g, '')         // strip injection chars
    .slice(0, 200);                   // hard length cap
}

/** Validate email format */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/** Validate password strength (min 8 chars, 1 digit) */
function isStrongPassword(pw) {
  return typeof pw === 'string' && pw.length >= 8 && /\d/.test(pw);
}

/** Generate a simple random ID */
function genId() {
  return `admin_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
}

/** ISO timestamp */
const nowIso = () => new Date().toISOString();

/** Append an audit log entry */
function logAudit(action, description, actorId, actorRole) {
  auditTrail.unshift({
    id: `audit_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`,
    ts: nowIso(),
    action,
    desc: description,
    actor: actorId,
    actorRole,
  });
  /* Cap the in-memory log at 500 entries */
  if (auditTrail.length > 500) auditTrail = auditTrail.slice(0, 500);
}

/** Strip sensitive fields before sending to client */
function sanitizeOutput(admin) {
  const { passwordHash, sessionToken, ...safe } = admin;
  return safe;
}

/* ─── Auth middleware ────────────────────────────────────────── */

/**
 * requireAuth — verifies the Bearer token and attaches req.adminUser.
 * In production, validate a real JWT. Here we match against sessionToken
 * stored on the admin record (set during login).
 */
function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized — no token provided.' });
  }

  const admin = adminUsers.find(a => a.sessionToken === token && a.status === 'active');
  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized — invalid or expired token.' });
  }

  req.adminUser = admin;
  next();
}

/**
 * requireSuperAdmin — must come after requireAuth.
 * Blocks regular admins from mutating operations.
 */
function requireSuperAdmin(req, res, next) {
  if (req.adminUser?.role !== 'super_admin') {
    return res.status(403).json({
      error: 'Forbidden — Super Admin privileges required.',
    });
  }
  next();
}

/* ─── Routes ─────────────────────────────────────────────────── */

/**
 * POST /api/admins/login
 * Authenticate an admin and return a session token.
 * Public — no auth required.
 */
router.post('/login', (req, res) => {
  const email = sanitize(req.body?.email ?? '').toLowerCase();
  const password = String(req.body?.password ?? '');

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const admin = adminUsers.find(a => a.email === email);

  if (!admin || admin.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  if (admin.status !== 'active') {
    return res.status(403).json({
      error: `Account is ${admin.status}. Contact your Super Admin.`,
    });
  }

  /* Issue a session token and record login time */
  const token = crypto.randomBytes(32).toString('hex');
  admin.sessionToken = token;
  admin.lastLogin = nowIso();

  logAudit('login', `Admin <strong>${admin.name}</strong> signed in`, admin.id, admin.role);

  return res.status(200).json({
    token,
    admin: sanitizeOutput(admin),
  });
});

/**
 * POST /api/admins/logout
 * Revoke the current admin's session token.
 */
router.post('/logout', requireAuth, (req, res) => {
  const admin = req.adminUser;
  admin.sessionToken = null;
  logAudit('logout', `Admin <strong>${admin.name}</strong> signed out`, admin.id, admin.role);
  return res.status(200).json({ message: 'Logged out successfully.' });
});

/**
 * GET /api/admins
 * List all admin accounts with optional search, role, status, sort, and pagination.
 * Requires auth (any admin role).
 */
router.get('/', requireAuth, (req, res) => {
  const {
    q = '',
    role = 'all',
    status = 'all',
    sortBy = 'name',
    sortDir = 'asc',
    page = '1',
    limit = '10',
  } = req.query;

  const ALLOWED_SORT = ['name', 'email', 'role', 'status', 'createdAt', 'lastLogin'];
  const safeSort = ALLOWED_SORT.includes(sortBy) ? sortBy : 'name';
  const safeDir = sortDir === 'desc' ? 'desc' : 'asc';
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

  const query = sanitize(q).toLowerCase();

  let results = adminUsers.filter(a => {
    const matchQ = !query
      || a.name.toLowerCase().includes(query)
      || a.email.toLowerCase().includes(query);
    const matchR = role === 'all' || a.role === role;
    const matchS = status === 'all' || a.status === status;
    return matchQ && matchR && matchS;
  });

  results.sort((a, b) => {
    const av = (a[safeSort] ?? '').toString().toLowerCase();
    const bv = (b[safeSort] ?? '').toString().toLowerCase();
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return safeDir === 'asc' ? cmp : -cmp;
  });

  const total = results.length;
  const paged = results.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  return res.status(200).json({
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    admins: paged.map(sanitizeOutput),
  });
});

/**
 * GET /api/admins/:id
 * Get a single admin account by ID.
 * Requires auth (any admin role).
 */
router.get('/:id', requireAuth, (req, res) => {
  const admin = adminUsers.find(a => a.id === req.params.id);
  if (!admin) return res.status(404).json({ error: 'Admin not found.' });
  return res.status(200).json(sanitizeOutput(admin));
});

/**
 * POST /api/admins
 * Create a new admin account.
 * Requires super_admin.
 */
router.post('/', requireAuth, requireSuperAdmin, (req, res) => {
  const name = sanitize(req.body?.name ?? '');
  const email = sanitize(req.body?.email ?? '').toLowerCase();
  const password = String(req.body?.password ?? '');
  const role = sanitize(req.body?.role ?? 'admin');
  const status = sanitize(req.body?.status ?? 'active');

  /* Validate */
  const errors = {};
  if (!name || name.length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!isValidEmail(email)) errors.email = 'Valid email is required.';
  if (!isStrongPassword(password)) errors.password = 'Password must be ≥8 chars and include a digit.';
  if (!['admin', 'super_admin'].includes(role)) errors.role = 'Invalid role.';
  if (!['active', 'inactive', 'suspended'].includes(status)) errors.status = 'Invalid status.';

  if (Object.keys(errors).length) return res.status(422).json({ errors });

  if (adminUsers.find(a => a.email === email)) {
    return res.status(409).json({ error: 'An admin with this email already exists.' });
  }

  const newAdmin = {
    id: genId(),
    name,
    email,
    passwordHash: hashPassword(password),
    role,
    status,
    createdAt: nowIso(),
    lastLogin: null,
    sessionToken: null,
  };

  adminUsers.push(newAdmin);
  logAudit(
    'create',
    `Super Admin created account <strong>${name}</strong> (${role})`,
    req.adminUser.id,
    req.adminUser.role,
  );

  return res.status(201).json(sanitizeOutput(newAdmin));
});

/**
 * PUT /api/admins/:id
 * Update an admin account (name, role, status).
 * Email is immutable after creation.
 * Requires super_admin.
 */
router.put('/:id', requireAuth, requireSuperAdmin, (req, res) => {
  const admin = adminUsers.find(a => a.id === req.params.id);
  if (!admin) return res.status(404).json({ error: 'Admin not found.' });

  /* Super admin cannot demote or deactivate themselves */
  if (admin.id === req.adminUser.id) {
    return res.status(403).json({
      error: 'You cannot modify your own account through this endpoint.',
    });
  }

  const name = req.body?.name !== undefined ? sanitize(req.body.name) : admin.name;
  const role = req.body?.role !== undefined ? sanitize(req.body.role) : admin.role;
  const status = req.body?.status !== undefined ? sanitize(req.body.status) : admin.status;

  const errors = {};
  if (!name || name.length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!['admin', 'super_admin'].includes(role)) errors.role = 'Invalid role.';
  if (!['active', 'inactive', 'suspended'].includes(status)) errors.status = 'Invalid status.';
  if (Object.keys(errors).length) return res.status(422).json({ errors });

  /* Cascade: revoke session if account is being suspended or deactivated */
  const wasActive = admin.status === 'active';
  const becomesInactive = status !== 'active';
  if (wasActive && becomesInactive) {
    admin.sessionToken = null;
  }

  /* Handle optional password change */
  if (req.body?.password) {
    const pw = String(req.body.password);
    if (!isStrongPassword(pw)) {
      return res.status(422).json({ errors: { password: 'Password must be ≥8 chars and include a digit.' } });
    }
    admin.passwordHash = hashPassword(pw);
  }

  const prevRole = admin.role;
  const prevStatus = admin.status;
  admin.name = name;
  admin.role = role;
  admin.status = status;

  const changes = [];
  if (prevRole !== role) changes.push(`role: ${prevRole} → ${role}`);
  if (prevStatus !== status) changes.push(`status: ${prevStatus} → ${status}`);
  if (wasActive && becomesInactive) changes.push('session revoked');

  logAudit(
    'update',
    `Updated account <strong>${name}</strong>${changes.length ? ` — ${changes.join(', ')}` : ''}`,
    req.adminUser.id,
    req.adminUser.role,
  );

  return res.status(200).json(sanitizeOutput(admin));
});

/**
 * PATCH /api/admins/:id/status
 * Suspend or restore a single admin account.
 * Requires super_admin.
 */
router.patch('/:id/status', requireAuth, requireSuperAdmin, (req, res) => {
  const admin = adminUsers.find(a => a.id === req.params.id);
  if (!admin) return res.status(404).json({ error: 'Admin not found.' });

  if (admin.id === req.adminUser.id) {
    return res.status(403).json({ error: 'You cannot change your own status.' });
  }

  const newStatus = sanitize(req.body?.status ?? '');
  if (!['active', 'inactive', 'suspended'].includes(newStatus)) {
    return res.status(422).json({ errors: { status: 'Invalid status value.' } });
  }

  const prevStatus = admin.status;

  /* Revoke active session when suspending or deactivating */
  if (newStatus !== 'active' && admin.sessionToken) {
    admin.sessionToken = null;
  }

  admin.status = newStatus;

  const action = newStatus === 'suspended' ? 'suspend'
    : newStatus === 'active' ? 'restore'
      : 'update';

  logAudit(
    action,
    `${action.charAt(0).toUpperCase() + action.slice(1)}ed account <strong>${admin.name}</strong>`
    + (prevStatus !== newStatus ? ` (${prevStatus} → ${newStatus})` : '')
    + (newStatus !== 'active' && admin.sessionToken !== null ? ' — session revoked' : ''),
    req.adminUser.id,
    req.adminUser.role,
  );

  return res.status(200).json(sanitizeOutput(admin));
});

/**
 * DELETE /api/admins/:id
 * Permanently delete an admin account and revoke their session.
 * Requires super_admin. Cannot delete own account.
 */
router.delete('/:id', requireAuth, requireSuperAdmin, (req, res) => {
  const idx = adminUsers.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Admin not found.' });

  const admin = adminUsers[idx];

  if (admin.id === req.adminUser.id) {
    return res.status(403).json({ error: 'You cannot delete your own account.' });
  }

  const hadSession = !!admin.sessionToken;

  /* Revoke session before removal */
  admin.sessionToken = null;
  adminUsers.splice(idx, 1);

  logAudit(
    'delete',
    `Deleted admin account <strong>${admin.name}</strong> (${admin.email})`
    + (hadSession ? ' — active session revoked' : ''),
    req.adminUser.id,
    req.adminUser.role,
  );

  return res.status(200).json({
    message: `Admin "${admin.name}" deleted.${hadSession ? ' Session revoked.' : ''}`,
  });
});

/**
 * GET /api/admins/audit/log
 * Retrieve the audit trail.
 * Requires super_admin.
 */
router.get('/audit/log', requireAuth, requireSuperAdmin, (req, res) => {
  const page = Math.max(1, parseInt(req.query.page ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit ?? '20', 10)));
  const total = auditTrail.length;
  const entries = auditTrail.slice((page - 1) * limit, page * limit);

  return res.status(200).json({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    entries,
  });
});

module.exports = router;
