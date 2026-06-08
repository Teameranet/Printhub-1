# Troubleshooting Guide

Common issues and solutions for deploying to Render with Supabase.

---

## Table of Contents
1. [Local Development Issues](#local-development-issues)
2. [Supabase Issues](#supabase-issues)
3. [Render Deployment Issues](#render-deployment-issues)
4. [Connection Issues](#connection-issues)
5. [Authentication Issues](#authentication-issues)
6. [Performance Issues](#performance-issues)

---

## Local Development Issues

### ❌ `npm install` fails
**Symptoms**: Errors during package installation

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete lock file and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

### ❌ Port already in use
**Symptoms**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or use a different port
# In backend/.env, change PORT=5000 to PORT=5001
```

### ❌ Module not found errors
**Symptoms**: `Cannot find module '@supabase/supabase-js'`

**Solutions**:
```bash
# Make sure you're in the right directory
cd backend
npm install

# Or install specific package
npm install @supabase/supabase-js
```

---

## Supabase Issues

### ❌ Connection refused / timeout
**Symptoms**: `fetch failed`, `ECONNREFUSED`

**Solutions**:
1. Check your `SUPABASE_URL` is correct (no trailing slash)
2. Verify your API keys don't have extra spaces
3. Check Supabase project is active (not paused)
4. Verify your internet connection
5. Check Supabase status: https://status.supabase.com

### ❌ "relation 'users' does not exist"
**Symptoms**: SQL error when trying to access users table

**Solutions**:
1. Go to Supabase Dashboard → SQL Editor
2. Run the migration from `supabase/migrations/20260608000000_create_users_table.sql`
3. Verify table exists in Table Editor
4. Check you're connected to the right project

### ❌ "Invalid API key"
**Symptoms**: `401 Unauthorized` or `Invalid API key`

**Solutions**:
1. Double-check you're using the **service_role key** for backend
2. Make sure there are no extra spaces or quotes in `.env`
3. Verify keys in Project Settings → API
4. Don't use anon key in backend (use service_role)
5. Restart your server after changing `.env`

### ❌ RLS (Row Level Security) blocking queries
**Symptoms**: Queries return empty or fail silently

**Solutions**:
1. Backend should use **service_role key** (bypasses RLS)
2. Check RLS policies in Table Editor
3. For testing, you can temporarily disable RLS:
   ```sql
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   ```
4. Re-enable after testing:
   ```sql
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ```

---

## Render Deployment Issues

### ❌ Build fails on Render
**Symptoms**: Deployment fails during build

**Solutions**:
1. Check build logs in Render dashboard
2. Verify `package.json` scripts are correct:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "build": "vite build"  // for frontend
     }
   }
   ```
3. Make sure dependencies are in `dependencies`, not `devDependencies`
4. Try building locally first:
   ```bash
   cd frontend && npm run build
   ```

### ❌ Environment variables not working
**Symptoms**: App works locally but fails on Render

**Solutions**:
1. Go to Render Dashboard → Your Service → Environment
2. Add ALL required variables
3. **Backend needs**:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. **Frontend needs**:
   - `VITE_API_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Redeploy after adding variables

### ❌ Service won't start
**Symptoms**: "Service Unavailable" or keeps crashing

**Solutions**:
1. Check logs in Render dashboard
2. Common issues:
   - Missing environment variables
   - Wrong start command
   - Port binding issues (use `process.env.PORT`)
3. Verify your `server.js` uses:
   ```javascript
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => { ... });
   ```

### ❌ Frontend shows blank page
**Symptoms**: Deployed frontend is blank

**Solutions**:
1. Check browser console for errors (F12)
2. Verify build command ran successfully
3. Check Redirects/Rewrites are configured:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`
4. Verify `VITE_API_URL` points to your backend URL
5. Check static publish path is `dist` (for Vite)

---

## Connection Issues

### ❌ CORS errors
**Symptoms**: `blocked by CORS policy` in browser console

**Solutions**:
1. **Backend `server.js`**, update CORS:
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:5173',  // local
       'https://your-app-frontend.onrender.com'  // production
     ],
     credentials: true
   }));
   ```
2. Make sure backend URL in frontend is correct
3. Verify both services are deployed and running

### ❌ Frontend can't reach backend
**Symptoms**: API calls timeout or fail

**Solutions**:
1. Check `VITE_API_URL` is correct in frontend `.env`
2. Test backend directly: Visit `https://your-backend.onrender.com/api/health`
3. Check backend is running (not sleeping)
4. Verify backend logs for errors
5. Try with full URL instead of relative path:
   ```javascript
   // In frontend/src/services/api.js
   const API_URL = import.meta.env.VITE_API_URL;
   fetch(`${API_URL}/api/auth/login`, ...)
   ```

### ❌ Cold start delays (Free tier)
**Symptoms**: First request takes 30-60 seconds

**Solutions**:
- This is **normal** on Render free tier
- Service sleeps after 15 minutes of inactivity
- Options:
  1. Accept the delay (free)
  2. Upgrade to paid tier ($7/mo) for 24/7 uptime
  3. Use a ping service to keep it awake (not recommended)

---

## Authentication Issues

### ❌ JWT token invalid
**Symptoms**: `401 Unauthorized` on protected routes

**Solutions**:
1. Check `JWT_SECRET` is the same in both environments
2. Verify token is being sent in headers:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```
3. Check token hasn't expired (7 days by default)
4. Verify authMiddleware is working:
   ```javascript
   // backend/middleware/authMiddleware.js
   console.log('Token:', token);
   console.log('Decoded:', decoded);
   ```

### ❌ Password comparison fails
**Symptoms**: "Invalid password" even with correct password

**Solutions**:
1. Check bcrypt is installed: `npm install bcryptjs`
2. Verify password is being hashed on registration
3. Check salt rounds match (10 is default)
4. Try creating a new user and testing
5. Check for whitespace in password fields

### ❌ "User already exists" on registration
**Symptoms**: Can't register with unique email

**Solutions**:
1. Check database for existing user
2. Delete test users from Supabase Table Editor
3. Or use a different email
4. Verify unique constraints are working:
   ```sql
   SELECT * FROM users WHERE email = 'test@example.com';
   ```

---

## Performance Issues

### ❌ Slow database queries
**Symptoms**: API responses take several seconds

**Solutions**:
1. Add indexes (already included in migration):
   ```sql
   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_users_username ON users(username);
   ```
2. Use `.select()` to limit returned columns
3. Add pagination for large datasets
4. Check Supabase dashboard → Database → Performance

### ❌ Large bundle size (Frontend)
**Symptoms**: Slow initial page load

**Solutions**:
1. Check bundle size: `npm run build`
2. Use code splitting with React.lazy:
   ```javascript
   const Dashboard = React.lazy(() => import('./pages/Dashboard'));
   ```
3. Remove unused dependencies
4. Use tree-shaking (Vite does this automatically)

---

## Database Issues

### ❌ Migration fails
**Symptoms**: SQL errors when running migration

**Solutions**:
1. Copy the EXACT SQL from the file
2. Make sure you're in SQL Editor (not Data Editor)
3. Run statements one at a time if needed
4. Check for syntax errors
5. Drop table and recreate if needed:
   ```sql
   DROP TABLE IF EXISTS users CASCADE;
   -- Then run the create table statement
   ```

### ❌ Cannot insert data
**Symptoms**: Insert queries fail silently

**Solutions**:
1. Check RLS policies (use service_role key in backend)
2. Verify table schema matches your model
3. Check for missing required fields
4. Look for constraint violations (unique, not null)
5. Check Supabase logs in Dashboard

---

## Debugging Tips

### Enable Detailed Logs

**Backend**:
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Add to error handler
app.use((err, req, res, next) => {
  console.error('Full error:', err);
  res.status(500).json({ error: err.message });
});
```

**Supabase Queries**:
```javascript
const { data, error } = await supabase.from('users').select();
console.log('Data:', data);
console.log('Error:', error);
```

### Check Service Status

1. **Backend Health**: `https://your-backend.onrender.com/api/health`
2. **Supabase Status**: https://status.supabase.com
3. **Render Status**: https://status.render.com

### View Logs

1. **Render**: Dashboard → Your Service → Logs
2. **Supabase**: Dashboard → Logs Explorer
3. **Browser**: F12 → Console (frontend errors)

---

## Still Stuck?

### Checklist
- [ ] All environment variables set correctly
- [ ] Migration ran successfully in Supabase
- [ ] Both services deployed and running
- [ ] Correct API keys (service_role for backend, anon for frontend)
- [ ] No CORS errors in browser console
- [ ] Backend health check responds
- [ ] Logs checked in Render dashboard

### Get Help
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for setup guide
2. Review [README.md](./README.md) for project overview
3. Visit Render Community: https://community.render.com
4. Visit Supabase Discord: https://discord.supabase.com
5. Check GitHub Issues (if applicable)

---

## Quick Fixes

```bash
# Reset everything and start fresh
cd backend
rm -rf node_modules package-lock.json
npm install
# Update .env with correct values
npm run dev

cd ../frontend
rm -rf node_modules package-lock.json
npm install
# Update .env with correct values
npm run dev
```

---

**Remember**: Most issues are environment variable or configuration problems. Double-check those first! 🔍
