# Deployment Guide

This guide covers deploying Lumara Auto to various platforms.

## Vercel (Recommended)

### Prerequisites
- Vercel account
- GitHub repository
- PostgreSQL database (Neon, Supabase, or Railway)

### Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `./` (or leave empty)
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set Environment Variables**
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   OPENAI_API_KEY=sk-...
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Database Setup
After deployment, run database migrations:
```bash
npx prisma db push
```

## Railway

### Prerequisites
- Railway account
- GitHub repository

### Steps

1. **Create New Project**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Add Database**
   - Click "New" → "Database" → "PostgreSQL"
   - Copy the connection string

3. **Configure Environment**
   - Go to your service settings
   - Add environment variables:
     ```
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     OPENAI_API_KEY=sk-...
     NEXTAUTH_SECRET=your-secret-key
     NEXTAUTH_URL=https://your-app.railway.app
     ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Run database migrations in the Railway console

## DigitalOcean App Platform

### Prerequisites
- DigitalOcean account
- GitHub repository

### Steps

1. **Create App**
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Connect your GitHub repository

2. **Configure App Spec**
   ```yaml
   name: lumara-auto
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/lumara-auto
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: DATABASE_URL
       value: your-database-url
     - key: OPENAI_API_KEY
       value: your-openai-key
     - key: NEXTAUTH_SECRET
       value: your-secret
     - key: NEXTAUTH_URL
       value: https://your-app.ondigitalocean.app
   ```

3. **Add Database**
   - Create a PostgreSQL database
   - Add connection string to environment variables

4. **Deploy**
   - Click "Create Resources"
   - Wait for deployment to complete

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `NEXTAUTH_SECRET`: Random string for NextAuth.js
- `NEXTAUTH_URL`: Your application's base URL

### Optional
- `SENTRY_DSN`: Sentry error tracking
- `POSTHOG_KEY`: PostHog analytics
- `POSTHOG_HOST`: PostHog host URL

## Database Providers

### Neon (Recommended)
1. Go to [Neon Console](https://console.neon.tech)
2. Create new project
3. Copy connection string
4. Use in `DATABASE_URL`

### Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project
3. Go to Settings → Database
4. Copy connection string

### Railway PostgreSQL
1. Create new Railway project
2. Add PostgreSQL database
3. Copy connection string from variables

## Post-Deployment

1. **Run Database Migrations**
   ```bash
   npx prisma db push
   ```

2. **Verify Deployment**
   - Visit your app URL
   - Test the check flow
   - Verify PDF generation works

3. **Set up Monitoring** (Optional)
   - Add Sentry for error tracking
   - Add PostHog for analytics
   - Set up uptime monitoring

## Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (requires 18+)
- Verify all dependencies are in package.json
- Check for TypeScript errors

**Database Connection Issues**
- Verify `DATABASE_URL` is correct
- Check database is accessible from your platform
- Ensure database exists and is running

**AI Features Not Working**
- Verify `OPENAI_API_KEY` is set correctly
- Check API key has sufficient credits
- Review API usage in OpenAI dashboard

**PDF Generation Issues**
- Check if `@react-pdf/renderer` is installed
- Verify server-side rendering is working
- Check browser console for errors

### Getting Help

- Check the [GitHub Issues](https://github.com/your-repo/issues)
- Review the [README.md](README.md)
- Contact support at support@lumara-auto.com
