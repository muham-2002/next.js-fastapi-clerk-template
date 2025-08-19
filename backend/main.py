from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routers.dashboard import router as dashboard_router



app = FastAPI(title="FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router, prefix="/api/dashboard")


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8081) 