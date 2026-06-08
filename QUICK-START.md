# Quick Start Guide 🚀

Get your app running in **5 minutes**!

---

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

---

## Step 1: Install Dependencies (2 minutes)

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## Step 2: Set Up Supabase (2 minutes)

### Create Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in details and create

### Run Migration
1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Copy/paste contents from `supabase/migrations/20260608000000_create_users_table.sql`
4. Click "Run" or press Ctrl+Enter

### Get Credentials
1. Go to Project Settings → API
2. Copy these values:
   - Project URL
   - anon/public key
   - service_role key (keep secret!)

---

## Step 3: Configure Environment (1 minute)

### Backend `.env`
Create `backend/.env`:
```env
PORT=5000
SUPABASE_URL=https://xxxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
JWT_SECRET=make-this-a-long-random-string
NODE_ENV=development
```

### Frontend `.env`
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=https://xxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 4: Run Development Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Should see: `Server is running on http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Should see: `Local: http://localhost:5173`

---

## Step 5: Test It! ✅

1. Open browser to `http://localhost:5173`
2. Try registering a new user
3. Check Supabase dashboard → Table Editor → users table
4. You should see your new user!

---

## Deployment to Render

When ready to deploy:

1. **Read** → [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
2. **Follow** → Step-by-step instructions
3. **Done** → Your app is live! 🎉

---

## Common Issues

### ❌ Port already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### ❌ Module not found
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### ❌ Supabase connection error
- Double-check your SUPABASE_URL and keys
- Make sure there are no extra spaces in .env file
- Verify migration was run successfully

### ❌ CORS errors
- Make sure backend is running
- Check VITE_API_URL points to http://localhost:5000

---

## Useful Commands

```bash
# Backend
npm start          # Production mode
npm run dev        # Development mode with auto-restart

# Frontend
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build

# Both
npm install        # Install dependencies
```

---

## Project URLs

### Local Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

### Production (after deployment)
- Frontend: https://your-app-frontend.onrender.com
- Backend: https://your-app-backend.onrender.com
- Supabase: https://app.supabase.com

---

## API Endpoints

```bash
# Auth
POST   /api/auth/register    # Create account
POST   /api/auth/login       # Login
GET    /api/auth/me          # Get current user (requires token)

# Users
GET    /api/users/profile    # Get profile (requires token)
PUT    /api/users/profile    # Update profile (requires token)
DELETE /api/users/profile    # Delete account (requires token)

# Products
GET    /api/products         # Get all products

# Health
GET    /api/health           # Check server status
```

---

## Test with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## Need More Help?

- **Full Guide**: [README.md](./README.md)
- **Migration Info**: [MIGRATION-SUMMARY.md](./MIGRATION-SUMMARY.md)
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md) or [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
- **Supabase Docs**: https://supabase.com/docs
- **Render Docs**: https://render.com/docs

---

**Happy coding! 🎉**
