document.getElementById("back-btn")
    .addEventListener("click", () => {

        window.location.href = "page3.html";

    });

const application = JSON.parse(
    localStorage.getItem("visaApplication")
);

const reviewvisaHistorySection =
    document.getElementById(
        "review-visa-history-section"
    );

if (!application.visaHistory) {

    reviewvisaHistorySection.style.display = "none";

}

const children =
    application.children || [];

const container =
    document.getElementById("children-container");

container.innerHTML = "";

if (children.length === 0) {

    container.innerHTML =
        "<p>No children declared.</p>";

}

children.forEach((child, index) => {

    container.innerHTML += `
        <div class="child-card">

            <div class="child-header">

                <span>
                    Child #${index + 1}
                    | 孩子#${index + 1}
                </span>

            </div>

            <div class="child-row">

                <div class="field">

                    <label>Child Name</label>

                    <input
                        type="text"
                        value="${child.name}"
                        readonly>

                </div>

                <div class="field">

                    <label>Child Age</label>

                    <input
                        type="number"
                        value="${child.age}"
                        readonly>

                </div>

            </div>

            <div class="field">

                <label>Relationship Type</label>

                <input
                    type="text"
                    value="${child.relationship}"
                    readonly>

            </div>

        </div>
    `;

});

document.getElementById("review-surname").value =
    application.applicant?.surname || "";

document.getElementById("review-firstname").value =
    application.applicant?.firstname || "";

document.getElementById("review-sex").value =
    application.applicant?.sex || "";

document.getElementById("review-birthdate").value =
    application.applicant?.birthdate || "";

document.getElementById("review-birthplace").value =
    application.applicant?.birthplace || "";

document.getElementById("review-citizenship").value =
    application.applicant?.citizenship || "";

document.getElementById("review-applicant-address").value =
    application.applicant?.address || "";

document.getElementById("review-contact-number").value =
    application.applicant?.contact || "";

document.getElementById("review-occupation").value =
    application.applicant?.occupation || "";

document.getElementById("review-employment-address").value =
    application.applicant?.employmentAddress || "";

document.getElementById("review-father-name").value =
    application.applicant?.father || "";

document.getElementById("review-mother-name").value =
    application.applicant?.mother || "";

document.getElementById("review-civil-status").value =
    application.applicant?.civilStatus || "";

document.getElementById("review-spouse-name").value =
    application.applicant?.spouse || "";

document.getElementById("review-spouse-citizenship").value =
    application.applicant?.spouseCitizenship || "";

document.getElementById("review-passport-number").value =
    application.passport?.number || "";

document.getElementById("review-passport-issued-date").value =
    application.passport?.issuedDate || "";

document.getElementById("review-passport-expiry-date").value =
    application.passport?.expiryDate || "";

document.getElementById("review-passport-issued-by").value =
    application.passport?.issuedBy || "";

document.getElementById("review-port-of-entry").value =
    application.applicationInfo?.portOfEntry || "";

document.getElementById("review-stay-length").value =
    application.applicationInfo?.stayLength || "";

document.getElementById("review-entry-purpose").value =
    application.applicationInfo?.entryPurpose || "";

document.getElementById("review-age-at-application").value =
    application.applicationInfo?.ageAtApplication || "";

document.getElementById("review-companion-name").value =
    application.applicationInfo?.companionName || "";

document.getElementById("review-destination-after-ph").value =
    application.applicationInfo?.destinationAfterPH || "";

document.getElementById("past-visa").checked =
    application.visaHistory?.hasPastVisa || false;

document.getElementById("review-visa-type").value =
    application.visaHistory?.visaType || "";

document.getElementById("review-issued-by").value =
    application.visaHistory?.visaIssuedBy || "";

document.getElementById("review-visa-issued-date").value =
    application.visaHistory?.visaIssuedDate || "";

document.getElementById("review-stay-duration").value =
    application.visaHistory?.stayDuration || "";

document.getElementById("review-entry-date").value =
    application.visaHistory?.entryDate || "";

document.getElementById("review-exit-date").value =
    application.visaHistory?.exitDate || "";