// Firebase SDK v8 (Compat) via CDN
const firebaseConfig = {
  apiKey: "AIzaSyByLaoNEv-zVT32BvsrhTE2aTGi0P6mcuY",
  authDomain: "ff-glory-3fb9c.firebaseapp.com",
  databaseURL: "https://ff-glory-3fb9c-default-rtdb.firebaseio.com",
  projectId: "ff-glory-3fb9c",
  storageBucket: "ff-glory-3fb9c.firebasestorage.app",
  messagingSenderId: "1093224801355",
  appId: "1:1093224801355:web:8c641dd89a5bc4193799ce"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.database();