import firebase_admin
from firebase_admin import credentials, firestore, storage

cred = credentials.Certificate("credentials.json")
firebase_app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'fileshare-561e3.appspot.com'
})

bucket = storage.bucket(app=firebase_app)

db = firestore.client()
