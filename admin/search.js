// =====================================
// Search & Filter Module
// =====================================

/**
 * Search by name or feedback
 */
export function searchFeedback(feedback, searchText) {

    const term = searchText.trim().toLowerCase();

    if (term === "")
        return feedback;

    return feedback.filter(item => {

        if (item.deleted)
            return false;

        const name =
            item.name
                ? item.name.toLowerCase()
                : "";

        const text =
            item.feedback
                ? item.feedback.toLowerCase()
                : "";

        return (
            name.includes(term) ||
            text.includes(term)
        );

    });

}


/**
 * Filter between two dates
 */
export function filterByDate(feedback, fromDate, toDate) {

    if (!fromDate && !toDate)
        return feedback;

    return feedback.filter(item => {

        if (!item.timestamp)
            return false;

        const date = item.timestamp.toDate();

        if (fromDate && date < new Date(fromDate))
            return false;

        if (toDate) {

            const end = new Date(toDate);

            end.setHours(23,59,59,999);

            if (date > end)
                return false;

        }

        return true;

    });

}


/**
 * Morning / Afternoon / Evening / Night
 */
export function filterByTime(feedback, period) {

    if (!period || period === "all")
        return feedback;

    return feedback.filter(item => {

        if (!item.timestamp)
            return false;

        const hour = item.timestamp.toDate().getHours();

        switch(period){

            case "morning":
                return hour >= 5 && hour < 12;

            case "afternoon":
                return hour >= 12 && hour < 17;

            case "evening":
                return hour >= 17 && hour < 21;

            case "night":
                return hour >= 21 || hour < 5;

            default:
                return true;

        }

    });

}
