import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDstEM55HwyLaKCUd4Z_sgF0w0f3jhyG8o",
    authDomain: "collab-docs-47794.firebaseapp.com",
    projectId: "collab-docs-47794",
    storageBucket: "collab-docs-47794.appspot.com",
    messagingSenderId: "334223921961",
    appId: "1:334223921961:web:cdc3c2641e039901abdd38",
    measurementId: "G-SL8E04YY1M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;