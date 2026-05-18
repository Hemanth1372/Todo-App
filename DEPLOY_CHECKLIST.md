# TODO App - Quick Deployment Checklist

## Pre-Deployment Checklist ✅

### Backend (Express + PostgreSQL)
- [ ] Update `backend/.env.production` with production values
- [ ] Change `JWT_SECRET` to a random secure string
- [ ] Verify all dependencies in `backend/package.json`
- [ ] Test locally: `npm run dev`

### Frontend (React + Vite)
- [ ] Build test: `npm run build`
- [ ] Verify `frontend/.env.production` with your backend URL
- [ ] Test locally: `npm run dev`

### GitHub Setup
- [ ] Create GitHub account at https://github.com
- [ ] Create new repository
- [ ] Push your code: `git push`

---

## Deployment Steps

### 1️⃣ Create Accounts (5 minutes)

**Vercel** (Frontend hosting):
- Go to https://vercel.com
- Sign up with GitHub
- Authorize Vercel

**Railway** (Backend + Database):
- Go to https://railway.app
- Sign up with GitHub
- Authorize Railway

### 2️⃣ Deploy Backend on Railway (10 minutes)

1. Go to Railway dashboard
2. Create new project
3. Connect your GitHub repo
4. Select `backend` directory
5. Add PostgreSQL database
6. Set environment variables:
   - `JWT_SECRET=your-random-secret-here`
   - `NODE_ENV=production`
7. Railway auto-generates `DATABASE_URL`
8. Deploy!
9. **Copy your backend URL** (looks like: https://xxx.up.railway.app)

### 3️⃣ Setup Database Schema

Run in Railway CLI:
```bash
railway shell
psql < ../backend/schema.sql
```

### 4️⃣ Deploy Frontend on Vercel (10 minutes)

1. Go to Vercel dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Select `frontend` directory
5. Set environment variables:
   - `VITE_API_URL=https://your-railway-backend.up.railway.app/api`
6. Deploy!
7. **Copy your frontend URL** (looks like: https://xxx.vercel.app)

### 5️⃣ Final Configuration (5 minutes)

Update `backend/server.js` allowed origins with your Vercel URL

### 6️⃣ Test Everything

1. Go to your Vercel frontend URL
2. Register a new account
3. Create a TODO
4. Mark it complete
5. Delete it
6. Logout and login again

---

## 🎉 Success!

Your TODO app is now live! Share your URL with others!

---

## Free Tier Info

- **Vercel**: ∞ free deployments, 100GB bandwidth/month
- **Railway**: $5/month credit, then pay-as-you-go

No credit card required to start!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS error | Update `FRONTEND_URL` in Railway |
| 404 on backend | Check `VITE_API_URL` in Vercel env vars |
| Database error | Run schema.sql via Railway CLI |
| Can't login | Check `JWT_SECRET` is set in Railway |

---

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- PostgreSQL Docs: https://www.postgresql.org/docs

Good luck! 🚀
