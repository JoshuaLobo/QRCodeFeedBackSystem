// =====================================
// Status Module
// =====================================

import { CONFIG } from "./config.js";

import { updateFeedbackStatus } from "./firebaseService.js";

/**
 * Toggle Read / Unread
 * @param {Object} item
 */

export async function toggleStatus(item){

    const newStatus =

        item.status === CONFIG.STATUS.READ

        ?

        CONFIG.STATUS.UNREAD

        :

        CONFIG.STATUS.READ;

    await updateFeedbackStatus(

        item.id,

        newStatus

    );

    item.status = newStatus;

}
