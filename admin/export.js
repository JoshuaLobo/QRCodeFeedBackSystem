// =====================================
// CSV Export Module
// =====================================

export function exportCSV(feedback){

    const rows=[];

    rows.push([
        "Name",
        "Feedback",
        "Date",
        "Status"
    ]);

    feedback.forEach(item=>{

        if(item.deleted)
            return;

        rows.push([

            item.name && item.name.trim()!=="" ?

            item.name :

            "Anonymous",

            item.feedback,

            item.timestamp ?

            item.timestamp.toDate().toLocaleString()

            :

            "",

            item.status || "unread"

        ]);

    });

    const csv=rows

        .map(row=>

            row.map(value=>

                `"${String(value).replace(/"/g,'""')}"`

            ).join(",")

        )

        .join("\n");

    const blob=new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="feedback.csv";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

}
