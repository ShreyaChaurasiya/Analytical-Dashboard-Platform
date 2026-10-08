from fastapi import APIRouter

router = APIRouter(tags=["dashboard"])


@router.get("/datasets/{dataset_id}/dashboard")
def get_dashboard(dataset_id: str):
    return {"detail": "TODO", "id": dataset_id}