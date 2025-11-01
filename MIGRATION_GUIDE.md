# Migration Guide: Completing the Frontend Migration

This guide will help you complete the migration of frontend pages and components from the Laravel + Inertia.js version to Next.js 15+.

## 🎯 Current Status

### ✅ Completed
- Backend API routes (all CRUD operations)
- Database schema and migrations
- Authentication system (NextAuth)
- Redux store configuration
- Middleware for route protection
- File upload handling
- Tailwind CSS configuration
- Type definitions

### 🚧 Remaining Work
- Frontend pages migration
- React components adaptation
- Layouts implementation
- Asset copying
- Final testing and bug fixes

## 📝 Step-by-Step Migration Process

### 1. Set Up Component Directories

```bash
cd nextjs-version

# Create component directories
mkdir -p components/ui
mkdir -p components/common
mkdir -p components/forms
mkdir -p components/layouts
```

### 2. Copy UI Components

The Radix UI components need to be migrated:

```bash
# From the original project
cp ../resources/js/components/ui/*.tsx ./components/ui/

# You'll need to update imports:
# - Replace @/ imports to match new structure
# - Ensure all Radix UI packages are installed
```

### 3. Create Layouts

#### MainLayout (for public pages)

Create `components/layouts/MainLayout.tsx`:

```typescript
'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          {/* Add navigation items */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        {/* Add footer content */}
      </footer>
    </div>
  );
}
```

#### AuthenticatedLayout (for protected pages)

Create `components/layouts/AuthenticatedLayout.tsx`:

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      {/* Add authenticated layout structure */}
      {children}
    </div>
  );
}
```

### 4. Migrate Pages

#### Converting Inertia Pages to Next.js Pages

**Original Inertia Page** (`resources/js/Pages/Home.tsx`):
```typescript
import { usePage } from '@inertiajs/react';

export default function Home() {
  const { books } = usePage().props;
  // ...
}
```

**Next.js Server Component** (`app/page.tsx`):
```typescript
import { prisma } from '@/lib/prisma';

async function getBooks() {
  return await prisma.book.findMany();
}

export default async function Home() {
  const books = await getBooks();
  // ...
}
```

#### Key Conversion Points

1. **Data Fetching:**
   - Inertia: Props passed from controller
   - Next.js: Fetch in Server Component or use API routes

2. **Navigation:**
   - Inertia: `<Link href={route('books.index')}>`
   - Next.js: `<Link href="/books">`

3. **Forms:**
   - Inertia: `useForm()` hook
   - Next.js: Server Actions or API routes with fetch

4. **Auth:**
   - Inertia: `usePage().props.auth`
   - Next.js: `useSession()` from next-auth

### 5. Page Migration Checklist

#### Auth Pages (`app/(auth)/`)

- [ ] `/login` - Login page
- [ ] `/register` - Registration page
- [ ] `/forgot-password` - Forgot password
- [ ] `/reset-password` - Reset password

```bash
# Create auth group
mkdir -p app/\(auth\)
```

#### Public Pages (`app/`)

- [ ] `/` - Home page (already created)
- [ ] `/books` - All books listing
- [ ] `/books/[id]` - Book details
- [ ] `/read-book/[id]` - Book reader
- [ ] `/posts` - Blog posts
- [ ] `/posts/[id]` - Single post

#### Protected Pages (`app/(dashboard)/`)

- [ ] `/dashboard` - User dashboard
- [ ] `/profile` - Profile settings
- [ ] `/books/create` - Add new book
- [ ] `/books/[id]/edit` - Edit book

#### Admin Pages (`app/(admin)/`)

- [ ] `/admin/books` - Manage books
- [ ] `/admin/categories` - Manage categories
- [ ] `/admin/posts` - Manage posts
- [ ] `/admin/users` - Manage users

### 6. Component Migration Examples

#### Form Component

**Original:**
```typescript
import { useForm } from '@inertiajs/react';

