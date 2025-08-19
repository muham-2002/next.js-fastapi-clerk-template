import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")
    CLERK_ISSUER = os.getenv("CLERK_ISSUER")
    
    # SSL verification settings
    # Set to False only in development environments when needed
    SSL_VERIFY = os.getenv("SSL_VERIFY", "True").lower() in ("true", "1", "t")

