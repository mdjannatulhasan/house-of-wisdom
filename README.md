# Book Library - Next.js 15+ Fullstack Application

A modern, fullstack book library management system built with Next.js 15+ (App Router), TypeScript, Prisma, NextAuth, and Redux Toolkit.

## 🎯 Project Overview

This is a **fully migrated** Next.js version of the Laravel + Inertia.js Book Library application. It maintains all the original functionality while leveraging Next.js 15+ features including Server Components, Server Actions, and the App Router architecture.

## ✨ Features

- **Authentication & Authorization**: Complete auth system with login, registration, password reset, and role-based access control (Admin, Editor, User)
- **Book Management**: CRUD operations for books with file uploads (cover images, PDF files)
- **Chapter Management**: Create and manage book chapters with rich text content
- **Category System**: Hierarchical category management with parent-child relationships
- **Blog/Posts**: Full blog functionality with categories and comments
- **Profile Management**: User profile editing and password updates
- **File Uploads**: Secure file handling for images and PDFs
- **State Management**: Redux Toolkit with RTK Query for efficient data fetching
- **Type Safety**: Full TypeScript implementation with strict mode

## 🛠️ Technology Stack

### Frontend
- **Next.js 15+** (App Router)
- **React 18+** (Server & Client Components)
- **TypeScript** (Strict mode)
- **Redux Toolkit** + RTK Query
- **Tailwind CSS** (Custom theme)
- **Radix UI** (Accessible components)
- **Framer Motion** (Animations)
- **React Icons** & **Lucide React**

### Backend
- **Next.js API Routes**
- **Prisma** (ORM with SQLite)
- **NextAuth** (Authentication)
- **Zod** (Validation)
- **bcryptjs** (Password hashing)

## 📁 Project Structure

```
nextjs-version/
├── app/
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── [...nextauth]/   # NextAuth configuration
│   │   │   ├── register/        # User registration
│   │   │   ├── forgot-password/ # Password reset request
│   │   │   └── reset-password/  # Password reset confirmation
│   │   ├── books/               # Books CRUD
│   │   ├── chapters/            # Chapters CRUD
│   │   ├── book-content/        # Book content management
│   │   ├── categories/          # Categories CRUD
│   │   ├── posts/               # Posts/Blog CRUD
│   │   └── profile/             # User profile management
│   ├── Providers.tsx            # Redux Provider wrapper
│   ├── layout.tsx               # Root layout with providers
│   └── globals.css              # Global styles
├── lib/
│   ├── prisma.ts                # Prisma client instance
│   ├── auth.ts                  # NextAuth configuration
│   ├── session.ts               # Session helpers
│   ├── upload.ts                # File upload utilities
│   └── utils.ts                 # Utility functions
├── redux/
│   ├── store.ts                 # Redux store configuration
│   ├── hook.ts                  # Typed Redux hooks
│   ├── api/
│   │   └── apiSlice.ts          # RTK Query base API
│   └── features/
│       ├── book/
│       ├── user/
│       ├── wishlist/
│       ├── chapter/
│       └── category/
├── types/
│   ├── globalTypes.ts           # Shared type definitions
│   ├── homeType.ts              # Book-related types
│   ├── index.d.ts               # Page props types
│   └── next-auth.d.ts           # NextAuth type extensions
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── public/
│   └── uploads/                 # Uploaded files directory
├── middleware.ts                # Auth & route protection
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── .env.local                   # Environment variables

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Already configured in .env.local
   # Update NEXTAUTH_SECRET for production:
   # Generate with: openssl rand -base64 32
   ```

3. **Run database migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Seed database (optional):**
   ```bash
   npx prisma db seed
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```

6. **Open application:**
   ```
   http://localhost:3000
   ```

## 📊 Database Schema

### Key Models

- **User**: Authentication & profile data with role-based access
- **Book**: Book information with cover images and PDF files
- **Chapter**: Book chapters with ordering
- **BookContent**: Rich text content for chapters
- **Category**: Hierarchical category system
- **Post**: Blog posts with categories
- **Comment**: Nested comments on posts
- **Session**: NextAuth session management
- **PasswordResetToken**: Password reset functionality

## 🔒 Authentication & Authorization

### Roles
- **Admin**: Full access to all features
- **Editor**: Can create and manage posts and books
- **User**: Can view content and manage personal data

### Protected Routes
Configure in `middleware.ts`:
- `/dashboard/*` - Requires authentication
- `/admin/*` - Requires admin or editor role
- `/profile/*` - Requires authentication
- `/books/create` - Requires authentication
- `/posts/create` - Requires authentication