export default function BookForm() {
  const { data, setData, post } = useForm({
    title: '',
    author: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('books.store'));
  };

  return (
    <form onSubmit={submit}>
      {/* form fields */}
    </form>
  );
}
```

**Next.js (Client Component):**
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/books');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### 7. Redux Integration

The Redux store is already configured. To use it in components:

```typescript
'use client';

import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { fetchBooks } from '@/redux/features/book/bookSlice';

export default function BookList() {
  const dispatch = useAppDispatch();
  const { books, isLoading } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks({}));
  }, [dispatch]);

  // ...
}
```

### 8. File Upload Example

```typescript
'use client';

export default function BookUploadForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch('/api/books', {
      method: 'POST',
      body: formData, // Don't set Content-Type header
    });

    // Handle response
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="cover_image" accept="image/*" />
      <input type="file" name="pdf_file" accept=".pdf" />
      <button type="submit">Upload</button>
    </form>
  );
}
```

### 9. Asset Migration

```bash
# Copy images
cp -r ../resources/js/assets/images/* ./public/images/

# Copy icons (if custom)
cp -r ../resources/js/assets/icons/* ./public/icons/

# Update import paths in components
# From: import logo from '@/assets/images/logo.png'
# To: import logo from '/images/logo.png' or use Next.js Image
```

### 10. Testing Strategy

1. **Start with authentication flow:**
   - Test registration
   - Test login
   - Test password reset

2. **Test each page:**
   - Check data loading
   - Verify navigation
   - Test forms and submissions

3. **Test protected routes:**
   - Verify middleware protection
   - Check role-based access

4. **Test file uploads:**
   - Upload cover images
   - Upload PDF files
   - Verify file storage

### 11. Common Issues and Solutions

#### Issue: "useSession must be wrapped in SessionProvider"
**Solution:** Wrap your component tree with SessionProvider in a client component:

```typescript
'use client';

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

#### Issue: Redux state not persisting
**Solution:** The store is already configured. Make sure you're using the Provider in `app/layout.tsx`.

#### Issue: Images not loading
**Solution:** Use Next.js Image component and ensure images are in the `public/` directory:

```typescript
import Image from 'next/image';

<Image
  src="/uploads/covers/image.jpg"
  alt="Book cover"
  width={300}
  height={400}
/>
```

### 12. Performance Optimization

1. **Use Server Components by default:**
   - Only add 'use client' when needed
   - Interactive components need 'use client'

2. **Implement proper loading states:**
   ```typescript
   // app/books/loading.tsx
   export default function Loading() {
     return <div>Loading books...</div>;
   }
   ```

3. **Add error boundaries:**
   ```typescript
   // app/books/error.tsx
   'use client';
   
   export default function Error({ error, reset }) {
     return (
       <div>
         <h2>Something went wrong!</h2>
         <button onClick={reset}>Try again</button>
       </div>
     );
   }
   ```

### 13. Final Checklist

Before considering migration complete:

- [ ] All pages are migrated and functional
- [ ] Authentication works correctly
- [ ] File uploads work
- [ ] All CRUD operations work
- [ ] Styling matches original design
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance is good
- [ ] SEO meta tags added
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] TypeScript errors resolved
- [ ] Production build succeeds

### 14. Running in Production

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel (recommended)
vercel deploy

# Or other platforms like:
# - Netlify
# - Railway
# - DigitalOcean
```

## 🆘 Need Help?

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the API routes in `app/api/` for backend reference
- Examine the Redux slices in `redux/features/` for state management
- Look at the Prisma schema in `prisma/schema.prisma` for data models

## 📊 Progress Tracking

Use this checklist to track your progress:

```
Backend Infrastructure: ████████████████████ 100%
Frontend Pages:         ░░░░░░░░░░░░░░░░░░░░   0%
Components:             ░░░░░░░░░░░░░░░░░░░░   0%
Testing:                ░░░░░░░░░░░░░░░░░░░░   0%
```

Good luck with completing the migration! 🚀

