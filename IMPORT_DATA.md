# 📦 Import Existing Data from Laravel Database

This guide will help you import your existing book library data into the new Supabase database.

## 🎯 What Will Be Imported

From your old `book_library.sql` MySQL database:

- ✅ **2 Users** (1 admin, 1 regular user)
- ✅ **2 Categories** (Hadith, Know Islam)
- ✅ **3 Books** with cover images and PDFs
- ✅ **1 Chapter** (from "Islam: Grundläggande Tro och Praktiker")
- ✅ **1 Published Post** ("Vad är islam?")

## 📋 Prerequisites

1. **Supabase database connection working**
   - Follow `SUPABASE_SETUP.md` to configure your database
   - Verify connection with `npx prisma db push`

2. **Database schema created**
   - Run `npx prisma generate`
   - Run `npx prisma db push`

## 🚀 Import Steps

### Step 1: Push Database Schema

Make sure your database tables are created:

```bash
npx prisma generate
npx prisma db push
```

### Step 2: Run Seed Script

Import all your existing data:

```bash
npx prisma db seed
```

Or directly:

```bash
npx tsx prisma/seed.ts
```

### Step 3: Verify Data Import

Check if data was imported successfully:

```bash
# Open Prisma Studio
npx prisma studio
```

Visit `http://localhost:5555` and verify:
- Users table has 2 users
- Categories table has 2 categories  
- Books table has 3 books
- Chapters table has 1 chapter
- Posts table has 1 post

Or check in Supabase Dashboard:
1. Go to your Supabase project
2. Click **Table Editor**
3. Browse each table

## 🔐 Login Credentials

After seeding, you can login with these accounts:

### Admin Account
- **Email**: `hasan.test.1@gmail.com`
- **Password**: Your original Laravel password

### Regular User
- **Email**: `hasan.di@test.com`
- **Password**: Your original Laravel password

⚠️ **Important Note**: The passwords in the seed are Laravel bcrypt hashes. NextAuth uses a different hashing method, so you may need to:

**Option 1**: Use the password reset flow to set new passwords
**Option 2**: Update the auth configuration to support Laravel bcrypt hashes

To set new passwords for testing:

```bash
# In Node.js console or create a script
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('your-new-password', 12);
console.log(hash);
```

Then update the password in Prisma Studio or via SQL.

## 📁 File Migrations

The seed script imports file paths from your old Laravel app:

```
storage/covers/...   → Book cover images
storage/pdf/...      → Book PDF files
```

You'll need to migrate these files:

### Option 1: Copy Files to Next.js Public Directory

```bash
# From your Laravel project root
cp -r storage/app/public/covers /path/to/nextjs-version/public/
cp -r storage/app/public/pdf /path/to/nextjs-version/public/
```

Then update the paths in the database:
- Change `storage/covers/...` to `/covers/...`
- Change `storage/pdf/...` to `/pdf/...`

### Option 2: Upload to Supabase Storage

1. **Create Buckets in Supabase**:
   - Go to Supabase Dashboard → Storage
   - Create bucket: `book-covers` (public)
   - Create bucket: `book-pdfs` (public)

2. **Upload Files**:
   - Upload cover images to `book-covers`
   - Upload PDFs to `book-pdfs`

3. **Update Database Records**:

```sql
-- Update book cover image URLs
UPDATE books 
SET cover_image = REPLACE(cover_image, 'storage/covers/', 'https://your-project.supabase.co/storage/v1/object/public/book-covers/');

-- Update book PDF URLs
UPDATE books 
SET pdf_file = REPLACE(pdf_file, 'storage/pdf/', 'https://your-project.supabase.co/storage/v1/object/public/book-pdfs/');
```

### Option 3: Keep Existing Laravel Storage

If your Laravel app is still running, you can proxy image requests to it temporarily.

## 🔄 Re-running the Seed

If you need to re-import data (this will **DELETE ALL EXISTING DATA**):

```bash
npx prisma db seed
```

The seed script automatically:
1. Clears all existing data
2. Imports fresh data from the SQL dump
3. Maintains all relationships

To prevent data deletion, comment out these lines in `prisma/seed.ts`:

```typescript
// await prisma.comment.deleteMany();
// await prisma.post.deleteMany();
// ... etc
```

## ✅ Verification Checklist

After importing:

- [ ] Can access Prisma Studio: `npx prisma studio`
- [ ] Users table shows 2 users
- [ ] Categories table shows 2 categories
- [ ] Books table shows 3 books
- [ ] Chapters table shows 1 chapter
- [ ] Posts table shows 1 post
- [ ] Application starts: `npm run dev`
- [ ] Can view books at `/books`
- [ ] Can view posts at `/posts`
- [ ] Can login with admin account
- [ ] Cover images display correctly
- [ ] PDFs can be accessed

## 🐛 Troubleshooting

### Error: "Cannot read properties of undefined"

Make sure all foreign key relationships are correct. The seed script creates records in order:
1. Users (no dependencies)
2. Categories (no dependencies)
3. Books (no dependencies)
4. Chapters (depends on Books)
5. Posts (depends on Users and Categories)

### Error: "Unique constraint failed"

If you run the seed multiple times without clearing data, you'll hit unique constraints (emails, slugs). Either:
- Uncomment the delete statements
- Or manually clear the database: `npx prisma migrate reset`

### Files Not Found (404)

If images/PDFs return 404:
- Check file paths in database match actual file locations
- Ensure files are in `public/` directory or Supabase Storage
- Verify file permissions

### Can't Login with Old Passwords

Laravel uses bcrypt with a different cost factor. You have two options:
1. Reset passwords via password reset flow
2. Update auth to support Laravel bcrypt (requires custom verification)

## 📚 Additional Data

If you want to add more sample data, edit `prisma/seed.ts` and add:

```typescript
// Add more users
const newUser = await prisma.user.create({
  data: {
    name: 'New User',
    email: 'new@example.com',
    password: await hash('password123', 12),
    role: 'user',
  },
});

// Add more categories
const newCategory = await prisma.category.create({
  data: {
    title: 'Science',
    slug: 'science',
    menuOrder: 20,
    type: 'parent',
  },
});

// ... etc
```

Then run `npx prisma db seed` again.

---

**Your data is now in Supabase! 🎉**

Continue with the application development and you'll have all your existing content ready to go.

