// =====================================
// Delete Module
// =====================================

import { softDeleteFeedback } from "./firebaseService.js";

/**
 * Soft Delete Feedback
 * @param {Object} item
 */

export async function deleteFeedback(item) {

    const confirmed = confirm(
        "Are you sure you want to delete this feedback?"
    );

    if (!confirmed)
        return false;

    await softDeleteFeedback(item.id);

    item.deleted = true;

    return true;

}
