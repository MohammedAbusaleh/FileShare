import datetime
from fastapi import FastAPI, HTTPException, File, UploadFile
from backend.firebase_config import db, bucket
import uvicorn
# just for testing remove later
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# just for testing remove later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/r/{roomId}")
async def get_sorted_files(roomId: str):
    try:
        room_doc = db.collection('rooms').where('roomId', '==', roomId).get()
        
        if not room_doc:
            db.collection('rooms').document().set({
                'roomId': roomId,
                'createdAt': datetime.datetime.now()
            })

        files_ref = db.collection('files')
        query = (
            files_ref.where('roomId', '==', roomId)
            .order_by('timestamp')
        )
        docs = query.stream()

        files = [{k:v for k, v in doc.to_dict().items() if k in ['filename', 'fileURL']} for doc in docs] # doc has has roomId and I am removing it

        return {'files': files, 'Error': None}
    
    except Exception as e:
        raise {'files': None, 'Error': HTTPException(status_code=500, detail=str(e))}

@app.post("/upload/{roomId}")
async def upload_file(roomId: str, file: UploadFile = File(...)):
    try:
        # store in storage
        blob = bucket.blob(file.filename)
        blob.upload_from_file(file.file)

        download_url = blob.generate_signed_url(expiration=datetime.timedelta(days=1), method='GET')

        # store in firestore
        doc_ref = db.collection('files').document()
        doc_ref.set({
            'filename': file.filename,
            'roomId': roomId,
            'fileURL': download_url,
            'timestamp': datetime.datetime.now()
        })
        return {"filename": file.filename, "url": download_url, 'Error': None}

    except Exception as e:
        raise {"filename": None, "url": None, 'Error': HTTPException(status_code=500, detail=str(e))}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
