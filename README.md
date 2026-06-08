# Full-Stack App with Render + Supabase

A full-stack web application with React frontend, Express backend, and Supabase (PostgreSQL) database.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Render

## Project Structure

```
.
├── backend/              # Express API server
│   ├── api/             # Route handlers
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── models/          # Data models
│   └── server.js        # Entry point
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── services/    # API services
│   └── index.html
├── supabase/           # Database migrations
│   └── migrations/
└── render.yaml         # Render deployment config
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Render account (optional, for deployment)

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration from `supabase/migrations/20260608000000_create_users_table.sql`
3. Get your credentials from Project Settings → API

### 3. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see your app!

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Render.

### Quick Deploy

1. Push code to GitHub
2. Connect repository to Render
3. Render will auto-detect `render.yaml` and deploy both services
4. Add environment variables in Render dashboard

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users` - Get users (protected)
- `GET /api/products` - Get products

## Features

- ✅ User authentication with JWT
- ✅ Protected routes and middleware
- ✅ PostgreSQL database with Supabase
- ✅ RESTful API architecture
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Responsive design
- ✅ Production-ready deployment config

## Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_KEY` - Supabase service role key
- `JWT_SECRET` - Secret for JWT signing
- `NODE_ENV` - Environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Database Schema

### Users Table
```sql
- id (UUID, primary key)
- username (VARCHAR, unique)
- email (VARCHAR, unique)
- password (VARCHAR, hashed)
- created_at (TIMESTAMP)
```

## Security

- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Row Level Security (RLS) enabled in Supabase
- CORS configured for production
- Environment variables for sensitive data

## License

MIT

## Support

For issues and questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review Render docs: https://render.com/docs
- Review Supabase docs: https://supabase.com/docs
