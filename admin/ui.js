// =====================================
// UI Rendering Module
// =====================================

const feedbackContainer = document.getElementById("feedbackContainer");

// -------------------------------------
// Render Feedback
// -------------------------------------

export function renderFeedback(feedback) {

    feedbackContainer.innerHTML = "";

    if (feedback.length === 0) {

        feedbackContainer.innerHTML = `

            <div class="feedbackCard">

                <h2 style="text-align:center;color:#999;">

                    No feedback found.

                </h2>

            </div>

        `;

        return;

    }

    feedback.forEach(item => {

        const card = document.createElement("div");

        card.className = "feedbackCard";

        const name =
            item.name && item.name.trim() !== ""
                ? item.name
                : "Anonymous";

        const date = item.timestamp
            ? item.timestamp.toDate().toLocaleString()
            : "";

        const status = item.status || "unread";

        card.innerHTML = `

            <div class="feedbackHeader">

                <div>

                    <div class="feedbackName">

                        ${name}

                    </div>

                    <div class="feedbackDate">

                        ${date}

                    </div>

                </div>

                <div class="status ${status}">

                    ${status === "read" ? "🟢 Read" : "🔵 Unread"}

                </div>

            </div>

            <div class="feedbackText">

                ${item.feedback}

            </div>

            <div class="cardButtons">

                <button
                    class="reviewBtn"
                    data-id="${item.id}">

                    ${status === "read"
                        ? "Mark Unread"
                        : "Mark Reviewed"}

                </button>

                <button
                    class="deleteBtn"
                    data-id="${item.id}">

                    Delete

                </button>

            </div>

        `;

        feedbackContainer.appendChild(card);

    });

}
