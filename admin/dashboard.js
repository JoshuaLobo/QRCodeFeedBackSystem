import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    collection,
    getDocs,
    orderBy,
    query,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const container = document.getElementById("feedbackContainer");

const totalCount = document.getElementById("totalCount");
const anonymousCount = document.getElementById("anonymousCount");
const readCount = document.getElementById("readCount");
const unreadCount = document.getElementById("unreadCount");

const search = document.getElementById("search");
const logoutBtn = document.getElementById("logoutBtn");

let feedback = [];

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location = "login.html";
        return;
    }

    await loadFeedback();

});

async function loadFeedback() {

    const q = query(
        collection(db, "feedback"),
        orderBy("timestamp", "desc")
    );

    const snapshot = await getDocs(q);

    feedback = [];

    snapshot.forEach(docSnap => {

        feedback.push({
            id: docSnap.id,
            ...docSnap.data()
        });

    });

    render(feedback);

}

function render(list) {

    container.innerHTML = "";

    let total = 0;
    let anonymous = 0;
    let read = 0;
    let unread = 0;

    list.forEach(item => {

        if (item.deleted === true)
            return;

        total++;

        const displayName =
            item.name && item.name.trim() !== ""
                ? item.name
                : "Anonymous";

        if (!item.name || item.name.trim() === "") {
            anonymous++;
        }

        const status = item.status || "unread";

        if (status === "read")
            read++;
        else
            unread++;

        const bullet =
            status === "read"
                ? "🟢"
                : "🔵";

        const buttonText =
            status === "read"
                ? "Mark Unread"
                : "Mark Reviewed";

        const card = document.createElement("div");

        card.className = "feedback";

        card.innerHTML = `

            <div class="feedbackHeader">

                <div>

                    <h4>${displayName}</h4>

                    <small>

                        ${
                            item.timestamp
                                ? item.timestamp.toDate().toLocaleString()
                                : "Just now"
                        }

                    </small>

                </div>

                <div style="font-weight:bold;">

                    ${bullet} ${status.charAt(0).toUpperCase() + status.slice(1)}

                </div>

            </div>

            <p>${item.feedback}</p>

            <button class="reviewBtn">

                ${buttonText}

            </button>

        `;

        container.appendChild(card);

        card.querySelector(".reviewBtn").addEventListener("click", async () => {

            const newStatus =
                item.status === "read"
                    ? "unread"
                    : "read";

            await updateDoc(
                doc(db, "feedback", item.id),
                {
                    status: newStatus
                }
            );

            item.status = newStatus;

            render(feedback);

        });

    });

    totalCount.innerText = total;
    anonymousCount.innerText = anonymous;
    readCount.innerText = read;
    unreadCount.innerText = unread;

}

search.addEventListener("input", () => {

    const term = search.value.toLowerCase();

    const filtered = feedback.filter(item => {

        if (item.deleted)
            return false;

        const name = item.name
            ? item.name.toLowerCase()
            : "";

        const fb = item.feedback
            ? item.feedback.toLowerCase()
            : "";

        return (
            name.includes(term) ||
            fb.includes(term)
        );

    });

    render(filtered);

});

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location = "../index.html";

});
