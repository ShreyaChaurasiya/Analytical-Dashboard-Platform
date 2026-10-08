from fastapi import APIRouter

router = APIRouter()

@router.post("/upload")
def upload_dataset():
    return {"detail": "TODO"}

@router.get("")
def list_datasets():
    return {"detail": "TODO"}

@router.get("/{dataset_id}")
def get_dataset(dataset_id: str):
    return {"detail": "TODO", "id": dataset_id}

@router.delete("/{dataset_id}")
def delete_dataset(dataset_id: str):
    return {"detail": "TODO", "id": dataset_id}