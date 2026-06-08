# Your Specific Setup Guide

## ✅ What's Already Configured

Your project is already partially set up! Here's what I've configured for you:

### Supabase Project Details
- **Project URL**: `https://qzybubwlatadokbycire.supabase.co`
- **Anon Key**: Already configured ✅

### Environment Files Updated
- ✅ `frontend/.env` - Fully configured with your Supabase credentials
- ⚠️ `backend/.env` - Needs your **service_role key**

---

## 🔑 Get Your Service Role Key

You need to get your **service_role key** from Supabase:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (qzybubwlatadokbycire)
3. Go to **Project Settings** (gear icon in sidebar)
4. Click **API** in the left menu
5. Find the **service_role key** (labeled "secret" - keep this private!)
6. Copy it

### Update Backend .env

Open `backend/.env` and replace this line:
```env
SUPABASE_SERVICE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

With:
```env
SUPABASE_SERVICE_KEY=your-actual-service-role-key-paste-here
```

**Also update the JWT_SECRET** to a random secure string (30+ characters).

---

## 📊 Set Up Database

Next, you need to create the users table in Supabase:

### Option A: Using SQL Editor (Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the contents from: `supabase/migrations/20260608000000_create_users_table.sql`
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Option B: Copy & Paste This SQL

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy: Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid() = id);
```

### Verify Table Creation

1. Go to **Table Editor** in Supabase Dashboard
2. You should see a **users** table
3. It should have columns: id, username, email, password, created_at

---

## 🚀 Run Your Application Locally

Once you've completed the above steps:

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see: `Server is running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see: `Local: http://localhost:5173`

### 3. Test Your App

1. Open browser to `http://localhost:5173`
2. Try registering a new user
3. Check Supabase Dashboard → Table Editor → users table
4. Your new user should appear there!

---

## 🌐 Deploy to Render (After Local Testing Works)

Once everything works locally, follow these steps:

### 1. Push to GitHub

```bash
git add .
git commit -m "Configure Supabase and prepare for deployment"
git push origin main
```

### 2. Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your Git repository
4. Configure:
   - **Name**: `your-app-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables**:
   ```
   PORT = 5000
   NODE_ENV = production
   SUPABASE_URL = https://qzybubwlatadokbycire.supabase.co
   SUPABASE_SERVICE_KEY = (paste your service_role key)
   JWT_SECRET = (create a long random string)
   ```

6. Click **Create Web Service**
7. Wait 2-3 minutes for deployment
8. **Copy your backend URL** (e.g., `https://your-app-backend.onrender.com`)

### 3. Deploy Frontend on Render

1. Click **New +** → **Static Site**
2. Select same repository
3. Configure:
   - **Name**: `your-app-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. **Add Environment Variables**:
   ```
   VITE_API_URL = (paste your backend URL from step 2)
   VITE_SUPABASE_URL = https://qzybubwlatadokbycire.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eWJ1YndsYXRhZG9rYnljaXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTUzNTgsImV4cCI6MjA5NjQ5MTM1OH0.Br655MbemW21QJ5J3FkaIU81riZTxfdJzrZZlA6JAK8
   ```

5. **Add Redirect Rule**:
   - Go to **Redirects/Rewrites** tab
   - Add: Source: `/*`, Destination: `/index.html`, Action: `Rewrite`

6. Click **Create Static Site**
7. Wait 2-3 minutes for deployment

### 4. Test Production

1. Visit your frontend URL
2. Try registering and logging in
3. Check Supabase dashboard for new users

---

## ✅ Quick Checklist

- [ ] Got service_role key from Supabase
- [ ] Updated `backend/.env` with service_role key
- [ ] Updated `backend/.env` with a random JWT_SECRET
- [ ] Ran SQL migration in Supabase SQL Editor
- [ ] Verified users table exists in Table Editor
- [ ] Installed dependencies (`npm install` in both folders)
- [ ] Backend starts without errors (`npm run dev`)
- [ ] Frontend starts without errors (`npm run dev`)
- [ ] Can register a user locally
- [ ] New user appears in Supabase dashboard
- [ ] Pushed code to GitHub
- [ ] Deployed backend to Render
- [ ] Deployed frontend to Render
- [ ] Production app works!

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
→ Make sure you've updated `backend/.env` with your service_role key

### "relation 'users' does not exist"
→ Run the SQL migration in Supabase SQL Editor

### Can't find service_role key
→ Go to Supabase Dashboard → Project Settings → API → Look for "service_role (secret)"

### Backend won't start
→ Check `backend/.env` has all required variables with no typos

### Frontend blank page
→ Check browser console (F12) for errors. Verify `VITE_API_URL` is correct

---

## 📚 Need More Help?

- **Detailed Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Step-by-step Checklist**: [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
- **Common Issues**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Quick Start**: [QUICK-START.md](./QUICK-START.md)

---

**You're almost there! Just need to:**
1. Get your service_role key
2. Run the SQL migration
3. Test locally
4. Deploy!

Good luck! 🚀
