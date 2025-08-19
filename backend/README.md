# FastAPI Backend with Clerk Authentication

A secure FastAPI backend that validates Clerk JWTs and provides protected API endpoints.

## Features

- 🔐 **Clerk JWT Authentication** - Secure endpoint protection
- 🛡️ **JWKS Validation** - Real-time key verification
- 📝 **Auto Documentation** - Interactive API docs with FastAPI
- 🐳 **Docker Support** - Containerized deployment
- ⚡ **Fast & Lightweight** - Built with FastAPI for performance

## Quick Setup

### 1. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Clerk Configuration
CLERK_JWKS_URL=https://api.clerk.dev/v1/jwks
CLERK_ISSUER=https://clerk.your-domain.com

# SSL Configuration
SSL_VERIFY=True  # Set to False only for development if SSL issues occur
```

### 2. Install Dependencies

```bash
# Create virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```

### 3. Run the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload --port 8081

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8081
```

The server will be available at:
- **API**: http://localhost:8081
- **Interactive Docs**: http://localhost:8081/docs
- **OpenAPI Schema**: http://localhost:8081/openapi.json

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `CLERK_JWKS_URL` | Clerk JWKS endpoint URL | `https://api.clerk.dev/v1/jwks` | Yes |
| `CLERK_ISSUER` | Expected JWT issuer (your Clerk domain) | None | Yes |
| `SSL_VERIFY` | Enable SSL certificate verification | `True` | No |

### Setting up Clerk Environment Variables

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to **Developers** → **API Keys**
4. Use your domain for the `CLERK_ISSUER` (e.g., `https://your-app.clerk.accounts.dev`)

## API Endpoints

### Public Endpoints
- `GET /api/dashboard/public` - Public endpoint, no authentication required
  ```json
  {
    "message": "This is a public endpoint - no authentication required!",
    "timestamp": "2024-01-01T12:00:00Z"
  }
  ```

### Protected Endpoints (Require Clerk JWT)
- `GET /api/dashboard/private` - Protected endpoint
  ```json
  {
    "message": "This is a protected endpoint - authentication required!",
    "user_id": "user_xxx",
    "timestamp": "2024-01-01T12:00:00Z"
  }
  ```

- `GET /api/dashboard/greet` - Personalized greeting
  ```json
  {
    "message": "Hello, John Doe!",
    "user_id": "user_xxx",
    "email": "john@example.com",
    "timestamp": "2024-01-01T12:00:00Z"
  }
  ```

## Docker Deployment

### Build the Docker Image
```bash
docker build -t fastapi-backend .
```

### Run the Container
```bash
docker run -p 8081:8081 --env-file .env fastapi-backend
```

### Using Docker Compose
```bash
# From project root
docker-compose up backend
```

## SSL Configuration

### Production (Recommended)
Keep `SSL_VERIFY=True` for secure certificate verification using the `certifi` package.

### Development (If SSL Issues Occur)
If you encounter SSL certificate issues:

```env
SSL_VERIFY=False
```

**⚠️ Warning**: Never disable SSL verification in production environments.

## Troubleshooting

### Common Issues

1. **SSL Certificate Verification Failed**
   ```
   [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed
   ```
   **Solutions**:
   - Update certificates: `pip install --upgrade certifi`
   - Set `SSL_VERIFY=False` (development only)
   - Check corporate firewall/proxy settings

2. **JWT Validation Errors**
   ```
   Invalid authentication credentials
   ```
   **Solutions**:
   - Verify `CLERK_ISSUER` matches your Clerk domain
   - Ensure frontend sends JWT in `Authorization: Bearer <token>` header
   - Check Clerk JWT template configuration

3. **CORS Issues**
   ```
   Access to XMLHttpRequest blocked by CORS policy
   ```
   **Solution**: CORS is configured for `http://localhost:3000` in development. Update `main.py` for different origins.

## Development

### Project Structure
```
backend/
├── core/
│   ├── clerk.py           # Clerk JWT validation logic
│   └── config.py          # Environment configuration
├── routers/
│   └── dashboard.py       # API route handlers
├── main.py                # FastAPI application setup
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration
└── .env                  # Environment variables
```

### Adding New Protected Endpoints

```python
from fastapi import Depends
from core.clerk import ClerkJWTBearer

@router.get("/new-endpoint")
async def new_endpoint(token: dict = Depends(ClerkJWTBearer())):
    user_id = token.get("sub")
    return {"message": f"Hello user {user_id}!"}
```

## Dependencies

- **FastAPI** - Modern web framework
- **uvicorn** - ASGI server
- **PyJWT** - JWT token handling
- **cryptography** - Cryptographic operations
- **requests** - HTTP requests for JWKS
- **certifi** - SSL certificate bundle