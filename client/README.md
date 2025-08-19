# Next.js Frontend with Clerk Authentication

A modern, responsive Next.js frontend demonstrating Clerk authentication integration with a FastAPI backend.

## Features

- 🔐 **Clerk Authentication** - Complete user management with sign-in/sign-up flows
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- 🌙 **Dark/Light Mode** - Seamless theme switching
- 📱 **Responsive Design** - Mobile-first approach
- 🛡️ **Protected Routes** - Middleware-based route protection
- 📡 **API Integration** - Secure calls to FastAPI backend with JWT tokens

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Icons**: Lucide React

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env.local` in the client directory:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 3. Configure Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select existing one
3. Configure **Allowed redirect URLs**:
   - `http://localhost:3000`
   - `http://localhost:3000/dashboard`
4. Set **Sign-in URL**: `http://localhost:3000/signin`
5. Set **Sign-up URL**: `http://localhost:3000/signup`

### 4. Set Up JWT Template in Clerk

1. Go to **JWT Templates** in Clerk Dashboard
2. Create a new template named `backend`
3. Configure claims:

```json
{
  "aud": "backend",
  "exp": "{{exp}}",
  "iat": "{{iat}}",
  "iss": "{{iss}}",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address.email_address}}",
  "first_name": "{{user.first_name}}",
  "last_name": "{{user.last_name}}"
}
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Project Structure

```
client/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── dashboard/         # Protected dashboard page
│   │   ├── signin/           # Sign-in page
│   │   ├── signup/           # Sign-up page
│   │   ├── layout.tsx        # Root layout with providers
│   │   └── page.tsx          # Landing page
│   ├── components/            # React components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── header.tsx       # App header with navigation
│   │   ├── footer.tsx       # App footer
│   │   └── theme-provider.tsx # Theme context provider
│   ├── hooks/                # Custom React hooks
│   │   └── useApiCall.ts    # API call management hook
│   ├── lib/                  # Utility functions
│   │   └── utils.ts         # Tailwind utilities
│   ├── common/               # Shared utilities
│   │   └── api.ts           # API client functions
│   └── middleware.ts         # Clerk route protection
├── public/                   # Static assets
├── components.json           # shadcn/ui configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
└── package.json             # Dependencies and scripts
```

## Key Features Explained

### 1. Authentication Flow
- Users are redirected to Clerk-hosted sign-in/sign-up pages
- JWT tokens are automatically managed by Clerk
- Protected routes redirect unauthenticated users

### 2. API Integration
The dashboard demonstrates three types of API calls:

```typescript
// Public endpoint (no authentication)
const publicApi = useApiCall(() => fetchApi("/public"));

// Protected endpoint (with JWT)
const privateApi = useApiCall(() => 
  jwtToken ? fetchApi("/private", jwtToken) : Promise.resolve({...})
);

// Personalized endpoint (with user data from JWT)
const greetApi = useApiCall(() => 
  jwtToken ? fetchApi("/greet", jwtToken) : Promise.resolve({...})
);
```

### 3. Theme System
- Uses `next-themes` for theme management
- Supports system preference detection
- Theme toggle component in header
- CSS variables for theme-aware styling

### 4. Route Protection
Middleware automatically protects routes based on patterns:

```typescript
// middleware.ts
export default authMiddleware({
  publicRoutes: ["/", "/signin", "/signup"],
  ignoredRoutes: ["/api/(.*)"]
});
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (public) | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key (server-side) | Yes |

### Getting Clerk Keys

1. Visit [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Go to **Developers** → **API Keys**
4. Copy the **Publishable Key** and **Secret Key**

## Customization

### Adding New Pages
```bash
# Create a new page
mkdir src/app/new-page
echo 'export default function NewPage() { return <div>New Page</div> }' > src/app/new-page/page.tsx
```

### Adding New Components
```bash
# Add a shadcn/ui component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind classes
- Theme variables: Defined in `globals.css` for dark/light mode

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```bash
# Build image
docker build -t nextjs-frontend .

# Run container
docker run -p 3000:3000 nextjs-frontend
```

### Environment Variables for Production
Ensure these are set in your production environment:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Troubleshooting

### Common Issues

1. **Clerk not loading**
   - Check if environment variables are properly set
   - Verify domain configuration in Clerk Dashboard

2. **Theme not switching**
   - Ensure `ThemeProvider` wraps your app in `layout.tsx`
   - Check if CSS variables are properly defined

3. **API calls failing**
   - Verify backend is running on correct port
   - Check CORS configuration in FastAPI backend
   - Ensure JWT template is configured correctly

4. **Build errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

## Contributing

1. Follow the existing code style
2. Use TypeScript for new components
3. Add proper error handling for API calls
4. Test both light and dark themes
5. Ensure responsive design works on mobile devices