from fastapi import FastAPI, HTTPException, File, UploadFile
from backend.firebase_config import db, bucket
import uvicorn
import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler

import random
import json
# just for testing remove later
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# just for testing remove later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FILES_REF = db.collection('files')
ROOMS_REF = db.collection('rooms')
MAX_FILE_SIZE = 5 * 1024 * 1024
REFRESH_TIME_DAYS = 1
with open('backend/common_words.json', 'r') as f:
    COMMON_WORDS = json.load(f)


@app.on_event("startup")
def startup_tasks():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(clean_old_rooms, 'interval', minutes=1)
    scheduler.start()


@app.get("/room/{roomId}")
async def get_sorted_files(roomId: str):
    try:
        docs = (
            FILES_REF
            .where('roomId', '==', roomId)
            .order_by('timestamp')
        ).stream()

        files = [{k:v for k, v in doc.to_dict().items() if k in ['filename', 'fileURL']} for doc in docs] # doc has has roomId and I am removing it

        return {'files': files, 'error': None}    
    except Exception as e:
        raise {'files': None, 'error': e}


@app.post("/upload/{roomId}")
async def upload_file(roomId: str, file: UploadFile = File(...)):
    try:
        if (file.size > MAX_FILE_SIZE):
            raise HTTPException(status_code=400, detail="File size exceeds limit")

        # store in storage
        blob = bucket.blob(file.filename)
        blob.upload_from_file(file.file)

        download_url = blob.generate_signed_url(expiration=datetime.timedelta(days=REFRESH_TIME_DAYS), method='GET')

        # store in firestore
        FILES_REF.document().set({
            'filename': file.filename,
            'roomId': roomId,
            'fileURL': download_url,
            'timestamp': datetime.datetime.now()
        })
        return {"filename": file.filename, "url": download_url, 'error': None}

    except Exception as e:
        raise {"filename": None, "url": None, 'error': e}


@app.get("/check/{roomId}")
async def does_room_exist(roomId: str):
    try:
        docs = (
            ROOMS_REF
            .where('roomId', '==', roomId)
            .limit(1)
        ).get()
        return {"doesRoomExists": len(docs) > 0, "error": None}

    except Exception as e:
        raise {"doesRoomExists": None, "error": e}


@app.get("/create-room/{roomId}")
async def create_room(roomId: str):
    try:
        ROOMS_REF.document().set({
            "roomId": roomId,
            "createdAt": datetime.datetime.now()
        })
        
        return {"roomId": roomId, "error": None}
        
    except Exception as e:
        raise {"roomId": None, "error": e}


@app.get("/get-generated-id")
async def generate_room_id_endpoint():
    try:
        room_id = await generate_room_id()
        return room_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def generate_room_id(word_num=3, max_attempts=10):  
    attempts = 0
    while attempts < max_attempts:
        words = random.sample(COMMON_WORDS, word_num)
        room_id = '-'.join(words)
        
        docs = (
            ROOMS_REF
            .where('roomId', '==', room_id)
        ).get()
        
        if not any(doc.exists for doc in docs):
            return {"roomId": room_id, "error": None}
        
        attempts += 1
    
    raise Exception(f"Failed to generate a unique room ID after ${max_attempts} attempts.")
        

async def clean_old_rooms():
    time_offset = datetime.datetime.now() - datetime.timedelta(minutes=REFRESH_TIME_DAYS)

    room_docs = (
        ROOMS_REF
        .where('createdAt', '<', time_offset)
    ).stream()

    try:
        for room_doc in room_docs:
            room_id = room_doc.get('roomId')
            room_doc.reference.delete()
            print(f"Deleted room: {room_doc.id}")

            file_docs = (
                FILES_REF
                .where('roomId', '==', room_id)
            ).stream()

            for file_doc in file_docs:
                file_doc.reference.delete()
                print(f"Deleted file: {file_doc.id} related to room {room_id}")

    except Exception as e:
        print(f"An error occurred: {e}")
            


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)