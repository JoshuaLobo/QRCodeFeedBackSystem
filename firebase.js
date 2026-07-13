// =====================================
// Skinner's Horse Feedback System
// firebase.js
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ============================
// Firebase Configuration
// ============================

const firebaseConfig = {

    apiKey: "AIzaSyA9UdyCf9NLHq2FOrHlt6E6ahzUGnffX1Y",

    authDomain: "skinnershorsefeedback.firebaseapp.com",

    projectId: "skinnershorsefeedback",

    storageBucket: "skinnershorsefeedback.firebasestorage.app",

    messagingSenderId: "700597867047",

    appId: "1:700597867047:web:9efa822056a1a98ff1b402"

};

// ============================
// Initialize Firebase
// ============================

const app = initializeApp(firebaseConfig);

// ============================
// Initialize Firestore
// ============================

const db = getFirestore(app);

// ============================
// Export Firestore
// ============================

export { db };
