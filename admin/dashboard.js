import { auth, db } from "../firebase.js";

import {

onAuthStateChanged,

signOut

}

from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {

collection,

getDocs,

orderBy,

query

}

from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const container=document.getElementById("feedbackContainer");

const total=document.getElementById("totalCount");

const anonymous=document.getElementById("anonymousCount");

const search=document.getElementById("search");

const logout=document.getElementById("logoutBtn");

let feedback=[];

onAuthStateChanged(auth,async(user)=>{

if(!user){

window.location="login.html";

return;

}

const q=query(

collection(db,"feedback"),

orderBy("timestamp","desc")

);

const snapshot=await getDocs(q);

feedback=[];

snapshot.forEach(doc=>{

feedback.push({

id:doc.id,

...doc.data()

});

});

render(feedback);

});

function render(list){

container.innerHTML="";

total.innerText=list.length;

let anon=0;

list.forEach(item=>{

if(item.name==="Anonymous")

anon++;

const card=document.createElement("div");

card.className="feedback";

card.innerHTML=`

<h4>${item.name}</h4>

<small>

${item.timestamp?.toDate().toLocaleString()}

</small>

<p>

${item.feedback}

</p>

`;

container.appendChild(card);

});

anonymous.innerText=anon;

}

search.addEventListener("input",()=>{

const term=search.value.toLowerCase();

render(

feedback.filter(f=>

f.feedback.toLowerCase().includes(term)||

f.name.toLowerCase().includes(term)

)

);

});

logout.addEventListener("click",()=>{

signOut(auth);

});
