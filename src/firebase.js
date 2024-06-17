import { initializeApp } from "firebase/app";
import { get } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "fileshare-b60e1.firebaseapp.com",
  projectId: "fileshare-b60e1",
  storageBucket: "fileshare-b60e1.appspot.com",
  messagingSenderId: "552743975577",
  appId: "1:552743975577:web:b846aeb7a0840a8e45d608"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)