import jwt
import ssl
import certifi
from jwt import PyJWKClient
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.config import Config

def validate_clerk_token(token: str, audience: str = None):
    try:
        # Configure SSL verification based on settings
        if Config.SSL_VERIFY:
            # Create a custom SSL context using certifi's trusted certificates
            ssl_context = ssl.create_default_context(cafile=certifi.where())
            jwks_client = PyJWKClient(Config.CLERK_JWKS_URL, ssl_context=ssl_context)
        else:
            # Disable SSL verification (for development only)
            ssl_context = ssl._create_unverified_context()
            jwks_client = PyJWKClient(Config.CLERK_JWKS_URL, ssl_context=ssl_context)
            
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=audience,
            issuer=Config.CLERK_ISSUER,
        )
        return payload
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}",
        )

def get_clerk_payload(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    return validate_clerk_token(credentials.credentials)