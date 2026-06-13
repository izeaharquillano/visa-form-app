document.getElementById("back-btn")
    .addEventListener("click", () => {

        window.location.href = "index.html";

    });


function saveAndNext2() {

    savePage2();

    window.location.href =
        "page3.html";
}

window.addEventListener("DOMContentLoaded", () => {

    const application = getApplication();

    if (!application.applicationInfo)
        return;

    document.getElementById("port-of-entry").value =
        application.applicationInfo.portOfEntry || "";

    document.getElementById("stay-length").value =
        application.applicationInfo.stayLength || "";

    document.getElementById("entry-purpose").value =
        application.applicationInfo.entryPurpose || "";

    document.getElementById("age-at-application").value =
        application.applicationInfo.ageAtApplication || "";

    document.getElementById("companion-name").value =
        application.applicationInfo.companionName || "";

    document.getElementById("destination-after-ph").value =
        application.applicationInfo.destinationAfterPH || "";



    // Restore visa history

    if (application.visaHistory) {

        document.getElementById("past-visa").checked =
            application.visaHistory.hasPastVisa || false;

        document.getElementById("visa-type").value =
            application.visaHistory.visaType || "";

        document.getElementById("visa-issued-by").value =
            application.visaHistory.visaIssuedBy || "";

        document.getElementById("visa-issued-date").value =
            application.visaHistory.visaIssuedDate || "";

        document.getElementById("stay-duration").value =
            application.visaHistory.stayDuration || "";

        document.getElementById("entry-date").value =
            application.visaHistory.entryDate || "";

        document.getElementById("exit-date").value =
            application.visaHistory.exitDate || "";
    }

    const visaHistorySection =
        document.getElementById("visa-history-section");

    visaHistorySection.style.display =
        application.visaHistory?.hasPastVisa
            ? "grid"
            : "none";
});