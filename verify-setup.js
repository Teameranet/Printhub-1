// Quick setup verification script
// Run with: node verify-setup.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Project Setup...\n');

let allGood = true;

// Check backend .env
console.log('📁 Checking backend/.env...');
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(backendEnvPath)) {
  const backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
  
  const checks = {
    'SUPABASE_URL': backendEnv.includes('SUPABASE_URL=https://qzybubwlatadokbycire.supabase.co'),
    'SUPABASE_SERVICE_KEY': backendEnv.includes('SUPABASE_SERVICE_KEY=eyJ') && !backendEnv.includes('YOUR_SERVICE_ROLE_KEY'),
    'JWT_SECRET': backendEnv.includes('JWT_SECRET=') && !backendEnv.includes('change-this'),
    'PORT': backendEnv.includes('PORT=5000')
  };

  Object.entries(checks).forEach(([key, value]) => {
    if (value) {
      console.log(`  ✅ ${key} configured`);
    } else {
      console.log(`  ❌ ${key} missing or incomplete`);
      allGood = false;
    }
  });
} else {
  console.log('  ❌ backend/.env not found');
  allGood = false;
}

console.log('');

// Check frontend .env
console.log('📁 Checking frontend/.env...');
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
if (fs.existsSync(frontendEnvPath)) {
  const frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
  
  const checks = {
    'VITE_API_URL': frontendEnv.includes('VITE_API_URL='),
    'VITE_SUPABASE_URL': frontendEnv.includes('VITE_SUPABASE_URL=https://qzybubwlatadokbycire.supabase.co'),
    'VITE_SUPABASE_ANON_KEY': frontendEnv.includes('VITE_SUPABASE_ANON_KEY=eyJ')
  };

  Object.entries(checks).forEach(([key, value]) => {
    if (value) {
      console.log(`  ✅ ${key} configured`);
    } else {
      console.log(`  ❌ ${key} missing or incomplete`);
      allGood = false;
    }
  });
} else {
  console.log('  ❌ frontend/.env not found');
  allGood = false;
}

console.log('');

// Check if migration file exists
console.log('📁 Checking database migration...');
const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20260608000000_create_users_table.sql');
if (fs.existsSync(migrationPath)) {
  console.log('  ✅ Migration file exists');
} else {
  console.log('  ❌ Migration file not found');
  allGood = false;
}

console.log('');

// Check if package.json files exist
console.log('📁 Checking dependencies...');
const backendPkgPath = path.join(__dirname, 'backend', 'package.json');
const frontendPkgPath = path.join(__dirname, 'frontend', 'package.json');

if (fs.existsSync(backendPkgPath)) {
  const backendPkg = JSON.parse(fs.readFileSync(backendPkgPath, 'utf8'));
  if (backendPkg.dependencies['@supabase/supabase-js']) {
    console.log('  ✅ Backend has @supabase/supabase-js');
  } else {
    console.log('  ❌ Backend missing @supabase/supabase-js');
    allGood = false;
  }
} else {
  console.log('  ❌ backend/package.json not found');
  allGood = false;
}

if (fs.existsSync(frontendPkgPath)) {
  console.log('  ✅ Frontend package.json exists');
} else {
  console.log('  ❌ frontend/package.json not found');
  allGood = false;
}

console.log('');

// Check if node_modules are installed
console.log('📦 Checking installations...');
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules');

if (fs.existsSync(backendNodeModules)) {
  console.log('  ✅ Backend dependencies installed');
} else {
  console.log('  ⚠️  Backend dependencies not installed (run: cd backend && npm install)');
}

if (fs.existsSync(frontendNodeModules)) {
  console.log('  ✅ Frontend dependencies installed');
} else {
  console.log('  ⚠️  Frontend dependencies not installed (run: cd frontend && npm install)');
}

console.log('');
console.log('═'.repeat(60));

if (allGood) {
  console.log('✅ CONFIGURATION COMPLETE!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Run SQL migration in Supabase SQL Editor');
  console.log('   (Copy from: supabase/migrations/20260608000000_create_users_table.sql)');
  console.log('');
  console.log('2. Install dependencies (if not already done):');
  console.log('   cd backend && npm install');
  console.log('   cd frontend && npm install');
  console.log('');
  console.log('3. Start development servers:');
  console.log('   Terminal 1: cd backend && npm run dev');
  console.log('   Terminal 2: cd frontend && npm run dev');
  console.log('');
  console.log('4. Open http://localhost:5173 and test!');
} else {
  console.log('❌ CONFIGURATION INCOMPLETE');
  console.log('');
  console.log('Please fix the issues above, then run this script again.');
  console.log('');
  console.log('Need help? Check:');
  console.log('- READY-TO-RUN.md for setup instructions');
  console.log('- TROUBLESHOOTING.md for common issues');
}

console.log('═'.repeat(60));
