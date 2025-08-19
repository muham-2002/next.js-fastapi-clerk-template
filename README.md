# FastAPI + Next.js + Clerk Integration

![FastAPI](https://img.shields.io/badge/FastAPI-007ACC?style=flat&logo=fastapi&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) ![Clerk](https://img.shields.io/badge/Clerk-1D9BF0?style=flat&logo=clerk&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

A full-stack template demonstrating authentication with Clerk, JWT-secured API calls from Next.js to FastAPI, and a modern dashboard UI.

## Features

- 🔐 **Clerk Authentication** - Complete user management with sign-in/sign-up
- 🛡️ **JWT Security** - Protected API endpoints with Clerk JWT validation
- 🎨 **Modern UI** - Responsive design with Tailwind CSS and shadcn/ui
- 🌙 **Dark/Light Mode** - Theme switching support
- 📱 **Mobile Responsive** - Works on all device sizes
- 🚀 **Docker Ready** - Easy deployment with Docker Compose

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/fastapi-nextjs-clerk.git
cd fastapi-nextjs-clerk
```

### 2. Set Up Clerk

1. Create a [Clerk account](https://clerk.com/) and application
2. Go to your Clerk Dashboard → API Keys
3. Copy your Publishable Key and Secret Key

### 3. Configure Frontend Environment

Create `client/.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 4. Configure Backend Environment

Create `backend/.env`:
```env
CLERK_JWKS_URL=https://api.clerk.dev/v1/jwks
CLERK_ISSUER=https://clerk.your-domain.com
SSL_VERIFY=True
```

### 5. Configure Clerk JWT Template

In your Clerk Dashboard:
1. Go to **JWT Templates**
2. Create a new template named `backend`
3. Add these claims:
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

### 6. Run the Application

#### Option A: Using Docker (Recommended)
```bash
docker-compose up
```

#### Option B: Run Manually

**Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8081
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8081
- **API Docs**: http://localhost:8081/docs

## Project Structure

```
fastapi-nextjs-clerk/
├── backend/                    # FastAPI backend
│   ├── core/
│   │   ├── clerk.py           # Clerk JWT validation
│   │   └── config.py          # Environment configuration
│   ├── routers/
│   │   └── dashboard.py       # API endpoints
│   ├── main.py                # FastAPI app
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
├── client/                     # Next.js frontend
│   ├── src/
│   │   ├── app/               # App router pages
│   │   ├── components/        # React components
│   │   └── lib/               # Utilities
│   ├── package.json           # Node dependencies
│   └── .env.local             # Frontend environment variables
├── docker-compose.yml         # Docker orchestration
└── README.md
```

## Environment Variables

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Backend (`backend/.env`)
```env
CLERK_JWKS_URL=https://api.clerk.dev/v1/jwks
CLERK_ISSUER=https://clerk.your-domain.com
SSL_VERIFY=True
```

## API Endpoints

- `GET /api/dashboard/public` - Public endpoint (no auth required)
- `GET /api/dashboard/private` - Protected endpoint (requires JWT)
- `GET /api/dashboard/greet` - Personalized greeting (requires JWT)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.