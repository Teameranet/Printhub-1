# Deployment Guide: Render + Supabase

This guide will help you deploy your full-stack application to Render with Supabase as the database.

## Prerequisites

1. **Supabase Account** - [Sign up here](https://supabase.com)
2. **Render Account** - [Sign up here](https://render.com)
3. **Git Repository** - Push your code to GitHub/GitLab/Bitbucket

---

## Step 1: Set Up Supabase

1. **Create a New Project**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Click "New Project"
   - Enter project details and choose a region close to your users
   - Wait for the project to be provisioned (~2 minutes)

2. **Run Database Migration**
   - Go to SQL Editor in Supabase dashboard
   - Copy the contents of `supabase/migrations/20260608000000_create_users_table.sql`
   - Paste and run the SQL to create the users table

3. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy these values:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon/public key** (for frontend)
     - **service_role key** (for backend - keep this secret!)

---

## Step 2: Deploy Backend to Render

### Option A: Using render.yaml (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Add Render deployment config"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your Git repository
   - Render will auto-detect `render.yaml`

3. **Set Environment Variables**
   - Render will prompt for environment variables
   - Set these for the **backend** service:
     - `SUPABASE_URL`: Your Supabase Project URL
     - `SUPABASE_SERVICE_KEY`: Your Supabase service_role key
     - `JWT_SECRET`: A random secure string (Render can generate this)

### Option B: Manual Setup

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure Backend**
   - Name: `your-app-backend`
   - Region: Choose closest to your users
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

3. **Add Environment Variables**
   - Go to Environment tab
   - Add the variables listed above

4. **Deploy**
   - Click "Create Web Service"
   - Note the backend URL (e.g., `https://your-app-backend.onrender.com`)

---

## Step 3: Deploy Frontend to Render

1. **Create Static Site**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Select same repository

2. **Configure Frontend**
   - Name: `your-app-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Plan: Free

3. **Add Environment Variables**
   - `VITE_API_URL`: Your backend URL (from Step 2)
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Add Rewrite Rules** (Important for React Router)
   - Go to Redirects/Rewrites tab
   - Add rule:
     - Source: `/*`
     - Destination: `/index.html`
     - Action: `Rewrite`

5. **Deploy**
   - Click "Create Static Site"
   - Your frontend will be available at `https://your-app-frontend.onrender.com`

---

## Step 4: Update Backend Dependencies

In the `backend` directory, run:

```bash
cd backend
npm uninstall mongoose
npm install @supabase/supabase-js
```

---

## Step 5: Update Your API Routes

Update your API routes to use the new Supabase User model:

**In `backend/api/auth.js`, `backend/api/users.js`**, change:
```javascript
// OLD
const User = require('../models/User');

// NEW
const User = require('../models/UserSupabase');
```

---

## Step 6: Test Your Deployment

1. **Test Backend Health Check**
   ```bash
   curl https://your-app-backend.onrender.com/api/health
   ```

2. **Test Frontend**
   - Visit your frontend URL
   - Try registering/logging in

---

## Important Notes

### Free Tier Limitations

- **Render Free Tier**: Services spin down after 15 minutes of inactivity
  - First request after inactivity takes ~30 seconds (cold start)
  - Consider upgrading to paid tier ($7/month) for 24/7 uptime

- **Supabase Free Tier**: 
  - 500MB database storage
  - 2GB bandwidth per month
  - Unlimited API requests

### Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use different JWT secrets** for development and production
3. **Keep service_role key secret** - Only use in backend
4. **Enable RLS policies** in Supabase for data security

### Auto-Deploy

Both Render services will automatically redeploy when you push to your main branch.

---

## Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- View logs in Render dashboard
- Verify Supabase credentials

### Frontend can't connect to backend
- Check CORS is enabled in backend
- Verify `VITE_API_URL` is correct
- Check backend is running (visit health check endpoint)

### Database errors
- Verify migration was run in Supabase
- Check service_role key is correct
- View logs in Render dashboard

---

## Next Steps

1. **Set up custom domains** (optional)
2. **Configure CI/CD** for automated testing
3. **Add monitoring** with Render's built-in metrics
4. **Set up email** in Supabase for auth features
5. **Enable Supabase Auth** for easier authentication

---

## Useful Commands

```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install

# Run locally
cd backend && npm run dev
cd frontend && npm run dev

# Build frontend
cd frontend && npm run build

# View Render logs
# Go to Render Dashboard → Your Service → Logs
```

---

## Support

- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Render Community**: https://community.render.com

Good luck with your deployment! 🚀
