# PostgreSQL Setup Guide

This guide will help you set up PostgreSQL for the House of Wisdom application.

## 🗄️ PostgreSQL Installation

### macOS (Homebrew)
```bash
# Install PostgreSQL
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Create database
createdb house_of_wisdom
```

### Ubuntu/Debian
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and create database
sudo -u postgres psql
CREATE DATABASE house_of_wisdom;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE house_of_wisdom TO your_username;
\q
```

### Windows
1. Download PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the wizard
3. Remember the password you set for the postgres user
4. Use pgAdmin to create a new database named `house_of_wisdom`

### Docker (Any OS)
```bash
# Run PostgreSQL in Docker
docker run --name house-of-wisdom-db \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_USER=your_username \
  -e POSTGRES_DB=house_of_wisdom \
  -p 5432:5432 \
  -d postgres:16

# To stop: docker stop house-of-wisdom-db
# To start: docker start house-of-wisdom-db
```

---

## 🔧 Environment Configuration

### 1. Update `.env.local`

Replace the placeholder values in `.env.local`:

```env
# Update with your actual PostgreSQL credentials
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/house_of_wisdom?schema=public"

# Generate a secure secret (run this command):
# openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret-key-here"

# Update if needed
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="House of Wisdom"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and paste it as your `NEXTAUTH_SECRET` value.

---

## 🚀 Database Setup

### 1. Generate Prisma Client
```bash
npx prisma generate
```

### 2. Run Database Migrations
```bash
# This will create all tables in your PostgreSQL database
npx prisma migrate dev --name init
```

### 3. (Optional) Seed Database
If you want to add sample data, create a seed file:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        title: 'Fiction',
        slug: 'fiction',
        type: 'parent',
      },
    }),
    prisma.category.create({
      data: {
        title: 'Non-Fiction',
        slug: 'non-fiction',
        type: 'parent',
      },
    }),
    prisma.category.create({
      data: {
        title: 'Technology',
        slug: 'technology',
        type: 'parent',
      },
    }),
  ]);

  console.log('✅ Seeded database successfully');
  console.log('Admin user:', admin.email, '/ admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then run:
```bash
npx prisma db seed
```

---

## 🔍 Verify PostgreSQL Connection

### Using psql
```bash
# Connect to your database
psql -U your_username -d house_of_wisdom

# List all tables
\dt

# Check users table
SELECT * FROM users;

# Exit
\q
```

### Using Prisma Studio
```bash
# Open visual database editor
npx prisma studio
```

This will open `http://localhost:5555` where you can browse and edit your database.

---

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

Visit: `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```

---

## 🔐 Database Connection Formats

### Local PostgreSQL
```
DATABASE_URL="postgresql://username:password@localhost:5432/house_of_wisdom?schema=public"
```

### Railway
```
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:1234/railway"
```

### Supabase
```
DATABASE_URL="postgresql://postgres:password@db.projectref.supabase.co:5432/postgres?schema=public"
```

### Vercel Postgres
```
POSTGRES_URL="postgres://default:password@ep-xxx.us-east-1.postgres.vercel-storage.com:5432/verceldb"
DATABASE_URL="${POSTGRES_URL}?sslmode=require"
```

### Neon
```
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/house_of_wisdom?sslmode=require"
```

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- Check if PostgreSQL is running: `pg_isready`
- Verify connection details in `.env.local`
- Check firewall settings

### Error: "Password authentication failed"
- Double-check username and password
- Ensure no special characters need URL encoding
- For special characters, use URL encoding (e.g., `@` = `%40`)

### Error: "Database does not exist"
```bash
# Create the database
createdb house_of_wisdom

# Or using psql
psql -U postgres
CREATE DATABASE house_of_wisdom;
\q
```

### Error: "SSL connection required"
Add `?sslmode=require` to your DATABASE_URL:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public&sslmode=require"
```

### Reset Database
```bash
# Drop all tables and recreate
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Run all migrations
# 4. Run seed script (if configured)
```

---

## 📊 Monitoring

### Check Database Size
```sql
SELECT pg_size_pretty(pg_database_size('house_of_wisdom'));
```

### View Active Connections
```sql
SELECT * FROM pg_stat_activity WHERE datname = 'house_of_wisdom';
```

### Backup Database
```bash
# Export
pg_dump -U username house_of_wisdom > backup.sql

# Import
psql -U username house_of_wisdom < backup.sql
```

---

## 🌐 Production Deployment

### Recommended Hosting

1. **Vercel** (Frontend) + **Vercel Postgres** (Database)
   - Easy deployment
   - Automatic HTTPS
   - Built-in PostgreSQL

2. **Vercel** (Frontend) + **Supabase** (Database)
   - Free PostgreSQL
   - Additional features (auth, storage, realtime)

3. **Vercel** (Frontend) + **Railway** (Database)
   - Simple PostgreSQL hosting
   - Automatic backups

4. **Vercel** (Frontend) + **Neon** (Database)
   - Serverless PostgreSQL
   - Generous free tier

### Environment Variables for Production

Update in Vercel dashboard:
```
DATABASE_URL=your-production-postgres-url
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## ✅ Quick Start Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `house_of_wisdom` created
- [ ] `.env.local` file configured with credentials
- [ ] `NEXTAUTH_SECRET` generated and added
- [ ] `npx prisma generate` executed
- [ ] `npx prisma migrate dev` completed
- [ ] Application starts with `npm run dev`
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Can create books/posts

---

## 🆘 Need Help?

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth Documentation](https://next-auth.js.org)

---

**Your PostgreSQL setup is ready! 🎉**

