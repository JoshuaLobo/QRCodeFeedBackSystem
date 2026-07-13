// ===============================
// Firestore Service
// ===============================

import { db } from "../firebase.js";

import { CONFIG } from "./config.js";

import {

    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    doc,
    deleteDoc

} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// ===============================
// Load All Feedback
// ===============================

export async function loadFeedback() {

    const q = query(

        collection(db, CONFIG.COLLECTION),

        orderBy("timestamp", "desc")

    );

    const snapshot = await getDocs(q);

    let feedback = [];

    snapshot.forEach(document => {

    const data = document.data();

    // Skip deleted feedback
    if (data.deleted === true)
        return;

    feedback.push({

        id: document.id,

        ...data

    });

});

    return feedback;

}


// ===============================
// Toggle Read/Unread
// ===============================

export async function updateFeedbackStatus(id, status) {

    await updateDoc(

        doc(db, CONFIG.COLLECTION, id),

        {

            status: status

        }

    );

}


// ===============================
// Soft Delete
// ===============================

export async function softDeleteFeedback(id) {

    await updateDoc(

        doc(db, CONFIG.COLLECTION, id),

        {

            deleted: true

        }

    );

}


// ===============================
// Permanent Delete
// (not used yet)
// ===============================

export async function permanentDelete(id) {

    await deleteDoc(

        doc(db, CONFIG.COLLECTION, id)

    );

}
