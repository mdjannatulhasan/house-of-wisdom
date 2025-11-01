# 🚀 Supabase Setup Guide

Complete guide to set up Supabase PostgreSQL for House of Wisdom.

---

## 📋 Step 1: Create Supabase Project

### 1. Sign Up / Login to Supabase
- Visit: [https://supabase.com](https://supabase.com)
- Click "Start your project"
- Sign in with GitHub (recommended)

### 2. Create New Project
1. Click "New Project"
2. Fill in project details:
   - **Name**: `house-of-wisdom` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient to start

3. Click "Create new project"
4. Wait 2-3 minutes for setup to complete

---

## 🔑 Step 2: Get Database Credentials

### From Supabase Dashboard:

1. **Go to Project Settings**
   - Click the gear icon (⚙️) in the sidebar
   - Navigate to **Settings** > **Database**

2. **Copy Connection Strings**
   
   You'll need TWO connection strings:

   #### Connection Pooling (for serverless/edge functions):
   ```
   Mode: Session
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

   #### Direct Connection (for migrations):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres
   ```

3. **Get API Keys** (Optional - for additional Supabase features)
   - Go to **Settings** > **API**
   - Copy:
     - `Project URL`
     - `anon public` key

---

## ⚙️ Step 3: Configure Environment Variables

### Update `.env.local`

Replace the placeholder values with your actual Supabase credentials:

```env
# Supabase PostgreSQL Database
# Session pooler (port 6543) - for app queries
DATABASE_URL="postgresql://postgres.your-project-ref:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (port 5432) - for migrations
DIRECT_URL="postgresql://postgres.your-project-ref:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"

# App Configuration
NEXT_PUBLIC_APP_NAME="House of Wisdom"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Important Notes:

1. **Replace placeholders:**
   - `your-project-ref` → Your actual project reference
   - `YOUR_PASSWORD` → Your database password
   - `aws-0-us-west-1` → Your actual region

2. **Use correct ports:**
   - `6543` → Connection pooling (for app)
   - `5432` → Direct connection (for migrations)

3. **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

---

## 🗄️ Step 4: Set Up Database Schema

### 1. Generate Prisma Client
```bash
npx prisma generate
```

### 2. Push Schema to Supabase
```bash
# This creates all tables in your Supabase database
npx prisma db push
```

**OR** if you want to use migrations:

```bash
# Create and apply migration
npx prisma migrate dev --name init
```

### 3. Verify in Supabase Dashboard
1. Go to **Table Editor** in Supabase dashboard
2. You should see all tables:
   - `users`
   - `books`
   - `chapters`
   - `categories`
   - `posts`
   - `comments`
   - etc.

---

## 🌱 Step 5: Seed Database (Optional)

### Create Seed Script

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await hash('admin123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@houseofwisdom.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@houseofwisdom.com',
      password: adminPassword,
      role: 'admin',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'fiction' },
      update: {},
      create: {
        title: 'Fiction',
        slug: 'fiction',
        type: 'parent',
        menuOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'non-fiction' },
      update: {},
      create: {
        title: 'Non-Fiction',
        slug: 'non-fiction',
        type: 'parent',
        menuOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        title: 'Technology',
        slug: 'technology',
        type: 'parent',
        menuOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'science' },
      update: {},
      create: {
        title: 'Science',
        slug: 'science',
        type: 'parent',
        menuOrder: 4,
      },
    }),
  ]);

  console.log('✅ Created categories:', categories.length);

  console.log('🎉 Seeding completed!');
  console.log('\n📝 Test credentials:');
  console.log('   Email: admin@houseofwisdom.com');
  console.log('   Password: admin123456');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Add to package.json

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### Install tsx (if not installed)
```bash
npm install -D tsx
```

### Run Seed
```bash
npx prisma db seed
```

---

## 🔍 Step 6: Verify Connection

### Using Prisma Studio
```bash
npx prisma studio
```
Opens at `http://localhost:5555` - browse your database visually

### Using Supabase Dashboard
1. Go to **Table Editor**
2. Browse tables and data
3. Run SQL queries in **SQL Editor**

### Test in Application
```bash
npm run dev
```

Visit `http://localhost:3000` and:
1. Register a new user
2. Login
3. Check Supabase dashboard to see the user created

---

## 🔐 Connection String Format Reference

### Supabase Connection Strings

```
# Transaction Mode (Pooler) - Port 6543
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true

# Session Mode (Pooler) - Port 6543  
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

# Direct Connection - Port 5432
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

### When to Use Each:

- **Transaction Mode** (`?pgbouncer=true`): 
  - For serverless/edge functions
  - Default for application queries
  
- **Direct Connection** (port 5432):
  - For migrations
  - For operations requiring session state
  - For Prisma migrate commands

---

## 🚀 Step 7: Deploy to Production

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure Supabase PostgreSQL"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard

3. **Environment Variables in Vercel**
   ```
   DATABASE_URL=your-supabase-pooler-url
   DIRECT_URL=your-supabase-direct-url
   NEXTAUTH_URL=https://yourdomain.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
   ```

4. **Redeploy** after adding environment variables

---

## 🎯 Supabase Features (Bonus)

### Row Level Security (RLS)

Enable RLS for better security:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);
```

### Realtime Subscriptions

Enable realtime for live updates:

1. Go to **Database** > **Replication**
2. Enable replication for tables you want to subscribe to

### Storage

Use Supabase Storage for file uploads:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Upload file
const { data, error } = await supabase.storage
  .from('book-covers')
  .upload('cover.jpg', file);
```

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- ✅ Check if DATABASE_URL is correct
- ✅ Verify password doesn't have special characters (or URL encode them)
- ✅ Ensure Supabase project is not paused (free tier pauses after 7 days inactivity)

### Error: "Password authentication failed"
- ✅ Double-check database password from Supabase dashboard
- ✅ Reset password if needed: **Settings** > **Database** > **Reset password**

### Error: "SSL connection required"
Already included in Supabase URLs by default

### Project Paused (Free Tier)
Free tier projects pause after 7 days of inactivity:
1. Go to your Supabase dashboard
2. Click "Restore" on the paused project
3. Wait 2-3 minutes

### Reset Database
```bash
# Drops all tables and recreates them
npx prisma migrate reset
```

---

## 📊 Monitoring & Analytics

### Supabase Dashboard Insights

1. **Database**
   - View table sizes
   - Monitor queries
   - Check connections

2. **Logs**
   - View database logs
   - Debug queries
   - Monitor errors

3. **API Logs**
   - Track API usage
   - Monitor performance

---

## 💡 Best Practices

### Connection Management

✅ **DO:**
- Use connection pooling (port 6543) for app
- Use direct connection (port 5432) for migrations
- Close connections properly
- Use Prisma Client for queries

❌ **DON'T:**
- Use direct connection for serverless functions
- Keep connections open indefinitely
- Hardcode credentials in code

### Security

✅ **DO:**
- Use environment variables
- Enable Row Level Security (RLS)
- Rotate database passwords regularly
- Use `anon` key for client-side operations

❌ **DON'T:**
- Commit `.env` files to git
- Expose `service_role` key in client code
- Use admin credentials in frontend

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase + Prisma Guide](https://supabase.com/docs/guides/integrations/prisma)
- [Prisma + Supabase](https://www.prisma.io/docs/guides/database/supabase)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## ✅ Setup Checklist

- [ ] Supabase project created
- [ ] Database password saved securely
- [ ] Connection strings copied from dashboard
- [ ] `.env.local` configured with credentials
- [ ] `NEXTAUTH_SECRET` generated
- [ ] `npx prisma generate` executed
- [ ] `npx prisma db push` completed successfully
- [ ] Tables visible in Supabase Table Editor
- [ ] Database seeded (optional)
- [ ] Application runs: `npm run dev`
- [ ] Can register and login successfully

---

**Your Supabase PostgreSQL is ready! 🎉**

Need help? Check the [Supabase Discord](https://discord.supabase.com)

