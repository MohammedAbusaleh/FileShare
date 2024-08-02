from pydantic import BaseModel

class RoomPayload(BaseModel):
    roomId: str