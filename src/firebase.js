import {initializeApp} from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC_Uxp-NwmQud3wF0uWtpCkho4ZcRPsQWA",
    authDomain: "linkedin-11345.firebaseapp.com",
    projectId: "linkedin-11345",
    storageBucket: "linkedin-11345.appspot.com",
    messagingSenderId: "516369993851",
    appId: "1:516369993851:web:a4ffdab02d38a2ea3192de"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const database = getDatabase(app)
export const auth = getAuth();
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider();
  
// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();

// export {auth, provider};
// export default db;