import { checkLogin } from "./auth.js";
import { loadFeedback } from "./firebaseService.js";
import { renderFeedback } from "./ui.js";
import { setupSearch } from "./search.js";

checkLogin();

const feedback = await loadFeedback();

renderFeedback(feedback);

setupSearch(feedback);
