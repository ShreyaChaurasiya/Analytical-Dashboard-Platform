from fastapi import APIRouter

router = APIRouter(tags=["quality"])


@router.get("/datasets/{dataset_id}/issues")
def list_issues(dataset_id: str):
    return {"detail": "TODO", "id": dataset_id}