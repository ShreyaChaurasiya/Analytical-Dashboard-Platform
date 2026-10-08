from fastapi import FastAPI
from app.api.routes.auth import router as auth_router
from app.api.routes.datasets import router as datasets_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.analysis import router as analysis_router
from app.api.routes.jobs import router as jobs_router
from app.api.routes.quality import router as quality_router
from app.api.routes.reports import  router as reports_router


app = FastAPI()
app.include_router(auth_router, prefix="/api/auth")
app.include_router(datasets_router, prefix="/api/datasets")
app.include_router(dashboard_router, prefix="/api/dashboard")
app.include_router(analysis_router, prefix="/api/analysis")
app.include_router(jobs_router, prefix="/api/jobs")
app.include_router(quality_router, prefix="/api/quality")
app.include_router(reports_router, prefix="/api/reports")

@app.get("/api/Check_Status")
def Health():
    return {"status": "ok"}

@app.get("/api/greet")
def greet():
    return {"message":"Welcome To Platform"}