// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //databaseURL: "https://apps-e02e4-default-rtdb.firebaseio.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore with memory cache to avoid ServiceWorker issues
// This prevents the persistent connection that can be intercepted by ServiceWorkers
let db;
if (typeof window !== 'undefined') {
    try {
        db = initializeFirestore(app, {
            localCache: persistentLocalCache({ cacheSizeBytes: CACHE_SIZE_UNLIMITED })
        });
    } catch (error) {
        // Fallback to default Firestore if initialization fails
        console.warn('Firestore initialization warning, using default:', error);
        db = getFirestore(app);
    }
} else {
    // Server-side: use default Firestore
    db = getFirestore(app);
}

export { db };
// const analytics = getAnalytics(app);