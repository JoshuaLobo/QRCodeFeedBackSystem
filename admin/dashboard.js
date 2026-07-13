// =====================================
// Dashboard Controller
// =====================================

import { auth } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { loadFeedback } from "./firebaseService.js";
import { renderFeedback } from "./ui.js";
import { calculateStatistics, updateStatistics } from "./statistics.js";
import { searchFeedback } from "./search.js";

const logoutBtn = document.getElementById("logoutBtn");
const searchBox = document.getElementById("search");

let feedback = [];

// ---------------------------
// Authentication
// ---------------------------

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location = "login.html";

        return;

    }

    await initialiseDashboard();

});

// ---------------------------
// Load Dashboard
// ---------------------------

async function initialiseDashboard() {

    feedback = await loadFeedback();

    refreshDashboard(feedback);

}

// ---------------------------
// Refresh Dashboard
// ---------------------------

function refreshDashboard(list) {

    renderFeedback(list);

    const stats = calculateStatistics(list);

    updateStatistics(stats);

}

// ---------------------------
// Search
// ---------------------------

searchBox.addEventListener("input", () => {

    const filtered = searchFeedback(

        feedback,

        searchBox.value

    );

    refreshDashboard(filtered);

});

// ---------------------------
// Logout
// ---------------------------

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location = "../index.html";

});
