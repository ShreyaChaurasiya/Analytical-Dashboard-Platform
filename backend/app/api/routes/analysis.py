from fastapi import APIRouter

router = APIRouter(tags=["analysis"])


@router.post("/datasets/{dataset_id}/analysis")
def start_analysis(dataset_id: str):
    return {"detail": "TODO", "id": dataset_id}
