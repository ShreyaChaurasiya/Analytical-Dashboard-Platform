from fastapi import APIRouter

router = APIRouter(tags=["reports"])


@router.post("/datasets/{dataset_id}/reports")
def create_report(dataset_id: str):
    return {"detail": "TODO", "id": dataset_id}


@router.get("/reports/{report_id}")
def get_report(report_id: str):
    return {"detail": "TODO", "id": report_id}