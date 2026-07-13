import { auth } from "../firebase.js";

import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const form=document.getElementById("loginForm");

const error=document.getElementById("errorMessage");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

window.location="dashboard.html";

}

catch(err){

error.innerText="Invalid username or password.";

console.error(err);

}

});
