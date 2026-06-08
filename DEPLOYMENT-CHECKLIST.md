# Deployment Checklist ✅

Use this checklist to ensure a smooth deployment to Render with Supabase.

## Before You Start

- [ ] Code is pushed to a Git repository (GitHub/GitLab/Bitbucket)
- [ ] You have a Supabase account
- [ ] You have a Render account
- [ ] Node.js is installed locally for testing

---

## Part 1: Supabase Setup

- [ ] Create new Supabase project
- [ ] Wait for project provisioning to complete (~2 mins)
- [ ] Go to SQL Editor
- [ ] Copy contents of `supabase/migrations/20260608000000_create_users_table.sql`
- [ ] Run the SQL migration
- [ ] Verify table was created in Table Editor
- [ ] Go to Project Settings → API
- [ ] Copy and save:
  - [ ] Project URL
  - [ ] anon key (for frontend)
  - [ ] service_role key (for backend - keep secret!)

---

## Part 2: Local Testing (Optional but Recommended)

- [ ] Update `backend/.env` with your Supabase credentials
- [ ] Update `frontend/.env` with your Supabase credentials
- [ ] Run `cd backend && npm install`
- [ ] Run `cd frontend && npm install`
- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `cd frontend && npm run dev`
- [ ] Test registration/login works locally
- [ ] Check database in Supabase dashboard for new users

---

## Part 3: Update Your Code

- [ ] Update imports in `backend/api/auth.js`:
  ```javascript
  const User = require('../models/UserSupabase');
  ```
- [ ] Update imports in `backend/api/users.js`:
  ```javascript
  const User = require('../models/UserSupabase');
  ```
- [ ] Commit and push all changes to Git

---

## Part 4: Deploy to Render

### Backend Deployment

- [ ] Go to [Render Dashboard](https://dashboard.render.com)
- [ ] Click "New +" → "Web Service"
- [ ] Connect your Git repository
- [ ] Configure:
  - [ ] Name: `your-app-backend`
  - [ ] Root Directory: `backend`
  - [ ] Runtime: `Node`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Plan: Free
- [ ] Add Environment Variables:
  - [ ] `SUPABASE_URL` = (your Supabase URL)
  - [ ] `SUPABASE_SERVICE_KEY` = (your service_role key)
  - [ ] `JWT_SECRET` = (generate a secure random string)
  - [ ] `NODE_ENV` = `production`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy the backend URL (e.g., `https://your-app-backend.onrender.com`)
- [ ] Test health check: Visit `https://your-app-backend.onrender.com/api/health`

### Frontend Deployment

- [ ] Click "New +" → "Static Site"
- [ ] Select same repository
- [ ] Configure:
  - [ ] Name: `your-app-frontend`
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Publish Directory: `dist`
  - [ ] Plan: Free
- [ ] Add Environment Variables:
  - [ ] `VITE_API_URL` = (your backend URL from above)
  - [ ] `VITE_SUPABASE_URL` = (your Supabase URL)
  - [ ] `VITE_SUPABASE_ANON_KEY` = (your anon key)
- [ ] Go to Redirects/Rewrites tab
- [ ] Add rewrite rule:
  - [ ] Source: `/*`
  - [ ] Destination: `/index.html`
  - [ ] Action: `Rewrite`
- [ ] Click "Create Static Site"
- [ ] Wait for deployment (2-3 minutes)

---

## Part 5: Testing Production

- [ ] Visit your frontend URL
- [ ] Test user registration
- [ ] Check Supabase dashboard - new user should appear
- [ ] Test user login
- [ ] Test protected routes
- [ ] Check browser console for errors
- [ ] Test on mobile device (optional)

---

## Part 6: CORS Configuration (if needed)

If you see CORS errors in browser console:

- [ ] Go to backend `server.js`
- [ ] Update CORS configuration:
  ```javascript
  app.use(cors({
    origin: 'https://your-app-frontend.onrender.com',
    credentials: true
  }));
  ```
- [ ] Commit and push - Render will auto-redeploy

---

## Part 7: Post-Deployment

- [ ] Save your deployment URLs somewhere safe
- [ ] Update any documentation with production URLs
- [ ] Set up custom domain (optional)
- [ ] Enable monitoring in Render dashboard
- [ ] Set up email notifications for deployment failures
- [ ] Share with team/users 🎉

---

## Common Issues

### ❌ Backend returns 500 errors
- Check environment variables are set correctly in Render
- View logs in Render dashboard
- Verify Supabase credentials

### ❌ Frontend shows blank page
- Check browser console for errors
- Verify `VITE_API_URL` is correct
- Ensure rewrite rule is configured

### ❌ CORS errors
- Update CORS configuration in backend
- Ensure frontend URL matches exactly (with/without trailing slash)

### ❌ Cold starts (15-30 second delays)
- This is normal on free tier after 15 minutes of inactivity
- Upgrade to paid tier ($7/month) for 24/7 uptime

### ❌ Database connection errors
- Verify service_role key is correct
- Check Supabase project is active
- Ensure migration was run successfully

---

## Useful Links

- Backend URL: `https://your-app-backend.onrender.com`
- Frontend URL: `https://your-app-frontend.onrender.com`
- Supabase Dashboard: https://app.supabase.com
- Render Dashboard: https://dashboard.render.com

---

**All done? Great work! 🚀**

Your app is now live and deployed to production!
