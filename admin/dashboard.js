import { auth } from "../firebase.js";
import { exportCSV } from "./export.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { loadFeedback } from "./firebaseService.js";
import { renderFeedback } from "./ui.js";
import { calculateStatistics, updateStatistics } from "./statistics.js";
import { searchFeedback } from "./search.js";
import { toggleStatus } from "./status.js";
import { deleteFeedback } from "./delete.js";

const logoutBtn = document.getElementById("logoutBtn");
const searchBox = document.getElementById("search");
const feedbackContainer = document.getElementById("feedbackContainer");
const exportBtn=document.getElementById("exportBtn");

const today = new Date().toISOString().split("T")[0];

a.download = `Feedback_${today}.csv`;

let feedback = [];

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location = "login.html";
        return;
    }

    await loadDashboard();

});

async function loadDashboard() {

    feedback = await loadFeedback();

    draw(feedback);

}

function draw(list) {

    renderFeedback(list);

    const stats = calculateStatistics(list);

    updateStatistics(stats);

}

// ----------------------
// SEARCH
// ----------------------

searchBox.addEventListener("input", () => {

    draw(

        searchFeedback(

            feedback,

            searchBox.value

        )

    );

});

exportBtn.addEventListener(

"click",

()=>{

    exportCSV(

        searchFeedback(

            feedback,

            searchBox.value

        )

    );

});
// ----------------------
// EVENT DELEGATION
// ----------------------

feedbackContainer.addEventListener("click", async (e) => {

    const reviewButton = e.target.closest(".reviewBtn");
    const deleteButton = e.target.closest(".deleteBtn");

    if (!reviewButton && !deleteButton)
        return;

    const card = reviewButton || deleteButton;

    const id = card.dataset.id;

    const item = feedback.find(f => f.id === id);

    if (!item)
        return;

    if (reviewButton) {

       console.log("Review button clicked");
        console.log(item);

        try {

            await toggleStatus(item);

            console.log("Status updated successfully");
    
        } catch (err) {

            console.error(err);
         }

    }

   if (deleteButton) {

    console.log("Delete button clicked");

    try {

        await deleteFeedback(item);

        console.log("Delete successful");

    } catch (err) {

        console.error(err);

    }

}
    draw(

        searchFeedback(

            feedback,

            searchBox.value

        )

    );

});

// ----------------------
// LOGOUT
// ----------------------

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location = "../index.html";

});