## 🔄 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - Login/logout (NextAuth)
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Books
- `GET /api/books` - List all books (supports search & filters)
- `POST /api/books` - Create book (multipart/form-data)
- `GET /api/books/[id]` - Get single book
- `PATCH /api/books/[id]` - Update book
- `DELETE /api/books/[id]` - Delete book

### Chapters
- `GET /api/chapters?book_id=X` - List chapters for book
- `POST /api/chapters` - Create chapter
- `GET /api/chapters/[id]` - Get single chapter
- `PATCH /api/chapters/[id]` - Update chapter
- `DELETE /api/chapters/[id]` - Delete chapter

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category
- `GET /api/categories/[id]` - Get single category
- `PATCH /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category (soft delete)

### Posts
- `GET /api/posts` - List posts (filtered by user role)
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get single post with comments
- `PATCH /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post (soft delete)

### Profile
- `GET /api/profile` - Get current user profile
- `PATCH /api/profile` - Update profile
- `DELETE /api/profile` - Delete account
- `PUT /api/profile/password` - Update password

## 🎨 Styling

- **Tailwind CSS** with custom configuration
- **Custom theme** matching original design
- **Radix UI** for accessible components
- **Responsive design** with mobile-first approach

## 📝 Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# App Configuration
NEXT_PUBLIC_APP_NAME="Book Library"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR="./public/uploads"
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm run start
```

## 📦 Building for Production

1. **Update environment variables:**
   - Set production `NEXTAUTH_URL`
   - Generate secure `NEXTAUTH_SECRET`
   - Configure production database

2. **Build application:**
   ```bash
   npm run build
   ```

3. **Start production server:**
   ```bash
   npm run start
   ```

## 🔧 Development Workflow

### Adding New Features

1. **Create API route:** Add route handler in `app/api/[feature]/route.ts`
2. **Define types:** Add TypeScript types in `types/`
3. **Create Redux slice (if needed):** Add slice in `redux/features/[feature]/`
4. **Build UI:** Create pages in `app/` and components
5. **Update middleware (if needed):** Add route protection in `middleware.ts`

### Database Changes

1. **Modify schema:** Update `prisma/schema.prisma`
2. **Create migration:**
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```
3. **Generate client:**
   ```bash
   npx prisma generate
   ```

## 🚧 Migration Status

### ✅ Completed

- [x] Next.js 15+ project setup with TypeScript
- [x] Database schema (Prisma) with all models
- [x] Redux store with Next.js integration
- [x] Authentication system (NextAuth)
- [x] All API routes (Books, Chapters, Categories, Posts, Profile)
- [x] File upload system
- [x] Middleware for auth & role-based access
- [x] Tailwind CSS configuration
- [x] Type definitions
- [x] Environment configuration

### 📋 Remaining Tasks

The backend infrastructure is complete. To finish the migration:

1. **Frontend Pages** - Migrate React pages from `resources/js/Pages/` to Next.js App Router pages
2. **Components** - Copy and adapt components from `resources/js/components/`
3. **Layouts** - Create MainLayout, AuthenticatedLayout, GuestLayout
4. **Assets** - Copy images and icons from `resources/js/assets/`
5. **UI Components** - Ensure all Radix UI components are properly integrated

### Next Steps for Frontend Migration

```bash
# 1. Copy component directories
cp -r ../resources/js/components/* ./components/

# 2. Create pages directory structure
mkdir -p app/(auth) app/(main) app/(admin) app/dashboard

# 3. Migrate pages one by one, converting:
#    - Inertia imports to Next.js navigation
#    - Laravel route() helpers to Next.js links
#    - usePage() hooks to server-side data fetching
```

## 📚 Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

This project maintains the original license from the Laravel version.

## 👤 Author

**Hasan**
- Website: [smjhm.com](https://smjhm.com)

---

## 🎓 Key Architectural Decisions

### Why Next.js 15+?
- **Server Components**: Reduced client-side JavaScript, improved performance
- **App Router**: Better routing with layouts and nested routes
- **Server Actions**: Simplified data mutations without API routes
- **Streaming**: Progressive page rendering for better UX
- **Built-in optimizations**: Image optimization, font optimization, etc.

### Why Prisma?
- **Type-safe**: Auto-generated TypeScript types
- **Database agnostic**: Easy to switch from SQLite to PostgreSQL
- **Migrations**: Version-controlled database changes
- **Intuitive API**: Clean, readable database queries

### Why Redux Toolkit?
- **Consistency**: Maintains familiar state management from original app
- **RTK Query**: Built-in data fetching and caching
- **DevTools**: Excellent debugging experience
- **Type-safe**: Full TypeScript support

### Why NextAuth?
- **Industry standard**: Well-maintained, secure authentication
- **Flexible**: Supports multiple providers and strategies
- **Session management**: Built-in session handling
- **Middleware integration**: Easy route protection

---

**Happy Coding! 🚀**
