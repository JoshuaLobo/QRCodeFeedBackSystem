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
const total = document.getElementById("totalCount");
const anonymous = document.getElementById("anonymousCount");
const search = document.getElementById("search");
const logout = document.getElementById("logoutBtn");

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

    total.innerText = list.length;

    let anon = 0;

    list.forEach(item => {

        if (item.deleted === true)
            return;

        const displayName =
            item.name && item.name.trim() !== ""
                ? item.name
                : "Anonymous";

        if (!item.name || item.name.trim() === "") {
            anon++;
        }

        const status = item.status || "unread";

        const bullet =
            status === "read"
                ? "🟢"
                : "🔵";

        const buttonText =
            status === "read"
                ? "Reviewed"
                : "Mark Reviewed";

        const disabled =
            status === "read"
                ? "disabled"
                : "";

        const card = document.createElement("div");

        card.className = "feedback";

        card.innerHTML = `

            <div class="feedbackHeader">

                <div>

                    <h4>${displayName}</h4>

                    <small>

                        ${item.timestamp
                            ? item.timestamp.toDate().toLocaleString()
                            : "Just now"}

                    </small>

                </div>

                <div>

                    ${bullet} ${status.charAt(0).toUpperCase() + status.slice(1)}

                </div>

            </div>

            <p>${item.feedback}</p>

            <button
                class="reviewBtn"
                data-id="${item.id}"
                ${disabled}
            >

                ${buttonText}

            </button>

        `;

        container.appendChild(card);

        if (status !== "read") {

            card.querySelector(".reviewBtn").addEventListener("click", async () => {

                await updateDoc(
                    doc(db, "feedback", item.id),
                    {
                        status: "read"
                    }
                );

                item.status = "read";

                render(list);

            });

        }

    });

    anonymous.innerText = anon;

}

search.addEventListener("input", () => {

    const term = search.value.toLowerCase();

    const filtered = feedback.filter(item => {

        if (item.deleted)
            return false;

        const name =
            item.name
                ? item.name.toLowerCase()
                : "";

        const fb =
            item.feedback
                ? item.feedback.toLowerCase()
                : "";

        return (
            name.includes(term) ||
            fb.includes(term)
        );

    });

    render(filtered);

});

logout.addEventListener("click", async () => {

    await signOut(auth);

    window.location = "../index.html";

});
