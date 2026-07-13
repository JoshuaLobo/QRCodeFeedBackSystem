// =====================================
// UI Module
// =====================================

import { CONFIG } from "./config.js";

export function renderFeedback(feedback) {

    const container = document.getElementById("feedbackContainer");

    container.innerHTML = "";

    feedback.forEach(item => {

        if(item.deleted)
            return;

        container.appendChild(createFeedbackCard(item));

    });

}


function createFeedbackCard(item){

    const card=document.createElement("div");

    card.className="feedback";

    const displayName=

        item.name && item.name.trim()!=="" ?

        item.name :

        "Anonymous";

    const status=item.status || CONFIG.STATUS.UNREAD;

    const bullet=

        status===CONFIG.STATUS.READ ?

        "🟢" :

        "🔵";

    const statusText=

        status===CONFIG.STATUS.READ ?

        "Read" :

        "Unread";

    const buttonText=

        status===CONFIG.STATUS.READ ?

        "Mark Unread" :

        "Mark Reviewed";

    const date=item.timestamp ?

        item.timestamp.toDate().toLocaleString()

        :

        "Just now";

    card.innerHTML=`

<div class="feedbackHeader">

    <div>

        <h4>${displayName}</h4>

        <small>${date}</small>

    </div>

    <div class="status">

        ${bullet} ${statusText}

    </div>

</div>

<p>

${item.feedback}

</p>

<div class="feedbackActions">

<button

class="reviewBtn"

data-id="${item.id}"

>

${buttonText}

</button>

<button

class="deleteBtn"

data-id="${item.id}"

>

Delete

</button>

</div>

`;

    return card;

}
