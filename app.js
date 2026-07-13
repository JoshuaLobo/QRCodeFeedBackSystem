// =====================================
// Skinner's Horse Feedback System
// app.js
// =====================================
console.log("app.js loaded");
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("userName");
const feedbackInput = document.getElementById("userFeedback");
const submitBtn = document.getElementById("submitBtn");
const charCount = document.getElementById("charCount");
const successMessage = document.getElementById("successMessage");

// -------------------------------
// Character Counter
// -------------------------------

feedbackInput.addEventListener("input", () => {
    charCount.textContent = feedbackInput.value.length;
});

// -------------------------------
// Submit Feedback
// -------------------------------

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const feedback = feedbackInput.value.trim();

    if (feedback.length === 0) {
        alert("Please enter your feedback.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    successMessage.classList.add("hidden");

    try {

        await addDoc(collection(db, "feedback"), {

            name: name === "" ? "Anonymous" : name,

            feedback: feedback,

            timestamp: serverTimestamp(),

            browserLanguage: navigator.language,

            platform: navigator.platform,

            userAgent: navigator.userAgent,

            submittedFrom: "Skinners Horse Feedback Website v1.0"

        });

        form.reset();

        charCount.textContent = "0";

        successMessage.classList.remove("hidden");

    }

    catch (error) {

    console.error("Firebase Error:", error);

    alert(error.message);

}

    submitBtn.disabled = false;

    submitBtn.textContent = "Submit Feedback";

});
