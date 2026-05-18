# TODO App - Deployment Guide (Vercel + Railway)

## 📋 Prerequisites

You'll need:
- GitHub account (for connecting repos)
- Vercel account (free - for frontend)
- Railway account (free - for backend + database)

---

## 🔧 Step 1: Prepare Your Code for Deployment

### 1.1 Update Backend Environment Variables

Edit `backend/.env`:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/todo_app
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
```

### 1.2 Update Frontend API URL

In `frontend/src/api.js`, add environment variable support:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-railway-backend.up.railway.app/api
```

Update `frontend/src/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### 1.3 Add Deployment Scripts to Backend

Edit `backend/package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 📱 Step 2: Create GitHub Repository

### 2.1 Create a new GitHub repo

1. Go to https://github.com/new
2. Repository name: `todo-app`
3. Make it **Public** (easier for deployment)
4. Click "Create repository"

### 2.2 Push Your Code

```bash
cd /home/hemanth/practice

git init
git add .
git commit -m "Initial commit: TODO app with React + Express + PostgreSQL"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git
git push -u origin main
```

---

## 🚀 Step 3: Deploy Backend + Database on Railway

### 3.1 Create Railway Account

1. Go to https://railway.app
2. Sign up (GitHub login recommended)
3. Create a new project

### 3.2 Deploy Backend

1. **Click "Create"** → **"Deploy from GitHub repo"**
2. **Authorize Railway** with GitHub
3. **Select your repo**: `todo-app`
4. **Select service**: Node.js
5. Railway will auto-detect it's a Node.js app

### 3.3 Configure Environment Variables

1. In Railway dashboard, go to **Variables**
2. Add these environment variables:
   ```
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production
   DATABASE_URL=postgresql://...  (will be auto-generated)
   ```

### 3.4 Add PostgreSQL Database

1. In Railway, click **"+ Add"** → **"Database"**
2. Select **PostgreSQL**
3. Railway will generate DATABASE_URL automatically
4. Copy the DATABASE_URL to your backend variables

### 3.5 Run Database Migrations

1. In Railway dashboard, click on your **PostgreSQL service**
2. Look for **"Query"** section
3. Paste your schema.sql queries there

Or use Railway CLI:
```bash
railway shell
psql < backend/schema.sql
```

### 3.6 Get Your Backend URL

- In Railway dashboard, find your **Node.js service**
- Look for the **Domain** or **Public URL**
- Copy it (e.g., `https://todo-backend-production.up.railway.app`)

---

## 🎨 Step 4: Deploy Frontend on Vercel

### 4.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repos

### 4.2 Deploy Frontend

1. Click **"Add New"** → **"Project"**
2. **Import** your GitHub repo (`todo-app`)
3. **Select**: `frontend` directory
4. Vercel will detect it's a Vite app

### 4.3 Configure Environment Variables

1. Before deploying, go to **"Environment Variables"**
2. Add:
   ```
   VITE_API_URL=https://your-railway-backend.up.railway.app/api
   ```
3. Click **"Deploy"**

### 4.4 Get Your Frontend URL

- After deployment, Vercel shows your URL
- Example: `https://todo-app-pearl.vercel.app`

---

## 🔗 Step 5: Connect Frontend to Backend

### 5.1 Update Backend CORS

Edit `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-vercel-frontend.vercel.app'
  ],
  credentials: true
}));
```

### 5.2 Update Frontend API URL

In `frontend/.env.production`:
```
VITE_API_URL=https://your-railway-backend.up.railway.app/api
```

### 5.3 Commit and Push Changes

```bash
git add .
git commit -m "Configure deployment URLs"
git push
```

Both Vercel and Railway will auto-redeploy!

---

## ✅ Step 6: Test Your Deployment

1. Go to your **Vercel frontend URL**
2. Try to **Register** a new account
3. Check **Login** works
4. Create a **TODO**
5. Mark it **complete**
6. **Delete** a TODO

---

## 🆘 Troubleshooting

### CORS Errors
- **Solution**: Update `backend/server.js` CORS origin with your Vercel URL

### 404 on Backend
- **Solution**: Check Railway backend URL is correct in `VITE_API_URL`

### Database Connection Fails
- **Solution**: Verify DATABASE_URL in Railway variables

### Frontend shows 502 Error
- **Solution**: Railway backend might be starting, wait 30 seconds and refresh

---

## 📊 Deployment Status URLs

After deployment, you'll have:

| Service | URL | Status |
|---------|-----|--------|
| Frontend (Vercel) | https://todo-app-XXXX.vercel.app | Live |
| Backend (Railway) | https://todo-backend-XXXX.up.railway.app | Live |
| Database (Railway) | Managed PostgreSQL | Live |

---

## 🔐 Security Reminders

Before deploying to production:

✅ Change `JWT_SECRET` to a random secure string
✅ Set `NODE_ENV=production` on Railway
✅ Use HTTPS (Vercel and Railway provide this)
✅ Never commit `.env` files
✅ Set up environment variables in each platform

---

## 📝 Free Tier Limits

**Vercel Free**:
- ∞ Deployments
- Bandwidth: 100 GB/month
- Perfect for hobby projects

**Railway Free**:
- $5/month credit
- Then pay-as-you-go (~$0.001/hour)
- PostgreSQL included

---

## 🎯 Next Steps

1. Create GitHub account (if you don't have one)
2. Create Vercel account
3. Create Railway account
4. Push code to GitHub
5. Deploy backend + DB on Railway
6. Deploy frontend on Vercel
7. Test the live app!

All free! No credit card needed to start. 🚀
