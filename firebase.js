// =====================================
// firebase.js
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyA9UdyCf9NLHq2FOrHlt6E6ahzUGnffX1Y",

    authDomain: "skinnershorsefeedback.firebaseapp.com",

    projectId: "skinnershorsefeedback",

    storageBucket: "skinnershorsefeedback.firebasestorage.app",

    messagingSenderId: "700597867047",

    appId: "1:700597867047:web:9efa822056a1a98ff1b402"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
