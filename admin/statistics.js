// ======================================
// Statistics Module
// ======================================

import { CONFIG } from "./config.js";

/**
 * Calculate dashboard statistics
 * @param {Array} feedback
 * @returns {Object}
 */

export function calculateStatistics(feedback) {

    let stats = {

        total: 0,

        anonymous: 0,

        read: 0,

        unread: 0

    };

    feedback.forEach(item => {

        // Ignore deleted feedback
        if (item.deleted === true)
            return;

        stats.total++;

        // Anonymous
        if (!item.name || item.name.trim() === "") {

            stats.anonymous++;

        }

        // Read / Unread
        if (item.status === CONFIG.STATUS.READ) {

            stats.read++;

        } else {

            stats.unread++;

        }

    });

    return stats;

}

/**
 * Update Dashboard Cards
 */

export function updateStatistics(stats) {

    document.getElementById("totalCount").innerText = stats.total;

    document.getElementById("anonymousCount").innerText = stats.anonymous;

    document.getElementById("readCount").innerText = stats.read;

    document.getElementById("unreadCount").innerText = stats.unread;

}
